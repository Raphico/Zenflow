import "server-only"

import { and, eq, like, sql } from "drizzle-orm"

import {
  type GetBoardSchema,
  type GetBoardsSchema,
} from "@/lib/zod/schemas/board"

import { db } from "../db"
import { boards } from "../db/schema"

export async function getBoard(input: GetBoardSchema) {
  try {
    return await db.query.boards.findFirst({
      where: and(eq(boards.userId, input.userId), eq(boards.id, input.boardId)),
    })
  } catch (err) {
    return null
  }
}

export async function getBoards(inputs: GetBoardsSchema) {
  try {
    return await db.transaction(async (tx) => {
      const data = await tx
        .select({
          userId: boards.userId,
          id: boards.id,
          name: boards.name,
          createdAt: boards.createdAt,
        })
        .from(boards)
        .where(
          and(
            eq(boards.userId, inputs.userId),
            inputs.query?.length
              ? like(boards.name, `%${inputs.query}%`)
              : undefined
          )
        )

      const count = await tx
        .select({
          count: sql<number>`count(*)`,
        })
        .from(boards)
        .where(eq(boards.userId, inputs.userId))
        .execute()
        .then((res) => res[0]?.count ?? 0)

      return {
        data,
        count,
      }
    })
  } catch (error) {
    console.error(error)
    return {
      data: [],
      count: 0,
    }
  }
}

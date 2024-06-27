"use server"

import { and, eq, like, sql } from "drizzle-orm"
import type { z } from "zod"

import { type getBoardsSchema } from "@/lib/zod/schemas/board"

import { db } from "../db"
import { boards } from "../db/schema"

export async function getBoards(
  inputs: z.infer<typeof getBoardsSchema>
): Promise<{
  data:
    | {
        userId: string
        id: number
        name: string
        createdAt: Date
      }[]
    | []
  count: number
}> {
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

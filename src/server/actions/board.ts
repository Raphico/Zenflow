"use server"

import { revalidatePath } from "next/cache"
import { and, eq, ne } from "drizzle-orm"

import {
  type BoardSchema,
  type UpdateBoardSchema,
} from "@/lib/zod/schemas/board"
import { getErrorMessage } from "@/utils/hanld-error"

import { db } from "../db"
import { boards } from "../db/schema"

export async function createBoard(input: BoardSchema & { userId: string }) {
  try {
    const boardWithSameName = await db.query.boards.findFirst({
      columns: {
        id: true,
      },
      where: and(eq(boards.name, input.name), eq(boards.userId, input.userId)),
    })

    if (boardWithSameName) {
      throw new Error(`Board with ${input.name} already exists`)
    }

    const newBoard = await db
      .insert(boards)
      .values({
        userId: input.userId,
        name: input.name,
      })
      .returning({ insertId: boards.id })

    revalidatePath("/dashboard")

    return {
      boardId: newBoard[0].insertId,
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function deleteBoard(boardId: number) {
  try {
    await db.delete(boards).where(eq(boards.id, boardId))

    revalidatePath("/app/dashboard")

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function updateBoard(input: UpdateBoardSchema) {
  try {
    const boardWithSameName = await db.query.boards.findFirst({
      where: and(
        eq(boards.name, input.name),
        eq(boards.userId, input.userId),
        ne(boards.id, input.id)
      ),
      columns: {
        id: true,
      },
    })

    if (boardWithSameName) {
      throw new Error("Board name already taken!")
    }

    await db
      .update(boards)
      .set({
        name: input.name,
      })
      .where(eq(boards.id, input.id))

    revalidatePath("/app/dashboard")

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

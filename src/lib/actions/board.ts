"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { boards, statuses } from "@/db/schema"

import { z } from "zod"
import { boardSchema, updateBoardSchema } from "../validations/board"
import { revalidatePath } from "next/cache"

const extendedBoardSchema = boardSchema.extend({
  userId: z.string(),
})

export async function createBoard(
  rawInputs: z.infer<typeof extendedBoardSchema>
) {
  const inputs = extendedBoardSchema.parse(rawInputs)

  const boardExists = await db.query.boards.findFirst({
    where: eq(boards.name, inputs.name),
  })

  if (boardExists) {
    throw new Error("Board already exists")
  }

  const newBoard = await db.insert(boards).values({
    userId: inputs.userId,
    name: inputs.name,
  })

  revalidatePath("/dashboard")

  return {
    boardId: newBoard.insertId,
  }
}

export async function deleteBoard(boardId: number) {
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId),
    columns: {
      id: true,
    },
  })

  if (!board) {
    throw new Error("Board not found")
  }

  await db.delete(boards).where(eq(boards.id, boardId))

  // Delete all statues of this board
  await db.delete(statuses).where(eq(statuses.boardId, boardId))

  revalidatePath("/app/dashboard")
}

export async function updateBoard(
  rawInputs: z.infer<typeof updateBoardSchema>
) {
  const inputs = updateBoardSchema.parse(rawInputs)

  const board = await db.query.boards.findFirst({
    where: eq(boards.id, inputs.id),
    columns: {
      id: true,
    },
  })

  if (!board) {
    throw new Error("Board not found")
  }

  await db.update(boards).set(inputs).where(eq(boards.id, inputs.id))

  revalidatePath("/app/dashboard")
}

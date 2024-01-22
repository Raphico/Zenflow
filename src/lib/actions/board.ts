"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { boards, tasks } from "@/db/schema"

import type { z } from "zod"
import { createBoardSchema } from "../validations/board"
import { revalidatePath } from "next/cache"

export async function createBoard(
  rawInputs: z.infer<typeof createBoardSchema>
) {
  const inputs = createBoardSchema.parse(rawInputs)

  const boardExits = await db.query.boards.findFirst({
    where: eq(boards.name, inputs.name),
  })

  if (boardExits) {
    throw new Error("Board already exists")
  }

  await db.insert(boards).values({
    name: inputs.name,
  })

  revalidatePath("/dashboard")
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

  // Delete all tasks of this board
  await db.delete(tasks).where(eq(tasks.boardId, boardId))

  revalidatePath("/app/dashboard")
}

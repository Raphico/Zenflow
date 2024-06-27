"use server"

import { revalidatePath } from "next/cache"
import { and, eq, ne, sql } from "drizzle-orm"
import { z } from "zod"

import { boardSchema, updateBoardSchema } from "@/lib/zod/schemas/board"

import { db } from "../db"
import { boards } from "../db/schema"

const extendedBoardSchema = boardSchema.extend({
  userId: z.string(),
})

export async function createBoard(
  rawInputs: z.infer<typeof extendedBoardSchema>
) {
  const inputs = extendedBoardSchema.parse(rawInputs)

  const boardWithSameName = await db.query.boards.findFirst({
    where: and(eq(boards.name, inputs.name), eq(boards.userId, inputs.userId)),
  })

  if (boardWithSameName) {
    throw new Error("Board name already taken!")
  }

  const newBoard = await db.insert(boards).values({
    userId: inputs.userId,
    name: inputs.name,
  })

  revalidatePath("/dashboard")

  return {
    boardId: newBoard[0].insertId,
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

  // Delete all statues, tasks, and subtasks of this board
  await db.execute(sql`
    DELETE subtasks, tasks, statuses, boards
    FROM boards
      LEFT JOIN statuses ON boards.id = statuses.boardId
      LEFT JOIN tasks ON statuses.id = tasks.statusId
      LEFT JOIN subtasks ON tasks.id = subtasks.taskId
    WHERE boards.id = ${boardId};
  `)

  revalidatePath("/app/dashboard")
}

export async function updateBoard(
  rawInputs: z.infer<typeof updateBoardSchema>
) {
  const inputs = updateBoardSchema.parse(rawInputs)

  const boardWithSameName = await db.query.boards.findFirst({
    where: and(
      eq(boards.name, inputs.name),
      eq(boards.userId, inputs.userId),
      ne(boards.id, inputs.id)
    ),
    columns: {
      id: true,
    },
  })

  if (boardWithSameName) {
    throw new Error("Board name already taken!")
  }

  await db.update(boards).set(inputs).where(eq(boards.id, inputs.id))

  revalidatePath("/app/dashboard")
}

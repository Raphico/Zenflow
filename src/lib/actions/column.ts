"use server"

import { revalidatePath } from "next/cache"

import { statuses, tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db"

import { createColumnSchema, updateColumnSchema } from "../validations/column"
import type { z } from "zod"

export async function createColumn(
  rawInputs: z.infer<typeof createColumnSchema>
) {
  const inputs = createColumnSchema.parse(rawInputs)

  const columnExists = await db.query.statuses.findFirst({
    where: eq(statuses.title, inputs.name),
  })

  if (columnExists) {
    throw new Error("Board already exists")
  }

  await db.insert(statuses).values({
    boardId: inputs.boardId,
    title: inputs.name,
  })

  revalidatePath(`/app/board/${inputs.boardId}`)
}

export async function updateColumn(
  rawInputs: z.infer<typeof updateColumnSchema>
) {
  const inputs = updateColumnSchema.parse(rawInputs)

  const column = await db.query.statuses.findFirst({
    where: eq(statuses.id, inputs.id),
    columns: {
      id: true,
    },
  })

  if (!column) {
    throw new Error("Column not found")
  }

  await db
    .update(statuses)
    .set({
      title: inputs.name,
    })
    .where(eq(statuses.id, inputs.id))

  revalidatePath(`/app/board/${inputs.boardId}`)
}

export async function deleteColumn({
  boardId,
  columnId,
}: {
  boardId: number
  columnId: number
}) {
  const board = await db.query.statuses.findFirst({
    where: eq(statuses.id, columnId),
    columns: {
      id: true,
    },
  })

  if (!board) {
    throw new Error("Board not found")
  }

  await db.delete(statuses).where(eq(statuses.id, columnId))

  // Delete all tasks of this column
  await db.delete(tasks).where(eq(tasks.statusId, columnId))

  revalidatePath(`/app/board/${boardId}`)
}

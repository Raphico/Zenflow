"use server"

import { revalidatePath } from "next/cache"

import { statuses } from "@/db/schema"
import { and, eq, ne, sql } from "drizzle-orm"
import { db } from "@/db"

import { createColumnSchema, updateColumnSchema } from "../validations/column"
import { z } from "zod"

export async function createColumn(
  rawInputs: z.infer<typeof createColumnSchema>
) {
  const inputs = createColumnSchema.parse(rawInputs)

  const columnWithSameName = await db.query.statuses.findFirst({
    where: and(
      eq(statuses.boardId, inputs.boardId),
      eq(statuses.title, inputs.name)
    ),
    columns: {
      id: true,
    },
  })

  if (columnWithSameName) {
    throw new Error("Column name already taken!")
  }

  await db.insert(statuses).values({
    boardId: inputs.boardId,
    title: inputs.name,
  })

  revalidatePath(`/app/board/${inputs.boardId}`)
}

const extendedUpdateColumnSchema = updateColumnSchema.extend({
  boardId: z.number(),
})

export async function updateColumn(
  rawInputs: z.infer<typeof extendedUpdateColumnSchema>
) {
  const inputs = extendedUpdateColumnSchema.parse(rawInputs)

  const columnWithSameName = await db.query.statuses.findFirst({
    where: and(
      eq(statuses.boardId, inputs.boardId),
      eq(statuses.title, inputs.name),
      ne(statuses.id, inputs.id)
    ),
    columns: {
      id: true,
    },
  })

  if (columnWithSameName) {
    throw new Error("Column name already taken!")
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

  // Delete all tasks and subtasks of this status
  await db.execute(sql`
    DELETE subtasks, tasks, statuses
    FROM statuses
      LEFT JOIN tasks ON statuses.id = tasks.statusId
      LEFT JOIN subtasks ON tasks.id = subtasks.taskId
    WHERE statuses.id = ${columnId};
  `)

  revalidatePath(`/app/board/${boardId}`)
}

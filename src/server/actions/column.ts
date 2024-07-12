"use server"

import { revalidatePath } from "next/cache"
import { and, eq, ne, sql } from "drizzle-orm"

import {
  type CreateColumnSchema,
  type DeleteColumnSchema,
  type UpdateColumnSchema,
} from "@/lib/zod/schemas/column"
import { getErrorMessage } from "@/utils/hanld-error"

import { db } from "../db"
import { statuses } from "../db/schema"

export async function createColumn(input: CreateColumnSchema) {
  try {
    const columnWithSameName = await db.query.statuses.findFirst({
      where: and(
        eq(statuses.boardId, input.boardId),
        eq(statuses.title, input.name)
      ),
      columns: {
        id: true,
      },
    })

    if (columnWithSameName) {
      throw new Error("Column name already taken!")
    }

    await db.insert(statuses).values({
      boardId: input.boardId,
      title: input.name,
    })

    revalidatePath(`/app/board/${input.boardId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function updateColumn(input: UpdateColumnSchema) {
  try {
    const columnWithSameName = await db.query.statuses.findFirst({
      where: and(
        eq(statuses.boardId, input.boardId),
        eq(statuses.title, input.name),
        ne(statuses.id, input.id)
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
        title: input.name,
      })
      .where(eq(statuses.id, input.id))

    revalidatePath(`/app/board/${input.boardId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function deleteColumn(input: DeleteColumnSchema) {
  try {
    const board = await db.query.statuses.findFirst({
      where: eq(statuses.id, input.columnId),
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
    WHERE statuses.id = ${input.columnId};
  `)

    revalidatePath(`/app/board/${input.boardId}`)

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

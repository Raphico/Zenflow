"use server"

import { db } from "@/db"
import { subtasks, tasks } from "@/db/schema"

import { z } from "zod"
import { addTaskSchema } from "../validations/task"
import { revalidatePath } from "next/cache"

const extendedAddTaskSchema = addTaskSchema.extend({
  boardId: z.number(),
})

export async function addTask(
  rawInputs: z.infer<typeof extendedAddTaskSchema>
) {
  try {
    const inputs = extendedAddTaskSchema.parse(rawInputs)

    // ensuring that all database operations are part of a single transaction to prevent partial updates and improve consistency
    await db.transaction(async (tx) => {
      const task = await tx
        .insert(tasks)
        .values({
          statusId: inputs.statusId,
          title: inputs.title,
          description: inputs.description,
          dueDate: inputs.dueDate,
          priority: inputs.priority,
          tag: inputs.tag,
        })
        .execute()

      const subtaskPromises = inputs.subtasks.map(async (subtask) => {
        await tx.insert(subtasks).values({
          taskId: parseInt(task.insertId),
          title: subtask.title,
          done: subtask.done,
          dueDate: subtask.dueDate,
        })
      })

      await Promise.all(subtaskPromises)
    })

    revalidatePath(`/app/board/${inputs.boardId}`)
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

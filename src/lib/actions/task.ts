"use server"

import { db } from "@/db"
import { subtasks, tasks } from "@/db/schema"

import { z } from "zod"
import { taskSchema } from "../validations/task"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

const extendedTaskSchema = taskSchema.extend({
  boardId: z.number(),
  statusId: z.number(),
})

export async function addTask(rawInputs: z.infer<typeof extendedTaskSchema>) {
  try {
    const inputs = extendedTaskSchema.parse(rawInputs)

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

const extendedTaskSchemaWithId = extendedTaskSchema.extend({
  id: z.number(),
})

export async function updateTask(
  rawInputs: z.infer<typeof extendedTaskSchemaWithId>
) {
  try {
    const inputs = extendedTaskSchemaWithId.parse(rawInputs)

    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, inputs.id),
      with: {
        subtasks: true,
      },
      columns: { id: true },
    })

    if (!task) {
      throw new Error("Task doesn't exist!")
    }

    await db.transaction(async (tx) => {
      await tx
        .update(tasks)
        .set({
          title: inputs.title,
          description: inputs.description,
          dueDate: inputs.dueDate,
          tag: inputs.tag,
          priority: inputs.priority,
          statusId: inputs.statusId,
        })
        .where(eq(tasks.id, inputs.id))

      const subtaskOperations = inputs.subtasks.map((subtask) => {
        // If the subtask already exists, update it, else it's new so add it
        if (subtask.id) {
          return tx
            .update(subtasks)
            .set({
              title: subtask.title,
              done: subtask.done,
              dueDate: subtask.dueDate,
            })
            .where(eq(subtasks.id, subtask.id))
        } else {
          return tx.insert(subtasks).values({
            taskId: inputs.id,
            title: subtask.title,
            done: subtask.done,
            dueDate: subtask.dueDate,
          })
        }
      })

      const subtasksToDelete = task.subtasks.filter(
        (subtask) => !inputs.subtasks.some((s) => s.id === subtask.id)
      )

      const deleteSubtaskOperations = subtasksToDelete.map((subtask) =>
        tx.delete(subtasks).where(eq(subtasks.id, subtask.id))
      )

      await Promise.all([...subtaskOperations, ...deleteSubtaskOperations])
    })

    revalidatePath(`/app/board/${inputs.boardId}`)
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function deleteTask({
  taskId,
  boardId,
}: {
  taskId: number
  boardId: number
}) {
  const taskExists = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  })

  if (!taskExists) {
    throw new Error("Task doesn't exists!")
  }

  await db.delete(tasks).where(eq(tasks.id, taskId))

  // Delete all statues of this board
  await db.delete(subtasks).where(eq(subtasks.taskId, taskId))

  revalidatePath(`/app/board/${boardId}`)
}

export async function updateTaskDone({
  taskId,
  boardId,
  isDone,
}: {
  taskId: number
  boardId: number
  isDone: boolean
}) {
  const taskExists = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  })

  if (!taskExists) {
    throw new Error("Task doesn't exists!")
  }

  await db
    .update(tasks)
    .set({
      done: !isDone,
    })
    .where(eq(tasks.id, taskId))

  revalidatePath(`/app/board/${boardId}`)
}

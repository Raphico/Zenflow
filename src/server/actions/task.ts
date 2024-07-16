"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import {
  type AddTaskSchema,
  type DeleteTaskSchema,
  type UpdateTaskDoneSchema,
  type UpdateTaskSchema,
} from "@/lib/zod/schemas/task"
import { getErrorMessage } from "@/utils/hanld-error"

import { db } from "../db"
import { subtasks, tasks } from "../db/schema"

export async function addTask(input: AddTaskSchema) {
  try {
    // ensuring that all database operations are part of a single transaction to prevent partial updates and improve consistency
    await db.transaction(async (tx) => {
      const task = await tx
        .insert(tasks)
        .values({
          statusId: input.statusId,
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          priority: input.priority,
          tag: input.tag || null,
        })
        .returning({ insertId: tasks.id })

      const subtaskPromises = input.subtasks.map(async (subtask) => {
        await tx.insert(subtasks).values({
          taskId: task[0].insertId,
          title: subtask.title,
          done: subtask.done,
          dueDate: subtask.dueDate,
        })
      })

      await Promise.all(subtaskPromises)
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

export async function updateTask(input: UpdateTaskSchema) {
  try {
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, input.id),
      with: {
        subtasks: true,
      },
    })

    if (!task) {
      throw new Error("Task doesn't exist!")
    }

    await db.transaction(async (tx) => {
      await tx
        .update(tasks)
        .set({
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          tag: input.tag || null,
          priority: input.priority,
          statusId: input.statusId,
        })
        .where(eq(tasks.id, input.id))

      const subtaskOperations = input.subtasks.map((subtask) => {
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
            taskId: input.id,
            title: subtask.title,
            done: subtask.done,
            dueDate: subtask.dueDate,
          })
        }
      })

      const subtasksToDelete = task.subtasks.filter(
        (subtask) => !input.subtasks.some((s) => s.id === subtask.id)
      )

      const deleteSubtaskOperations = subtasksToDelete.map((subtask) =>
        tx.delete(subtasks).where(eq(subtasks.id, subtask.id))
      )

      await Promise.all([...subtaskOperations, ...deleteSubtaskOperations])
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

export async function deleteTask(input: DeleteTaskSchema) {
  try {
    await db.delete(tasks).where(eq(tasks.id, input.taskId))

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

export async function updateTaskDone(input: UpdateTaskDoneSchema) {
  try {
    await db
      .update(tasks)
      .set({
        done: !input.isDone,
      })
      .where(eq(tasks.id, input.taskId))

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

"use server"

import { db } from "@/db"
import { subtasks, tasks } from "@/db/schema"

import type { z } from "zod"
import { updateTaskSchema } from "../validations/task"
import { revalidatePath } from "next/cache"

export async function addTask(rawInputs: z.infer<typeof updateTaskSchema>) {
  try {
    const inputs = updateTaskSchema.parse(rawInputs)

    const newTask = await db.insert(tasks).values({
      statusId: inputs.statusId,
      title: inputs.title,
      description: inputs.description,
      dueDate: inputs.dueDate,
      priority: inputs.priority,
      tag: inputs.tag,
    })

    if (newTask && inputs.subtasks && inputs.subtasks.length > 0) {
      const subtaskPromises = inputs.subtasks.map(async (subtask) => {
        await db.insert(subtasks).values({
          taskId: parseInt(newTask.insertId),
          title: subtask.title,
          done: subtask.done,
          dueDate: subtask.dueDate,
        })
      })

      await Promise.all(subtaskPromises)
    }

    revalidatePath(`/app/board`)
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

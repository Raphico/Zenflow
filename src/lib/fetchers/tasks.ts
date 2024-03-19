"use server"

import { db } from "@/db"
import { tasks, type Task } from "@/db/schema"
import { and, asc, between, desc, eq, inArray } from "drizzle-orm"
import type { z } from "zod"

import { calculateDueDates } from "../utils"
import type { getTasksSchema } from "../validations/task"

export async function getTasks(inputs: z.infer<typeof getTasksSchema>) {
  try {
    const [column, order] = (inputs.sort?.split(".") as [
      keyof Task | undefined,
      "asc" | "desc" | undefined,
    ]) ?? ["createdAt", "desc"]
    const priorities =
      (inputs.priorities?.split(".") as Task["priority"][]) ?? []
    const dueDate = inputs.dueDate ? calculateDueDates(inputs.dueDate) : null

    return await db.query.tasks.findMany({
      where: and(
        eq(tasks.statusId, inputs.statusId),
        priorities.length ? inArray(tasks.priority, priorities) : undefined,
        dueDate
          ? between(tasks.dueDate, dueDate.startDate, dueDate.endDate)
          : undefined
      ),
      with: {
        subtasks: {
          columns: {
            id: true,
            title: true,
            done: true,
            dueDate: true,
          },
        },
      },
      orderBy: [
        tasks.done,
        column && column in tasks
          ? order === "asc"
            ? asc(tasks[column])
            : desc(tasks[column])
          : desc(tasks.createdAt),
      ],
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

import "server-only"

import { and, asc, between, desc, eq, inArray } from "drizzle-orm"
import type { z } from "zod"

import type { getTasksSchema } from "@/lib/zod/schemas/task"
import { calculateDueDates } from "@/utils/calculate-due-dates"

import { db } from "../db"
import { tasks, type Task } from "../db/schema"

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

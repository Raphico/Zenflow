import "server-only"

import { db } from "@/db"
import { subtasks } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getSubtasks(taskId: number) {
  return await db
    .select({
      id: subtasks.id,
      title: subtasks.title,
      done: subtasks.done,
      dueDate: subtasks.dueDate,
    })
    .from(subtasks)
    .where(eq(subtasks.taskId, taskId))
}

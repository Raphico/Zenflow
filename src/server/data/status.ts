import "server-only"

import { eq, sql } from "drizzle-orm"

import { db } from "../db"
import { statuses, tasks } from "../db/schema"

export async function getBoardStatuses(boardId: number) {
  try {
    return await db.transaction(async (tx) => {
      const boardStatuses = await tx
        .select({
          id: statuses.id,
          title: statuses.title,
        })
        .from(statuses)
        .where(eq(statuses.boardId, boardId))

      const allTasks = await tx
        .select({
          statusId: tasks.statusId,
          count: sql<number>`count(*)`,
        })
        .from(tasks)
        .groupBy(tasks.statusId)

      const taskCountByStatus = allTasks.reduce<{ [key: number]: number }>(
        (acc, task) => {
          acc[task.statusId] = task.count
          return acc
        },
        {}
      )

      const statusesWithTaskCount = boardStatuses.map((status) => ({
        ...status,
        taskCount: taskCountByStatus[status.id] || 0,
      }))

      return statusesWithTaskCount
    })
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

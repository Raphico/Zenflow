"use server"

import { db } from "@/db"
import { boards, statuses, tasks } from "@/db/schema"
import { desc, sql, gte, and, lte, eq } from "drizzle-orm"
import { endOfWeek, startOfWeek } from "date-fns"

const startDate = startOfWeek(new Date())
const endDate = endOfWeek(new Date())

export async function getTaskCompletionRates(userId: string) {
  try {
    return await db
      .select({
        createdAt: tasks.createdAt,
        completedTasks: sql<number>`sum(tasks.done)`,
      })
      .from(tasks)
      .innerJoin(statuses, eq(statuses.id, tasks.statusId))
      .innerJoin(boards, eq(boards.id, statuses.boardId))
      .where(
        and(
          eq(boards.userId, userId),
          gte(tasks.createdAt, startDate),
          lte(tasks.createdAt, endDate)
        )
      )
      .groupBy(tasks.createdAt)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getPriorityAnalysis(userId: string) {
  try {
    return await db
      .select({
        priority: tasks.priority,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .innerJoin(statuses, eq(statuses.id, tasks.statusId))
      .innerJoin(boards, eq(boards.id, statuses.boardId))
      .where(eq(boards.userId, userId))
      .groupBy(tasks.priority)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getTaskDistributionByStatus(userId: string) {
  try {
    return await db
      .select({
        title: statuses.title,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .innerJoin(statuses, eq(statuses.id, tasks.statusId))
      .innerJoin(boards, eq(boards.id, statuses.boardId))
      .where(eq(boards.userId, userId))
      .groupBy(statuses.createdAt, statuses.title)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getPopularTags(userId: string) {
  try {
    return await db
      .select({
        tag: tasks.tag,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .innerJoin(statuses, eq(statuses.id, tasks.statusId))
      .innerJoin(boards, eq(boards.id, statuses.boardId))
      .where(eq(boards.userId, userId))
      .groupBy(tasks.tag)
      .orderBy(({ count }) => desc(count))
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

"use server"

import { db } from "@/db"
import { statuses, tasks } from "@/db/schema"
import { desc, sql, sum, gte, and, lte, eq } from "drizzle-orm"
import { endOfWeek, startOfWeek } from "date-fns"

const startDate = startOfWeek(new Date())
const endDate = endOfWeek(new Date())

export async function getTaskCompletionRates() {
  try {
    return await db
      .select({
        createdAt: tasks.createdAt,
        count: sql<number>`count(*)`,
        completedTasks: sum(tasks.done),
      })
      .from(tasks)
      .where(
        and(gte(tasks.createdAt, startDate), lte(tasks.createdAt, endDate))
      )
      .groupBy(tasks.createdAt)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getPriorityAnalysis() {
  try {
    return await db
      .select({
        priority: tasks.priority,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .groupBy(tasks.priority)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getTaskDistributionByStatus() {
  try {
    return await db
      .select({
        createdAt: statuses.createdAt,
        title: statuses.title,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .innerJoin(statuses, eq(statuses.id, tasks.statusId))
      .groupBy(statuses.createdAt, statuses.title)
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

export async function getPopularTags() {
  try {
    return await db
      .select({
        tag: tasks.tag,
        count: sql<number>`count(*)`,
      })
      .from(tasks)
      .groupBy(tasks.tag)
      .orderBy(({ count }) => desc(count))
  } catch (error) {
    console.error(error)
    throw error instanceof Error
      ? error
      : new Error("Something went wrong, please try again.")
  }
}

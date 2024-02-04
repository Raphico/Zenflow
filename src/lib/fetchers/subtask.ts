"use server"

import { db } from "@/db"
import { subtasks } from "@/db/schema"
import { eq } from "drizzle-orm"

import { unstable_cache as cache } from "next/cache"

export async function getSubtasks(taskId: number) {
  try {
    return await cache(
      async () => {
        return await db.query.subtasks.findMany({
          where: eq(subtasks.taskId, taskId),
        })
      },
      ["subtasks"],
      {
        revalidate: 900,
        tags: ["subtasks"],
      }
    )()
  } catch (err) {
    console.error(err)
    return []
  }
}

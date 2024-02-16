"use server"

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { boards } from "@/db/schema"

export async function getAllBoards(inputs: { userId: string }) {
  return await db.query.boards.findMany({
    where: eq(boards.userId, inputs.userId),
  })
}

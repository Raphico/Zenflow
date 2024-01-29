"use server"

import { revalidatePath } from "next/cache"

import { statuses } from "@/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/db"

import { createColumnSchema } from "../validations/column"
import type { z } from "zod"

export async function createColumn(
  rawInputs: z.infer<typeof createColumnSchema>
) {
  const inputs = createColumnSchema.parse(rawInputs)

  const columnExists = await db.query.statuses.findFirst({
    where: eq(statuses.title, inputs.name),
  })

  if (columnExists) {
    throw new Error("Board already exists")
  }

  await db.insert(statuses).values({
    boardId: inputs.boardId,
    title: inputs.name,
  })

  revalidatePath(`/app/board/${inputs.boardId}`)
}

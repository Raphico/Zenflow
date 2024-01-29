import { z } from "zod"

export const columnSchema = z.object({
  name: z.string(),
})

export const createColumnSchema = z.object({
  boardId: z.number(),
  name: columnSchema.shape.name,
})

import { z } from "zod"

export const columnSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Column name cannot be empty",
    })
    .max(35, {
      message: "Column name cannot exceed 35 characters",
    }),
})

export const createColumnSchema = z.object({
  boardId: z.number(),
  name: columnSchema.shape.name,
})

export const updateColumnSchema = z.object({
  boardId: createColumnSchema.shape.boardId,
  id: z.number(),
  name: columnSchema.shape.name,
})

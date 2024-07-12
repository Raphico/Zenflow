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
  id: z.number(),
  boardId: z.number(),
  name: columnSchema.shape.name,
})

export const deleteColumnSchema = z.object({
  boardId: z.number(),
  columnId: z.number(),
})

export type DeleteColumnSchema = z.infer<typeof deleteColumnSchema>
export type ColumnSchema = z.infer<typeof columnSchema>
export type CreateColumnSchema = z.infer<typeof createColumnSchema>
export type UpdateColumnSchema = z.infer<typeof updateColumnSchema>

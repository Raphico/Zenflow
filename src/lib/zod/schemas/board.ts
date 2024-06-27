import { z } from "zod"

export const boardSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Board name cannot be empty",
    })
    .max(35, {
      message: "Board name cannot exceed 35 characters",
    }),
})

export const updateBoardSchema = z.object({
  userId: z.string(),
  id: z.number(),
  name: boardSchema.shape.name,
})

export const filterBoardSchema = z.object({
  query: z.string().optional(),
})

export const getBoardSchema = z.object({
  userId: z.string(),
  boardId: z.number(),
})

export const getBoardsSchema = z.object({
  userId: z.string(),
  query: filterBoardSchema.shape.query,
})

export type GetBoardSchema = z.infer<typeof getBoardSchema>

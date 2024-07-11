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

export type GetBoardsSchema = z.infer<typeof getBoardsSchema>
export type GetBoardSchema = z.infer<typeof getBoardSchema>
export type FilterBoardSchema = z.infer<typeof filterBoardSchema>
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>
export type BoardSchema = z.infer<typeof boardSchema>

import { z } from "zod"

export const createBoardSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Board name cannot be empty",
    })
    .max(35, {
      message: "Board name cannot exceed 35 characters",
    }),
})

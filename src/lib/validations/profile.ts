import { z } from "zod"

export const profileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message:
        "Username must be at least 3 characters long. Please choose a longer username.",
    })
    .max(20, {
      message:
        "Username must be no more than 20 characters. Please choose a shorter username.",
    })
    .regex(/^[a-z0-9]+$/, {
      message: "Username must contain lowercase letters and numbers only.",
    }),
})

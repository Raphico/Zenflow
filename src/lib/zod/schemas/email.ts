import { z } from "zod"

export const joinNewsletterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

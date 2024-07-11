import { z } from "zod"

export const preferenceSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
})

export type PreferenceSchema = z.infer<typeof preferenceSchema>

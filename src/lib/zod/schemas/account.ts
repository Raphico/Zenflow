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

export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must be at least 8 characters long and must contain at least one letter, one number, and one special character",
    }),
})

export const userPrivateMetadataSchema = z.object({
  stripePriceId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeCurrentPeriodEnd: z.string().optional().nullable(),
})

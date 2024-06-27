import { z } from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
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

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
})

export const resetPasswordRequestSchema = z.object({
  email: authSchema.shape.email,
})

export const passwordVerificationSchema = z.object({
  code: verifyEmailSchema.shape.code,
  password: authSchema.shape.password,
})

export type AuthSchema = z.infer<typeof authSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ResetPasswordRequestSchema = z.infer<
  typeof resetPasswordRequestSchema
>
export type PasswordVerificationSchema = z.infer<
  typeof passwordVerificationSchema
>

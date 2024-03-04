"use server"

import type { z } from "zod"
import { changePasswordSchema, profileSchema } from "../validations/account"
import { auth, clerkClient } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export async function updateProfile(rawInputs: z.infer<typeof profileSchema>) {
  const inputs = profileSchema.parse(rawInputs)

  const { userId } = auth()

  if (!userId) {
    throw new Error("User not found!")
  }

  await clerkClient.users.updateUser(userId, {
    username: inputs.username,
  })

  revalidatePath("/profile/account")
}

export async function updateUserPassword(
  rawInputs: z.infer<typeof changePasswordSchema>
) {
  const inputs = changePasswordSchema.parse(rawInputs)

  const { userId } = auth()

  if (!userId) {
    throw new Error("User not found!")
  }

  await clerkClient.users.updateUser(userId, {
    password: inputs.newPassword,
  })
}

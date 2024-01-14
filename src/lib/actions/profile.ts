"use server"

import type { z } from "zod"
import { profileSchema } from "../validations/profile"
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

export async function deleteAccount() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("User not found!")
  }

  await clerkClient.users.deleteUser(userId)

  revalidatePath("/sign-in")
}

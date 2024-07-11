"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs"

import {
  type ChangePasswordSchema,
  type ProfileSchema,
} from "@/lib/zod/schemas/account"
import { getErrorMessage } from "@/utils/hanld-error"

export async function updateProfile(input: ProfileSchema) {
  try {
    const { userId } = auth()

    if (!userId) {
      throw new Error("User not found!")
    }

    await clerkClient.users.updateUser(userId, {
      username: input.username,
    })

    revalidatePath("/profile/account")

    return {
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function updateUserPassword(input: ChangePasswordSchema) {
  try {
    const { userId } = auth()

    if (!userId) {
      throw new Error("User not found!")
    }

    await clerkClient.users.updateUser(userId, {
      password: input.newPassword,
    })
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}

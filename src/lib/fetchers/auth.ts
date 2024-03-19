import "server-only"

import { currentUser } from "@clerk/nextjs"

export async function getCachedUser() {
  try {
    return await currentUser()
  } catch (error) {
    console.error(error)
    return null
  }
}

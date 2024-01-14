import "server-only"
import { currentUser } from "@clerk/nextjs"

export const getCachedUser = async () => {
  try {
    return await currentUser()
  } catch (error) {
    console.error(error)
    return null
  }
}

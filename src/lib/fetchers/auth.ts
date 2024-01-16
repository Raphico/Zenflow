import "server-only"
import { currentUser } from "@clerk/nextjs"
import { unstable_cache as cache } from "next/cache"

export const getCachedUser = cache(
  async () => {
    try {
      return await currentUser()
    } catch (error) {
      console.error
      return null
    }
  },
  ["cached-user"],
  {
    tags: ["cached-user"],
    revalidate: 900,
  }
)

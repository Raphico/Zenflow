// see for more information https://nextjs.org/docs/app/api-reference/functions/unstable_cache

import { currentUser } from "@clerk/nextjs"
import { unstable_cache } from "next/cache"

export const getCachedUser = unstable_cache(
  async () => await currentUser(),
  ["cached-user"],
  {
    revalidate: 900,
    tags: ["cached-user"],
  }
)

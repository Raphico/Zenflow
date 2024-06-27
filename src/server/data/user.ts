import "server-only"

import { cache } from "react"
import { currentUser } from "@clerk/nextjs/server"

/**
 * Cache is used with a data-fetching function like fetch to share a data snapshot between components.
 * It ensures a single request is made for multiple identical data fetches, with the returned data cached and shared across components during the server render.
 * @see https://react.dev/reference/react/cache#reference
 */
export const getCachedUser = cache(currentUser)

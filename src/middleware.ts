import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/pricing(.*)",
    "/sso-callback(.*)",
    "/blog(.*)",
    "/stack(.*)",
    "/api(.*)",
  ],
  afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin)

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      url.pathname = "/sign-in"
      return NextResponse.redirect(url)
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next()
    }

    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

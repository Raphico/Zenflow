import Link from "next/link"
import { getCachedUser } from "@/lib/fetchers/auth"
import { redirect } from "next/navigation"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser()

  if (user) {
    redirect("/app/dashboard")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-8 top-6 flex items-center gap-2">
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="font-semibold">{siteConfig.name}</span>
      </Link>
      <main className="container grid max-w-md gap-6">{children}</main>
    </div>
  )
}

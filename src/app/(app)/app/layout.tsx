import { getCachedUser } from "@/lib/fetchers/auth"
import { redirect } from "next/navigation"

import { AppHeader } from "@/components/layouts/app-header"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={user} />
      <main className="container flex-1 py-8 lg:py-10">{children}</main>
    </div>
  )
}

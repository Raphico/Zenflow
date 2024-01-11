import { getCachedUser } from "@/lib/fetchers/auth"
import { redirect } from "next/navigation"

import { DashboardHeader } from "./_components/dashboard-header"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}

import { redirect } from "next/navigation"
import { getCachedUser } from "@/lib/fetchers/auth"

import { AppHeader } from "@/components/layouts/app-header"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { dashboardConfig } from "@/config/dashboard"

export default async function ProfileLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-8 pr-6 lg:py-10 ">
            <SidebarNav items={dashboardConfig.sidebarNav} />
          </div>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden p-1 py-8 pr-6 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}

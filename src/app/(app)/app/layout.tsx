import { getCachedUser } from "@/lib/fetchers/auth"
import { redirect } from "next/navigation"

import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { dashboardConfig } from "@/config/dashboard"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-50 flex h-14 w-full items-center px-4">
        <SidebarNav
          user={{
            username: user.username,
            imageUrl: user.imageUrl,
          }}
          items={dashboardConfig.sidebarNav}
        />
      </header>
      <main className="flex-1 px-8 py-2">{children}</main>
    </div>
  )
}

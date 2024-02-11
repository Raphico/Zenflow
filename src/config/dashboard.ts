import { type DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/app/dashboard",
      icon: "dashboard",
    },
    {
      title: "Analytics",
      href: "/app/analytics",
      icon: "analytics",
    },
    {
      title: "Preferences",
      href: "/app/preferences",
      icon: "settings",
    },
    {
      title: "Account",
      href: "/app/account",
      icon: "user",
    },
    {
      title: "Billing",
      href: "/app/billing",
      icon: "dollar",
    },
  ],
}

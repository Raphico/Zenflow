import { type DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/app/dashboard",
    },
    {
      title: "Analytics",
      href: "/app/analytics",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Account",
      href: "/profile/account",
      icon: "user",
    },
    {
      title: "Billing",
      href: "/profile/billing",
      icon: "dollar",
      disabled: true,
    },
    {
      title: "Preferences",
      href: "/profile/preferences",
      icon: "settings",
    },
  ],
}

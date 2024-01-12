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
}

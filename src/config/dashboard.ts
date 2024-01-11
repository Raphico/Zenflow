import { type DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      disabled: true,
    },
  ],
}

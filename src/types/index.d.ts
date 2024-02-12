import type { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    githubAccount: string
    discord: string
  }
  mainNav: NavItem[]
  footerNav: {
    title: string
    items: NavItem[]
  }[]
}

type SidebarNavItem = NavItem & { icon: keyof typeof Icons }

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionConfig = {
  name: string
  features: string[]
  price: number
}

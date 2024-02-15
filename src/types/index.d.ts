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

export type SubscriptionPlan = {
  name: "Free" | "Pro"
  features: string[]
  price: number
  stripePriceId: string
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null
  stripeCurrentPeriodEnd?: string | null
  stripeCustomerId?: string | null
  isSubscribed: boolean
  isCanceled: boolean
  isActive: boolean
}

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

export type DashboardConfig = {
  mainNav: NavItem[]
}

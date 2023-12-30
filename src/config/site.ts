import type { SiteConfig } from "@/types"

const links = {
  twitter: "https://twitter.com/Raphico_OA",
  github: "https://github.com/Raphico/Zenflow",
  githubAccount: "https://github.com/Raphico",
  discord: "",
}

export const siteConfig: SiteConfig = {
  name: "Zenflow",
  description:
    "An intuitive task manager designed to streamline your daily activities",
  url: "https://zenflow.vercel.app/",
  ogImage: "https://zenflow.vercel.app/og.png",
  links,
}

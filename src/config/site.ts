import type { SiteConfig } from "@/types"

const links = {
  twitter: "https://twitter.com/Raphico_OA",
  github: "https://github.com/Raphico/Zenflow",
  githubAccount: "https://github.com/Raphico",
  discord: "https://discord.com/users/raphico",
}

export const siteConfig: SiteConfig = {
  name: "Zenflow",
  description:
    "An intuitive task manager designed to streamline your daily activities",
  url: "https://zenflow.vercel.app/",
  ogImage: "https://zenflow.vercel.app/og.png",
  links,
  mainNav: [
    {
      title: "Stack",
      href: "/stack",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Pricing",
      href: "/pricing",
      disabled: true,
    },
  ],
  footerNav: [
    {
      title: "Credits",
      items: [
        {
          title: "Taxonomy",
          href: "https://github.com/shadcn-ui/taxonomy",
          external: true,
        },
        {
          title: "skateshop",
          href: "https://github.com/sadmann7/skateshop/",
          external: true,
        },
        {
          title: "shadcn/ui",
          href: "https://ui.shadcn.com/",
          external: true,
        },
      ],
    },
    {
      title: "Socials",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "Github",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
      ],
    },
    {
      title: "Zenflow Tunes",
      items: [
        {
          title: "~CZ~",
          href: "https://soundcloud.com/user-471347893",
          external: true,
        },
        {
          title: "LAGXNA",
          href: "https://open.spotify.com/search/LAGXNA",
          external: true,
        },
        {
          title: "Miyamoto Musashi Meditation",
          href: "https://youtu.be/VK6sh73APFE?si=2cXysOOUI_4PJ7BH",
          external: true,
        },
        {
          title: "Flow of time",
          href: "https://youtu.be/EtD7_8kCMHA?si=8XrkiVbDoFJsyoTv",
          external: true,
        },
      ],
    },
  ],
}

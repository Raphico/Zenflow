import type { Metadata, Viewport } from "next"
import { env } from "../env.mjs"

import "@/styles/globals.css"

import { Inter as FontSans, Montserrat as FontHeading } from "next/font/google"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Task Manager",
    "Productivity Tool",
    "Task Organization",
    "Time Management",
    "Task Priority",
    "To-Do List",
    "Deadline Management",
    "Task Tracking",
    "Task Categories",
    "Task Tags",
    "Zenflow App",
    "Project Management",
    "Workflow Optimization",
    "Efficient Task Management",
    "Daily Productivity",
    "User-Friendly Task Manager",
    "Mobile Task Management",
  ],
  authors: [
    {
      name: "Raphico",
      url: "https://github.com/Raphico",
    },
  ],
  creator: "Raphico",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@Raphico",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}

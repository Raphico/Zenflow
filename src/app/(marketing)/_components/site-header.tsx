"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" aria-hidden="true" />
            <span className="hidden text-lg font-bold lg:inline-block">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {siteConfig.mainNav.map((item) => {
              const isActive = pathname.includes(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground",
                    item.disabled && "pointer-events-none opacity-60"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        <MobileNav />

        <Link href="/sign-in" className={cn(buttonVariants({ size: "sm" }))}>
          Sign In
        </Link>
      </div>
    </header>
  )
}

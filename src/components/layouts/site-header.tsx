"use client"

import { siteConfig } from "@/config/site"
import { Icons } from "../icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { buttonVariants } from "../ui/button"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
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
                  href={item?.disabled ? "#" : item.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-colors",
                    {
                      "text-foreground": isActive,
                      "opacity-50 cursor-not-allowed": item?.disabled,
                      "hover:text-foreground": !item?.disabled,
                    }
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>

        <Link
          href="#"
          className={cn("cursor-not-allowed", buttonVariants({ size: "sm" }))}
        >
          Sign In
        </Link>
      </div>
    </header>
  )
}

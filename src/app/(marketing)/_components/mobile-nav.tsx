"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export function MobileNav() {
  const pathname = usePathname()
  const [showNav, setShowNav] = React.useState(false)

  const toggleNav = () => setShowNav((prev) => !prev)

  return (
    <div className="flex sm:hidden">
      <button className="flex items-center justify-center" onClick={toggleNav}>
        {showNav ? (
          <Icons.close className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Icons.menu className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="sr-only">Menu</span>
      </button>

      {showNav && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
          )}
        >
          <div className="relative z-20 grid gap-6 rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {siteConfig.mainNav.map((item) => {
                const isActive = pathname.includes(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                      item.disabled && "pointer-events-none opacity-60",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                    onClick={toggleNav}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils"

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {dashboardConfig.mainNav.map((item) => {
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
  )
}

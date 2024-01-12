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
  )
}

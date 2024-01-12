"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"

export interface SidebarNavProps {
  items: NavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex w-full flex-col gap-2 p-1">
      {items.map((item) => {
        const Icon = item.icon && Icons[item.icon]

        return (
          <Link
            key={item.href}
            aria-label={item.title}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
              item.disabled && "pointer-events-none opacity-60"
            )}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

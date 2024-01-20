"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import type { SidebarNavItem } from "@/types"
import type { User } from "@clerk/nextjs/server"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface SidebarProps {
  user: Pick<User, "username" | "imageUrl">
  items: SidebarNavItem[]
}

export function Sidebar({ user, items }: SidebarProps) {
  const segment = useSelectedLayoutSegment()
  const [isOpen, setIsOpen] = React.useState(false)

  const initial = user.username?.charAt(0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.view className="h-6 w-6 opacity-70" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="space-y-8 px-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.imageUrl} alt={`Picture`} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            {user.username && (
              <span className="text-sm font-bold">
                {user.username}&apos;s Flow
              </span>
            )}
          </div>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Icons.close className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <nav className="flex flex-col items-start gap-2">
          {items.map((item) => {
            const Icon = Icons[item.icon]
            const isActive = item.href.includes(segment as string)

            return (
              <Link
                key={item.href}
                aria-label={item.title}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  isActive && "bg-muted hover:bg-muted",
                  item.disabled && "pointer-events-none opacity-60"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

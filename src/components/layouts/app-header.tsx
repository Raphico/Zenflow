import Link from "next/link"
import type { User } from "@clerk/nextjs/server"

import { Icons } from "@/components/icons"
import { AppNav } from "./app-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserEmail } from "@/lib/utils"

interface DashboardHeaderProps {
  user: User | null
}

export function AppHeader({ user }: DashboardHeaderProps) {
  const email = getUserEmail(user)

  const initial = email.charAt(0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Icons.logo className="h-6 w-6" aria-hidden="true" />
          <AppNav />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`${user?.username} Picture`}
                />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.username}
                </p>
                <p className="text-[12px] text-muted-foreground">{email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile/account">
                <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#">
                <Icons.dollar className="mr-2 h-4 w-4" aria-hidden="true" />
                Billing
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="#">
                <Icons.settings className="mr-2 h-4 w-4" aria-hidden="true" />
                Preference
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
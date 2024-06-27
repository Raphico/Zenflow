import * as React from "react"
import { notFound, redirect } from "next/navigation"
import { getBoard } from "@/server/data/board"
import { getCachedUser } from "@/server/data/user"

import { redirects } from "@/config/constants"
import { dashboardConfig } from "@/config/dashboard"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"

import { Sidebar } from "../../_components/sidebar"
import { View } from "./_components/view"

interface BoardLayoutProps {
  children: React.ReactNode
  params: {
    boardId: number
  }
}

export default async function BoardLayout({
  children,
  params,
}: BoardLayoutProps) {
  const user = await getCachedUser()

  if (!user) {
    redirect(redirects.toSignIn)
  }

  const { boardId } = params

  const board = await getBoard({
    userId: user.id,
    boardId,
  })

  if (!board) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-background px-4">
        <Sidebar
          user={{
            username: user.username,
            imageUrl: user.imageUrl,
          }}
          items={dashboardConfig.sidebarNav}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <Icons.filters className="mr-2 h-4 w-4" aria-hidden="true" />
              View
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 pb-2">
            <View />
          </PopoverContent>
        </Popover>
      </header>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-8 pb-4 pt-2">
        <PageHeader>
          <PageHeaderHeading>{board.name}</PageHeaderHeading>
        </PageHeader>
      </div>
      <main className="flex flex-1 flex-col overflow-x-auto overscroll-x-contain">
        {children}
      </main>
    </div>
  )
}

import * as React from "react"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { boards } from "@/db/schema"
import { and, eq } from "drizzle-orm"

import { dashboardConfig } from "@/config/dashboard"
import { getCachedUser } from "@/lib/fetchers/auth"
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

export async function generateMetadata({
  params,
}: BoardLayoutProps): Promise<Metadata> {
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, params.boardId),
  })

  if (!board) return {}

  return {
    title: board.name,
    description: `Manage tasks within ${board.name}`,
  }
}

export default async function BoardLayout({
  children,
  params,
}: BoardLayoutProps) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  const board = await db.query.boards.findFirst({
    where: and(eq(boards.userId, user.id), eq(boards.id, params.boardId)),
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

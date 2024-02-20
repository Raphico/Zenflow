import * as React from "react"
import type { Metadata } from "next"
import { getCachedUser } from "@/lib/fetchers/auth"
import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { eq, and } from "drizzle-orm"
import { boards } from "@/db/schema"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { EditBoardDialog } from "@/components/dialogs/edit-board-dialog"
import { Sidebar } from "@/components/layouts/sidebar"
import { dashboardConfig } from "@/config/dashboard"

interface BoardLayoutProps {
  children: React.ReactNode
  params: {
    boardId: number
  }
}

export async function generateMetadata({
  boardId,
}: BoardLayoutProps["params"]): Promise<Metadata> {
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId),
  })

  if (!board) return {}

  return {
    title: board.name,
    description: `Manage tasks within ${board.name}`,
  }
}

export default async function DashboardLayout({
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
      <header className="container sticky top-0 z-50 flex h-14 w-full items-center bg-background px-4">
        <Sidebar
          user={{
            username: user.username,
            imageUrl: user.imageUrl,
          }}
          items={dashboardConfig.sidebarNav}
        />
      </header>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-8 pb-4 pt-2">
        <PageHeader>
          <PageHeaderHeading>{board.name}</PageHeaderHeading>
        </PageHeader>
        <EditBoardDialog userId={user.id} board={board} />
      </div>
      <main className="flex flex-1 flex-col overflow-x-auto overscroll-x-contain">
        {children}
      </main>
    </div>
  )
}

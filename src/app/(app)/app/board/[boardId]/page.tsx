import * as React from "react"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { db } from "@/db"
import { eq, and } from "drizzle-orm"
import { boards } from "@/db/schema"
import { getCachedUser } from "@/lib/fetchers/auth"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import {
  BoardStatuses,
  BoardStatusesSkeleton,
} from "../../../../../components/board-statuses"
import { EditBoardDialog } from "@/components/dialogs/edit-board-dialog"

interface BoardPageProps {
  params: {
    boardId: number
  }
}

export async function generateMetadata({
  params,
}: BoardPageProps): Promise<Metadata> {
  const boardId = params.boardId

  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId),
  })

  if (!board) return {}

  return {
    title: board.name,
    description: `Manage tasks within ${board.name}`,
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const user = await getCachedUser()

  if (!user) redirect("/sign-in")

  const board = await db.query.boards.findFirst({
    where: and(eq(boards.userId, user.id), eq(boards.id, params.boardId)),
  })

  if (!board) {
    return notFound()
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
      <div className="flex w-full items-center gap-2 px-8 pt-2">
        <PageHeader>
          <PageHeaderHeading>{board.name}</PageHeaderHeading>
        </PageHeader>
        <EditBoardDialog userId={user.id} board={board} />
      </div>

      <React.Suspense fallback={<BoardStatusesSkeleton />}>
        <BoardStatuses boardId={board.id} userId={user.id} />
      </React.Suspense>
    </div>
  )
}

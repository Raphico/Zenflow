import type { Metadata } from "next"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { boards } from "@/db/schema"

import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { notFound } from "next/navigation"

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
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, params.boardId),
  })

  if (!board) {
    return notFound()
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <PageHeader>
        <PageHeaderHeading>{board?.name}</PageHeaderHeading>
      </PageHeader>
    </div>
  )
}

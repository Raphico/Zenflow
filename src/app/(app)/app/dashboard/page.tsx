import { type Metadata } from "next"
import { db } from "@/db"
import { boards } from "@/db/schema"
import { and, eq, like } from "drizzle-orm"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { SearchBoards } from "@/components/search-boards"
import { BoardCard } from "@/components/cards/board-card"
import { CreateBoardDialog } from "@/components/dialogs/create-board-dialog"
import { getCachedUser } from "@/lib/fetchers/auth"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your boards",
}

interface DashboardPageProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const user = await getCachedUser()

  if (!user) return null

  const allBoards = props.searchParams.search
    ? await db.query.boards.findMany({
        where: and(
          eq(boards.userId, user.id),
          like(boards.name, `%${props.searchParams.search}%`)
        ),
      })
    : await db.query.boards.findMany({
        where: eq(boards.userId, user.id),
      })

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-8 py-2">
      <PageHeader>
        <PageHeaderHeading>My Boards</PageHeaderHeading>
        <PageHeaderDescription>
          Here&apos;s a quick overview of your boards
        </PageHeaderDescription>
      </PageHeader>
      <SearchBoards />
      <section className="grid gap-4 sm:grid-cols-3">
        {allBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
        <CreateBoardDialog userId={user.id} />
      </section>
    </div>
  )
}

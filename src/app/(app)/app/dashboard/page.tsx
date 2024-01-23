import { type Metadata } from "next"
import { db } from "@/db"
import { boards } from "@/db/schema"
import { like } from "drizzle-orm"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { SearchBoards } from "@/components/search-boards"
import { BoardCard } from "@/components/cards/board-card"
import { CreateBoardDialog } from "@/components/dialogs/create-board-dialog"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your boards",
}

interface DashboardPageProps {
  searchParams?: { [key: string]: string | undefined }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const allBoards = props.searchParams
    ? await db
        .select()
        .from(boards)
        .where(like(boards.name, `%${props.searchParams.query}%`))
    : await db.query.boards.findMany()

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
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
        <CreateBoardDialog />
      </section>
    </div>
  )
}

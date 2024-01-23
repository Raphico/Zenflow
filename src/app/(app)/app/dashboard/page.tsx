import { type Metadata } from "next"
import { db } from "@/db"

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

export default async function DashboardPage() {
  const allBoards = await db.query.boards.findMany()

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

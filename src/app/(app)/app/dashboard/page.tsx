import { type Metadata } from "next"
import { db } from "@/db"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SearchBoards } from "@/components/search-boards"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { CreateBoardForm } from "@/components/forms/create-board-form"
import { BoardCard } from "@/components/cards/board-card"

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-44">
              <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Create a board
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <CreateBoardForm />
          </PopoverContent>
        </Popover>
      </section>
    </div>
  )
}

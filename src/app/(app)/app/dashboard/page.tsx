import { type Metadata } from "next"
import { redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { SearchBoards } from "@/components/search-boards"
import { BoardCard } from "@/components/cards/board-card"
import { CreateBoardDialog } from "@/components/dialogs/create-board-dialog"
import { getCachedUser } from "@/lib/fetchers/auth"
import { getAllBoards } from "@/lib/fetchers/board"
import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { getPlanFeatures } from "@/lib/subscription"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your boards",
}

interface DashboardPageProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  const [allBoards, subscriptionPlan] = await Promise.all([
    getAllBoards({ userId: user.id }),
    getSubscriptionPlan({ userId: user.id }),
  ])

  const searchedBoards = allBoards.filter((board) =>
    new RegExp(props.searchParams.search ?? "", "i").test(board.name)
  )

  const { maxBoardCount } = getPlanFeatures(subscriptionPlan?.name)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-8 py-2">
      <PageHeader>
        <PageHeaderHeading>My Boards</PageHeaderHeading>
        <PageHeaderDescription>
          Here&apos;s a quick overview of your boards
        </PageHeaderDescription>
      </PageHeader>
      {!subscriptionPlan?.isSubscribed && (
        <Alert>
          <Icons.rocket className="size-4" aria-hidden="true" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You are currently on the{" "}
            <span className="font-semibold">{subscriptionPlan?.name}</span>{" "}
            plan. You can create up to{" "}
            <span className="font-semibold">{maxBoardCount}</span> boards
          </AlertDescription>
        </Alert>
      )}
      <SearchBoards />
      <section className="grid gap-4 pb-5 sm:grid-cols-3">
        {searchedBoards.map((board) => (
          <BoardCard key={board.id} userId={user.id} board={board} />
        ))}
        {subscriptionPlan?.isSubscribed ? (
          <CreateBoardDialog userId={user.id} />
        ) : allBoards.length >= maxBoardCount ? (
          <Link
            href="/app/billing"
            className={cn(
              buttonVariants({ variant: "outline", className: "h-44" })
            )}
          >
            <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Create a board
          </Link>
        ) : (
          <CreateBoardDialog userId={user.id} />
        )}
      </section>
    </div>
  )
}

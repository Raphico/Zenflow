import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getCachedUser } from "@/lib/fetchers/auth"
import { getBoards } from "@/lib/fetchers/board"
import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { getPlanFeatures } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { filterBoardSchema } from "@/lib/validations/board"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { BoardCard } from "@/app/(app)/app/(hub)/dashboard/_components/board-card"
import { CreateBoardDialog } from "@/app/(app)/app/(hub)/dashboard/_components/create-board-dialog"

import { SearchBoards } from "./_components/search-boards"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your boards",
}

interface DashboardPageProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const { query } = filterBoardSchema.parse(props.searchParams)

  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  const [boards, subscriptionPlan] = await Promise.all([
    getBoards({ userId: user.id, query }),
    getSubscriptionPlan({ userId: user.id }),
  ])

  const { maxBoardCount } = getPlanFeatures(subscriptionPlan?.name)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
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
        {boards.data.map((board) => (
          <BoardCard key={board.id} userId={user.id} board={board} />
        ))}
        {subscriptionPlan?.isSubscribed ? (
          <CreateBoardDialog userId={user.id} />
        ) : boards.count >= maxBoardCount ? (
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

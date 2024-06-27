import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getBoards } from "@/server/data/board"
import { getSubscriptionPlan } from "@/server/data/stripe"
import { getCachedUser } from "@/server/data/user"

import { redirects } from "@/config/constants"
import { getPlanFeatures } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { filterBoardSchema } from "@/lib/zod/schemas/board"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"
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
    redirect(redirects.toSignIn)
  }

  const [boards, subscriptionPlan] = await Promise.all([
    getBoards({ userId: user.id, query }),
    getSubscriptionPlan({ userId: user.id }),
  ])

  const { maxBoardCount } = getPlanFeatures(subscriptionPlan?.name)

  return (
    <Shell className="max-w-5xl">
      <div className="flex flex-col space-y-4">
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
    </Shell>
  )
}

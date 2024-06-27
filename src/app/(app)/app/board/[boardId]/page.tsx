import * as React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getBoardStatuses } from "@/server/data/status"
import { getSubscriptionPlan } from "@/server/data/stripe"
import { getCachedUser } from "@/server/data/user"
import { Shell } from "lucide-react"

import { redirects } from "@/config/constants"
import { getPlanFeatures } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { taskSearchParamsSchema } from "@/lib/zod/schemas/task"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { AddColumnDialog } from "./_components/add-column-dialog"
import { AddTaskDialog } from "./_components/add-task-dialog"
import { ColumnActions } from "./_components/column-actions"
import { Tasks, TasksSkeleton } from "./_components/tasks"

interface BoardPageParams {
  params: {
    boardId: number
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BoardPage({
  params,
  searchParams,
}: BoardPageParams) {
  const user = await getCachedUser()

  if (!user) redirect(redirects.toSignIn)

  const taskSearchParams = taskSearchParamsSchema.parse(searchParams)

  const { boardId } = params

  const [boardStatuses, subscriptionPlan] = await Promise.all([
    getBoardStatuses(boardId),
    getSubscriptionPlan({ userId: user.id }),
  ])

  const { maxColumnCount, maxTaskCount } = getPlanFeatures(
    subscriptionPlan?.name
  )

  return (
    <Shell className="max-w-7xl">
      <div className="flex gap-8">
        {boardStatuses.map((status) => (
          <section
            key={status.id}
            className="flex w-80 shrink-0 flex-col gap-4"
          >
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {status.title}({status.taskCount})
              </h3>
              <ColumnActions
                boardId={Number(boardId)}
                status={{ id: status.id, title: status.title }}
              />
            </header>

            <React.Suspense fallback={<TasksSkeleton />}>
              <Tasks
                boardId={Number(boardId)}
                statusId={status.id}
                availableStatuses={boardStatuses}
                taskSearchParams={taskSearchParams}
              />
            </React.Suspense>

            <footer className="grid">
              {subscriptionPlan?.isSubscribed ? (
                <AddTaskDialog
                  boardId={Number(boardId)}
                  currentStatus={status.id}
                  availableStatuses={boardStatuses}
                />
              ) : status.taskCount >= maxTaskCount ? (
                <Link
                  href="/app/billing"
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full text-muted-foreground",
                    })
                  )}
                >
                  <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  Add Task
                </Link>
              ) : (
                <AddTaskDialog
                  boardId={Number(boardId)}
                  currentStatus={status.id}
                  availableStatuses={boardStatuses}
                />
              )}
            </footer>
          </section>
        ))}

        {subscriptionPlan?.isSubscribed ? (
          <AddColumnDialog boardId={Number(boardId)} />
        ) : boardStatuses.length >= maxColumnCount ? (
          <Link
            href="/app/billing"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-[18em] shrink-0",
              })
            )}
          >
            <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add Column
          </Link>
        ) : (
          <AddColumnDialog boardId={Number(boardId)} />
        )}
      </div>
    </Shell>
  )
}

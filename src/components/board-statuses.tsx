import { Suspense } from "react"
import Link from "next/link"

import { Skeleton } from "./ui/skeleton"
import { Tasks, TasksSkeleton } from "./tasks"

import { AddColumnDialog } from "./dialogs/add-column-dialog"
import { EditColumnDialog } from "./dialogs/edit-column-dialog"
import { DeleteColumnDialog } from "./dialogs/delete-column-dialog"
import { AddTaskDialog } from "./dialogs/add-task-dialog"

import { buttonVariants } from "./ui/button"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import { getBoardStatuses } from "@/lib/fetchers/status"
import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { getPlanFeatures } from "@/lib/subscription"

interface BoardStatusesProps {
  boardId: number
  userId: string
}

export async function BoardStatuses({ boardId, userId }: BoardStatusesProps) {
  const [boardStatuses, subscriptionPlan] = await Promise.all([
    getBoardStatuses(boardId),
    getSubscriptionPlan({ userId }),
  ])

  const { maxColumnCount, maxTaskCount } = getPlanFeatures(
    subscriptionPlan?.name
  )

  return (
    <div className="flex flex-1">
      <div className="flex gap-8 px-8 pb-16 pt-6">
        {boardStatuses.map((status) => (
          <section
            key={status.id}
            className="flex w-80 shrink-0 flex-col gap-4"
          >
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {status.title}({status.taskCount})
              </h3>
              <div className="flex items-center gap-1">
                <EditColumnDialog
                  boardId={boardId}
                  status={{ id: status.id, title: status.title }}
                />
                <DeleteColumnDialog
                  boardId={boardId}
                  status={{ id: status.id, title: status.title }}
                />
              </div>
            </header>

            <Suspense fallback={<TasksSkeleton />}>
              <Tasks
                boardId={boardId}
                statusId={status.id}
                availableStatuses={boardStatuses}
              />
            </Suspense>

            <footer className="grid">
              {subscriptionPlan?.isActive ? (
                <AddTaskDialog
                  boardId={boardId}
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
                  boardId={boardId}
                  currentStatus={status.id}
                  availableStatuses={boardStatuses}
                />
              )}
            </footer>
          </section>
        ))}

        {subscriptionPlan?.isActive ? (
          <AddColumnDialog boardId={boardId} />
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
          <AddColumnDialog boardId={boardId} />
        )}
      </div>
    </div>
  )
}

export function BoardStatusesSkeleton() {
  return (
    <div className="grid auto-cols-[20rem] grid-flow-col gap-8 px-8 pt-6">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  )
}

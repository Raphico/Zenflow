import { Suspense } from "react"

import { Skeleton } from "./ui/skeleton"
import { AddColumnDialog } from "./dialogs/add-column-dialog"
import { EditColumnDialog } from "./dialogs/edit-column-dialog"
import { DeleteColumnDialog } from "./dialogs/delete-column-dialog"
import { AddTaskDialog } from "./dialogs/add-task-dialog"
import { Tasks, TasksSkeleton } from "./tasks"
import { getBoardStatuses } from "@/lib/fetchers/status"

interface BoardStatusesProps {
  boardId: number
}

export async function BoardStatuses({ boardId }: BoardStatusesProps) {
  const boardStatuses = await getBoardStatuses(boardId)

  return (
    <div className="flex flex-1 overflow-x-auto">
      <div className="flex gap-12 px-8 pb-16 pt-6">
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
              <AddTaskDialog
                boardId={boardId}
                currentStatus={status.id}
                availableStatuses={boardStatuses}
              />
            </footer>
          </section>
        ))}

        <AddColumnDialog boardId={boardId} />
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

import { db } from "@/db"
import { eq } from "drizzle-orm"
import { statuses } from "@/db/schema"

import { Skeleton } from "./ui/skeleton"
import { AddColumnDialog } from "./dialogs/add-column-dialog"
import { EditColumnDialog } from "./dialogs/edit-column-dialog"
import { DeleteColumnDialog } from "./dialogs/delete-column-dialog"
import { AddTaskDialog } from "./dialogs/add-task-dialog"
import { TaskCard } from "./cards/task-card"

interface BoardStatusesProps {
  boardId: number
}

export async function BoardStatuses({ boardId }: BoardStatusesProps) {
  const columns = await db.query.statuses.findMany({
    where: eq(statuses.boardId, boardId),
    with: {
      tasks: true,
    },
    orderBy: statuses.createdAt,
  })

  const availableStatuses = columns.map((column) => ({
    id: column.id,
    title: column.title,
  }))

  return (
    <div className="flex flex-1 overflow-x-auto">
      <div className="flex gap-12 px-8 pb-16 pt-6">
        {columns.map((column) => (
          <section
            key={column.id}
            className="flex w-80 shrink-0 flex-col gap-4"
          >
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {column.title}({column.tasks.length})
              </h3>
              <div className="flex items-center gap-1">
                <EditColumnDialog
                  boardId={boardId}
                  column={{ id: column.id, title: column.title }}
                />
                <DeleteColumnDialog
                  boardId={boardId}
                  column={{ id: column.id, title: column.title }}
                />
              </div>
            </header>

            {column.tasks.length > 0 && (
              <div className="flex flex-col gap-4">
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}

            <footer className="grid">
              <AddTaskDialog
                boardId={boardId}
                currentStatus={column.title}
                availableStatuses={availableStatuses}
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

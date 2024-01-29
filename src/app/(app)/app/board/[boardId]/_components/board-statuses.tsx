import { db } from "@/db"
import { eq } from "drizzle-orm"
import { statuses } from "@/db/schema"

import { Skeleton } from "@/components/ui/skeleton"
import { AddColumnDialog } from "@/components/dialogs/add-column-dialog"
import { EditColumnDialog } from "@/components/dialogs/edit-column-dialog"
import { DeleteColumnDialog } from "@/components/dialogs/delete-column-dialog"

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

  return (
    <div className="grid flex-1 auto-cols-[18em] grid-flow-col gap-8 pt-16">
      {columns.map((column) => (
        <section key={column.id} className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{column.title}</h3>
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
          </div>
        </section>
      ))}

      <AddColumnDialog boardId={boardId} />
    </div>
  )
}

export function BoardStatusesSkeleton() {
  return (
    <div className="grid flex-1 auto-cols-[20em] grid-flow-col gap-8">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  )
}

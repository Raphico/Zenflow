import { Suspense } from "react"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { statuses, tasks } from "@/db/schema"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Subtasks, SubtasksSkeleton } from "./subtasks"
import { TaskDoneCheckbox } from "./forms/task-done-checkbox"
import { Icons } from "./icons"
import { Skeleton } from "./ui/skeleton"
import { AddColumnDialog } from "./dialogs/add-column-dialog"
import { EditColumnDialog } from "./dialogs/edit-column-dialog"
import { DeleteColumnDialog } from "./dialogs/delete-column-dialog"
import { AddTaskDialog } from "./dialogs/add-task-dialog"
import { cn, getDueDate } from "@/lib/utils"
import { TaskActions } from "./task-actions"

interface BoardStatusesProps {
  boardId: number
}

export async function BoardStatuses({ boardId }: BoardStatusesProps) {
  const columns = await db.query.statuses.findMany({
    where: eq(statuses.boardId, boardId),
    with: {
      tasks: {
        orderBy: [tasks.done],
      },
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
                  <Card
                    key={task.id}
                    className={cn("rounded-sm", {
                      "opacity-80": task.done,
                    })}
                  >
                    <CardHeader className="flex-row items-center justify-between p-4">
                      <TaskDoneCheckbox
                        key={task.id}
                        taskId={task.id}
                        boardId={boardId}
                        isDone={task.done}
                      />
                      <Suspense fallback={<SubtasksSkeleton />}>
                        <TaskActions
                          boardId={boardId}
                          availableStatuses={availableStatuses}
                          currentStatus={column.id}
                          task={task}
                        />
                      </Suspense>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardTitle className="text-lg font-bold">
                        {task.title}
                      </CardTitle>
                    </CardContent>
                    <CardFooter className="justify-between p-4 pt-0">
                      <span className="text-[12px] font-semibold">
                        {task.priority}
                      </span>

                      <div className="flex items-center gap-4">
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icons.calendar
                              className="h-3 w-3"
                              aria-label="Due Date"
                            />
                            <span className="text-[12px]">
                              {getDueDate(task.dueDate)}
                            </span>
                          </div>
                        )}

                        {task.tag && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icons.tag className="h-3 w-3" aria-label="Tag" />
                            <span className="text-[12px]">{task.tag}</span>
                          </div>
                        )}

                        <Suspense fallback={<SubtasksSkeleton />}>
                          <Subtasks taskId={task.id} />
                        </Suspense>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <footer className="grid">
              <AddTaskDialog
                boardId={boardId}
                currentStatus={column.id}
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

import { getTasks } from "@/server/data/tasks"
import { type Status } from "@/server/db/schema"

import { cn, getDueDate } from "@/lib/utils"
import type { SubTask } from "@/lib/zod/schemas/task"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

import { TaskActions } from "./task-actions"
import { TaskDoneCheckbox } from "./task-done-checkbox"

interface TasksProps {
  statusId: number
  boardId: number
  availableStatuses: Pick<Status, "id" | "title">[]
  taskSearchParams: {
    sort: string
    showCompletedTasks: string
    priorities?: string | undefined
    dueDate?: string | undefined
  }
}

export async function Tasks({
  statusId,
  boardId,
  availableStatuses,
  taskSearchParams,
}: TasksProps) {
  const { showCompletedTasks, sort, dueDate, priorities } = taskSearchParams

  const columnTasks = await getTasks({ statusId, sort, dueDate, priorities })

  return (
    <div className="flex flex-col gap-4">
      {columnTasks.map((task) => {
        const completedSubtasks = task.subtasks.filter(
          (subtask) => subtask.done
        ).length
        const totalSubtasks = task.subtasks.length

        return (
          <Card
            key={task.id}
            className={cn(
              "rounded-sm",
              task.done &&
                (showCompletedTasks === "true" ? "opacity-80" : "hidden")
            )}
          >
            <CardHeader className="flex-row items-center justify-between p-4">
              <TaskDoneCheckbox
                key={task.id}
                taskId={task.id}
                boardId={boardId}
                isDone={task.done}
              />
              <TaskActions
                boardId={boardId}
                availableStatuses={availableStatuses}
                currentStatus={statusId}
                task={task}
                subtasks={task.subtasks as SubTask[]}
              />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardTitle
                className={cn("text-lg font-bold", {
                  "line-through": task.done,
                })}
              >
                {task.title}
              </CardTitle>
            </CardContent>
            <CardFooter className="justify-between p-4 pt-0">
              <span className="text-[12px] font-semibold">{task.priority}</span>

              <div className="flex items-center gap-4">
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icons.calendar className="h-3 w-3" aria-label="Due Date" />
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

                {completedSubtasks ? (
                  <span className="text-[12px]">
                    {completedSubtasks}/{totalSubtasks} done
                  </span>
                ) : (
                  <span className="text-[12px]">{completedSubtasks} done</span>
                )}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export function TasksSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[153.6px] w-80" />
      <Skeleton className="h-[153.6px] w-80" />
    </div>
  )
}

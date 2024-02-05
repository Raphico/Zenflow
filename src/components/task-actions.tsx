import type { Status, Task } from "@/db/schema"

import { EditTaskDialog } from "./dialogs/edit-task-dialog"
import { Skeleton } from "./ui/skeleton"
import type { SubTask } from "@/lib/validations/task"
import { getSubtasks } from "@/lib/fetchers/subtask"
import { Icons } from "./icons"

interface TaskActionsProps {
  boardId: number
  currentStatus: number
  availableStatuses: Pick<Status, "id" | "title">[]
  task: Task
}

export async function TaskActions({
  availableStatuses,
  boardId,
  currentStatus,
  task,
}: TaskActionsProps) {
  const subtasks = (await getSubtasks(task.id)) as SubTask[]

  return (
    <div className="flex items-center gap-2">
      <EditTaskDialog
        boardId={boardId}
        availableStatuses={availableStatuses}
        currentStatus={currentStatus}
        task={task}
        subtasks={subtasks}
      />
      <Icons.delete
        className="h-4 w-4 text-destructive opacity-50"
        aria-hidden="true"
      />
    </div>
  )
}

export function TaskActionsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-9 w-9" />
      <Skeleton className="h-9 w-9" />
    </div>
  )
}

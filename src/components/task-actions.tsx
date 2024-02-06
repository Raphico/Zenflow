import type { Status, Task } from "@/db/schema"
import type { SubTask } from "@/lib/validations/task"

import { EditTaskDialog } from "./dialogs/edit-task-dialog"
import { DeleteTaskDialog } from "./dialogs/delete-task-dialog"
import { Skeleton } from "./ui/skeleton"
import { getSubtasks } from "@/lib/fetchers/subtask"

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
      <DeleteTaskDialog
        boardId={boardId}
        task={{ id: task.id, title: task.title }}
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

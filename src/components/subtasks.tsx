import { getSubtasks } from "@/lib/fetchers/subtask"
import { Skeleton } from "./ui/skeleton"

interface SubtasksProps {
  taskId: number
}

export async function Subtasks({ taskId }: SubtasksProps) {
  const subtasks = await getSubtasks(taskId)

  const completedSubtasks = subtasks.filter((subtask) => subtask.done).length
  const totalSubtasks = subtasks.length

  return (
    <>
      {completedSubtasks ? (
        <span className="text-[12px]">
          {completedSubtasks}/{totalSubtasks} done
        </span>
      ) : (
        <span className="text-[12px]">{completedSubtasks} done</span>
      )}
    </>
  )
}

export function SubtasksSkeleton() {
  return <Skeleton className="h-[18px] w-[39.5px]" />
}

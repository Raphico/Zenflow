"use client"

import * as React from "react"

import { Checkbox } from "../ui/checkbox"
import { updateTaskDone } from "@/lib/actions/task"
import { catchError } from "@/lib/utils"
import { toast } from "sonner"

interface TaskDoneCheckboxProps {
  taskId: number
  boardId: number
  isDone: boolean
}

export function TaskDoneCheckbox({
  taskId,
  boardId,
  isDone,
}: TaskDoneCheckboxProps) {
  const [done, setDone] = React.useState(isDone)
  const [isPending, startTransition] = React.useTransition()

  const handleUpdateTaskDone = () => {
    setDone((prev) => !prev)

    startTransition(async () => {
      try {
        await updateTaskDone({
          taskId,
          boardId,
          isDone,
        })

        toast.success("Task updated!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Checkbox
      disabled={isPending}
      checked={done}
      className="h-5 w-5 rounded-full"
      onClick={handleUpdateTaskDone}
    />
  )
}

"use client"

import * as React from "react"
import { updateTaskDone } from "@/server/actions/task"

import { showErrorToast } from "@/utils/hanld-error"
import { Checkbox } from "@/components/ui/checkbox"

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
      const { error } = await updateTaskDone({
        taskId,
        boardId,
        isDone,
      })

      if (error) {
        showErrorToast(error)
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

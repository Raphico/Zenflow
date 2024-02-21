import * as React from "react"
import type { Status, Task } from "@/db/schema"

import { type SubTask, taskSchema } from "@/lib/validations/task"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent } from "../ui/dialog"
import { TaskForm } from "../forms/task-form"
import { updateTask } from "@/lib/actions/task"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"

type Inputs = z.infer<typeof taskSchema>

interface AddTaskDialog {
  boardId: number
  task: Task
  subtasks: SubTask[]
  currentStatus: number
  availableStatuses: Pick<Status, "id" | "title">[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditTaskDialog({
  boardId,
  task,
  subtasks,
  currentStatus,
  availableStatuses,
  open,
  setOpen,
}: AddTaskDialog) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate || undefined,
      statusId: currentStatus,
      priority: task.priority,
      tag: task.tag || "",
      subtasks,
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await updateTask({
          boardId,
          id: task.id,
          statusId: values.statusId,
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          priority: values.priority,
          tag: values.tag,
          subtasks: values.subtasks,
        })

        setOpen(false)
        toast.success("Task updated!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <TaskForm
          form={form}
          onSubmit={onSubmit}
          type="Update"
          isPending={isPending}
          availableStatuses={availableStatuses}
        />
      </DialogContent>
    </Dialog>
  )
}

import * as React from "react"
import { updateTask } from "@/server/actions/task"
import type { Status, Task } from "@/server/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  taskSchema,
  type SubTask,
  type TaskSchema,
} from "@/lib/zod/schemas/task"
import { showErrorToast } from "@/utils/hanld-error"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { TaskForm } from "./task-form"

interface EditTaskDialogProps {
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
}: EditTaskDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<TaskSchema>({
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

  const onSubmit = (values: TaskSchema) => {
    startTransition(async () => {
      const { error } = await updateTask({
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

      if (error) {
        showErrorToast(error)
        return
      }

      setOpen(false)
      toast.success("Task updated!")
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

"use client"

import * as React from "react"
import type { Status, Task } from "@/db/schema"

import { taskSchema } from "@/lib/validations/task"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { TaskForm } from "../forms/task-form"
import { updateTask } from "@/lib/actions/task"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"

type Inputs = z.infer<typeof taskSchema>

interface AddTaskDialog {
  task: Task
  currentStatus: string
  availableStatuses: Pick<Status, "id" | "title">[]
}

export function EditTaskDialog({
  task,
  currentStatus,
  availableStatuses,
}: AddTaskDialog) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      status: currentStatus,
      priority: task.priority || "P4",
      tag: task.tag || "",
      subtasks: [],
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        const statusId = availableStatuses.find(
          (status) => status.title === values.status
        )?.id

        if (!statusId) throw new Error("Status id not found")

        await updateTask({
          id: task.id,
          statusId,
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          priority: values.priority,
          tag: values.tag,
          subtasks: values.subtasks,
        })

        setOpen(false)
        form.reset()
        toast.success("Task updated!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <Icons.plus className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Edit Task</span>
        </Button>
      </DialogTrigger>
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

"use client"

import * as React from "react"
import { addTask } from "@/server/actions/task"
import type { Status } from "@/server/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { taskSchema, type TaskSchema } from "@/lib/zod/schemas/task"
import { showErrorToast } from "@/utils/hanld-error"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

import { TaskForm } from "./task-form"

interface AddTaskDialogProps {
  boardId: number
  currentStatus: number
  availableStatuses: Pick<Status, "id" | "title">[]
}

export function AddTaskDialog({
  boardId,
  currentStatus,
  availableStatuses,
}: AddTaskDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "Untitled Task",
      description: "",
      statusId: currentStatus,
      priority: "P4",
      tag: "",
      subtasks: [],
    },
  })

  const onSubmit = (values: TaskSchema) => {
    startTransition(async () => {
      const { error } = await addTask({
        boardId,
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
      toast.success("Task added!")
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full text-muted-foreground">
          <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <TaskForm
          form={form}
          onSubmit={onSubmit}
          type="Create"
          isPending={isPending}
          availableStatuses={availableStatuses}
        />
      </DialogContent>
    </Dialog>
  )
}

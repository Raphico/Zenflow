"use client"

import * as React from "react"
import type { Status } from "@/db/schema"

import { taskSchema } from "@/lib/validations/task"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { TaskForm } from "../forms/task-form"
import { addTask } from "@/lib/actions/task"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"

type Inputs = z.infer<typeof taskSchema>

interface AddTaskDialog {
  currentStatus: string
  availableStatuses: Pick<Status, "id" | "title">[]
}

export function AddTaskDialog({
  currentStatus,
  availableStatuses,
}: AddTaskDialog) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "Untitled Task",
      description: "",
      status: currentStatus,
      priority: "P4",
      tag: "",
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

        await addTask({
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
        toast.success("Task added!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
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

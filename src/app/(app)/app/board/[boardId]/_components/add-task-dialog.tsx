"use client"

import * as React from "react"
import { addTask } from "@/server/actions/task"
import type { Status } from "@/server/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { taskSchema } from "@/lib/zod/schemas/task"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

import { TaskForm } from "./task-form"

type Inputs = z.infer<typeof taskSchema>

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

  const form = useForm<Inputs>({
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

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await addTask({
          boardId,
          statusId: values.statusId,
          title: values.title,
          description: values.description,
          dueDate: values.dueDate,
          priority: values.priority,
          tag: values.tag,
          subtasks: values.subtasks,
        })

        setOpen(false)
        toast.success("Task added!")
        form.reset()
      } catch (error) {
        catchError(error)
      }
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

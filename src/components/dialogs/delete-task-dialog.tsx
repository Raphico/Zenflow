"use client"

import * as React from "react"
import type { Task } from "@/db/schema"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "../icons"
import { catchError } from "@/lib/utils"
import { deleteTask } from "@/lib/actions/task"
import { toast } from "sonner"

interface DeleteTaskDialogProps {
  boardId: number
  task: Pick<Task, "id" | "title">
}

export function DeleteTaskDialog({ task, boardId }: DeleteTaskDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleDeleteTask = () => {
    startTransition(async () => {
      try {
        await deleteTask({ boardId, taskId: task.id })

        toast.success("Task Deleted!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-destructive" size="icon">
          <Icons.delete className="h-4 w-4 opacity-70" aria-hidden="true" />
          <span className="sr-only">Delete Task</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {task.title} and all its subtasks. This
            can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteTask}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

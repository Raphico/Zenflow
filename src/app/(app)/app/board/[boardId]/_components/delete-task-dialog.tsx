import * as React from "react"
import type { Task } from "@/db/schema"
import { toast } from "sonner"

import { deleteTask } from "@/lib/actions/task"
import { catchError } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface DeleteTaskDialogProps {
  boardId: number
  task: Pick<Task, "id" | "title">
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteTaskDialog({
  task,
  boardId,
  open,
  setOpen,
}: DeleteTaskDialogProps) {
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
    <AlertDialog open={open} onOpenChange={setOpen}>
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

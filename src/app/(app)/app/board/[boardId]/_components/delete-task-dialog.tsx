import * as React from "react"
import { deleteTask } from "@/server/actions/task"
import type { Task } from "@/server/db/schema"
import { toast } from "sonner"

import { showErrorToast } from "@/utils/hanld-error"
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
      const { error } = await deleteTask({ boardId, taskId: task.id })

      if (error) {
        showErrorToast(error)
        return
      }

      toast.success("Task Deleted!")
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

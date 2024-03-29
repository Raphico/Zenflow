import * as React from "react"
import type { Status } from "@/db/schema"
import { toast } from "sonner"

import { deleteColumn } from "@/lib/actions/column"
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

interface DeleteColumnDialogProps {
  boardId: number
  status: Pick<Status, "id" | "title">
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteColumnDialog({
  status,
  boardId,
  open,
  setOpen,
}: DeleteColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleDeleteColumn = () => {
    startTransition(async () => {
      try {
        await deleteColumn({ boardId, columnId: status.id })

        toast.success("Column Deleted!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {status.title} and all its tasks. This
            can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteColumn}
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

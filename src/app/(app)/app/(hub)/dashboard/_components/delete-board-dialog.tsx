import * as React from "react"
import { deleteBoard } from "@/server/actions/board"
import type { Board } from "@/server/db/schema"
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

interface DeleteBoardDialogProps {
  board: Pick<Board, "id" | "name">
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteBoardDialog({
  board,
  open,
  setOpen,
}: DeleteBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleDeleteBoard = () => {
    startTransition(async () => {
      const { error } = await deleteBoard(board.id)

      if (error) {
        showErrorToast(error)
        return
      }

      toast.success("Board Deleted!")
      setOpen(false)
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {board.name} and all its tasks. This
            can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleDeleteBoard}
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

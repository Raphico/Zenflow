import * as React from "react"
import type { Board } from "@/db/schema"

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
import { catchError } from "@/lib/utils"
import { deleteBoard } from "@/lib/actions/board"
import { toast } from "sonner"

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
      try {
        await deleteBoard(board.id)

        toast.success("Board Deleted!")
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

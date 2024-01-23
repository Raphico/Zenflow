"use client"

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "../icons"
import { catchError } from "@/lib/utils"
import { deleteBoard } from "@/lib/actions/board"
import { toast } from "sonner"

interface DeleteBoardDialogProps {
  board: Pick<Board, "id" | "name">
}

export function DeleteBoardDialog({ board }: DeleteBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleDeleteUser = () => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.delete
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Delete Board</span>
        </Button>
      </AlertDialogTrigger>
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
            onClick={handleDeleteUser}
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

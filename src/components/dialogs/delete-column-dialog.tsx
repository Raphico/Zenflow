"use client"

import * as React from "react"
import type { Status } from "@/db/schema"

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
import { deleteColumn } from "@/lib/actions/column"
import { toast } from "sonner"

interface DeleteColumnDialogProps {
  column: Pick<Status, "id" | "title">
}

export function DeleteColumnDialog({ column }: DeleteColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const handleDeleteColumn = () => {
    startTransition(async () => {
      try {
        await deleteColumn(column.id)

        toast.success("Column Deleted!")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-destructive" size="icon">
          <Icons.delete className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Delete Column</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {column.title} and all its tasks. This
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

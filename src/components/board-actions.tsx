"use client"

import * as React from "react"
import type { Board } from "@/db/schema"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { EditBoardDialog } from "./dialogs/edit-board-dialog"
import { DeleteBoardDialog } from "./dialogs/delete-board-dialog"
import { Icons } from "@/components/icons"

interface BoardActionsProps {
  userId: string
  board: Pick<Board, "id" | "name">
}

export function BoardActions({ userId, board }: BoardActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false)
  const [showEditDialog, setShowEditDialog] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.more
              className="h-6 w-6 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">Open Board Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setShowEditDialog(true)}
            arial-label="Edit Board"
          >
            <Icons.edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
            arial-label="Delete Board"
          >
            <Icons.delete className="mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBoardDialog
        userId={userId}
        board={{ id: board.id, name: board.name }}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
      <DeleteBoardDialog
        board={{ id: board.id, name: board.name }}
        open={showDeleteAlert}
        setOpen={setShowDeleteAlert}
      />
    </>
  )
}

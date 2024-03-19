"use client"

import * as React from "react"
import type { Status } from "@/db/schema"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { EditColumnDialog } from "./edit-column-dialog"
import { DeleteColumnDialog } from "./delete-column-dialog"

interface ColumnActionsProps {
  boardId: number
  status: Pick<Status, "id" | "title">
}

export function ColumnActions({ boardId, status }: ColumnActionsProps) {
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
            <span className="sr-only">Open Column Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setShowEditDialog(true)}
            arial-label="Edit column"
          >
            <Icons.edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
            arial-label="Delete column"
          >
            <Icons.delete className="mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditColumnDialog
        boardId={boardId}
        status={{ id: status.id, title: status.title }}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
      <DeleteColumnDialog
        boardId={boardId}
        status={{ id: status.id, title: status.title }}
        open={showDeleteAlert}
        setOpen={setShowDeleteAlert}
      />
    </>
  )
}

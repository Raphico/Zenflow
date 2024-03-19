"use client"

import * as React from "react"
import type { Status, Task } from "@/db/schema"

import type { SubTask } from "@/lib/validations/task"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import { DeleteTaskDialog } from "./delete-task-dialog"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskActionsProps {
  boardId: number
  currentStatus: number
  availableStatuses: Pick<Status, "id" | "title">[]
  task: Task
  subtasks: SubTask[]
}

export function TaskActions({
  boardId,
  currentStatus,
  availableStatuses,
  task,
  subtasks,
}: TaskActionsProps) {
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
            <span className="sr-only">Open Tasks Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setShowEditDialog(true)}
            arial-label="Edit Task"
          >
            <Icons.edit className="mr-2 h-4 w-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
            arial-label="Delete Task"
          >
            <Icons.delete className="mr-2 h-4 w-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        boardId={boardId}
        availableStatuses={availableStatuses}
        currentStatus={currentStatus}
        task={task}
        subtasks={subtasks}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
      <DeleteTaskDialog
        boardId={boardId}
        task={{ id: task.id, title: task.title }}
        open={showDeleteAlert}
        setOpen={setShowDeleteAlert}
      />
    </>
  )
}

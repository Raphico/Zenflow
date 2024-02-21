import * as React from "react"

import { boardSchema } from "@/lib/validations/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import type { Board } from "@/db/schema"

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { updateBoard } from "@/lib/actions/board"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"
import { BoardForm } from "../forms/board-form"

interface EditBoardDialogProps {
  userId: string
  board: Pick<Board, "id" | "name">
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = z.infer<typeof boardSchema>

export function EditBoardDialog({
  userId,
  board,
  open,
  setOpen,
}: EditBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: board.name,
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await updateBoard({
          userId,
          id: board.id,
          name: values.name,
        })
        toast.success(`${values.name} updated!`)
        setOpen(false)
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
          <DialogDescription>
            Update the name of your board to better reflect its purpose.
          </DialogDescription>
        </DialogHeader>
        <BoardForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          type="Update"
        />
      </DialogContent>
    </Dialog>
  )
}

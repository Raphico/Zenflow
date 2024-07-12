"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createBoard } from "@/server/actions/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { boardSchema, type BoardSchema } from "@/lib/zod/schemas/board"
import { showErrorToast } from "@/utils/hanld-error"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import { BoardForm } from "@/app/(app)/app/(hub)/dashboard/_components/board-form"

interface CreateBoardDialogProps {
  userId: string
}

export function CreateBoardDialog({ userId }: CreateBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const form = useForm<BoardSchema>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: BoardSchema) => {
    startTransition(async () => {
      const { boardId, error } = await createBoard({
        userId,
        name: values.name,
      })

      if (error) {
        showErrorToast(error)
        return
      }

      router.push(`/app/board/${boardId}`)

      setOpen(false)
      toast.success(`${values.name} Created!`)
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-44">
          <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Create a board
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Create a board</DialogTitle>
          <DialogDescription>
            Set up a new board to organize your tasks efficiently
          </DialogDescription>
        </DialogHeader>
        <BoardForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          type="Create"
        />
      </DialogContent>
    </Dialog>
  )
}

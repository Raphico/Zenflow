"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { boardSchema } from "@/lib/validations/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { BoardForm } from "../forms/board-form"
import { toast } from "sonner"
import { createBoard } from "@/lib/actions/board"
import { catchError } from "@/lib/utils"

type Inputs = z.infer<typeof boardSchema>

interface CreateBoardDialogProps {
  userId: string
}

export function CreateBoardDialog({ userId }: CreateBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        const newBoard = await createBoard({
          userId,
          name: values.name,
        })

        router.push(`/app/board/${newBoard.boardId}`)

        toast.success(`${values.name} Created!`)
        setOpen(false)
      } catch (error) {
        catchError(error)
      }
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

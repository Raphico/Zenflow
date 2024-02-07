"use client"

import * as React from "react"

import { columnSchema } from "@/lib/validations/column"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import type { Status } from "@/db/schema"

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog"
import { ColumnForm } from "../forms/column-form"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"
import { updateColumn } from "@/lib/actions/column"

interface EditColumnDialogProps {
  boardId: number
  status: Pick<Status, "id" | "title">
}

type Inputs = z.infer<typeof columnSchema>

export function EditColumnDialog({ boardId, status }: EditColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      name: status.title,
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await updateColumn({
          boardId,
          id: status.id,
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
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.edit className="h-4 w-4 opacity-70" aria-hidden="true" />
          <span className="sr-only">Edit Column</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Edit column</DialogTitle>
        </DialogHeader>
        <ColumnForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          type="Update"
        />
      </DialogContent>
    </Dialog>
  )
}

"use client"

import * as React from "react"
import { createColumn } from "@/server/actions/column"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { columnSchema, type ColumnSchema } from "@/lib/zod/schemas/column"
import { showErrorToast } from "@/utils/hanld-error"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

import { ColumnForm } from "./column-form"

interface AddColumnDialogProps {
  boardId: number
}

export function AddColumnDialog({ boardId }: AddColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<ColumnSchema>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: ColumnSchema) => {
    startTransition(async () => {
      const { error } = await createColumn({
        boardId,
        name: values.name,
      })

      if (error) {
        showErrorToast(error)
        return
      }

      setOpen(false)
      toast.success(`${values.name} Created!`)
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-[18em] shrink-0">
          <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Add column
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
        </DialogHeader>
        <ColumnForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          type="Create"
        />
      </DialogContent>
    </Dialog>
  )
}

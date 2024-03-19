"use client"

import * as React from "react"

import { columnSchema } from "@/lib/validations/column"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { ColumnForm } from "./column-form"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"
import { createColumn } from "@/lib/actions/column"

type Inputs = z.infer<typeof columnSchema>

interface AddColumnDialogProps {
  boardId: number
}

export function AddColumnDialog({ boardId }: AddColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await createColumn({
          boardId,
          name: values.name,
        })

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

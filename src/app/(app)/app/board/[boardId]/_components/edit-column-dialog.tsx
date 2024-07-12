import * as React from "react"
import { updateColumn } from "@/server/actions/column"
import type { Status } from "@/server/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { columnSchema, type ColumnSchema } from "@/lib/zod/schemas/column"
import { showErrorToast } from "@/utils/hanld-error"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { ColumnForm } from "./column-form"

interface EditColumnDialogProps {
  boardId: number
  status: Pick<Status, "id" | "title">
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditColumnDialog({
  boardId,
  status,
  open,
  setOpen,
}: EditColumnDialogProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<ColumnSchema>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      name: status.title,
    },
  })

  const onSubmit = (values: ColumnSchema) => {
    startTransition(async () => {
      const { error } = await updateColumn({
        boardId,
        id: status.id,
        name: values.name,
      })

      if (error) {
        showErrorToast(error)
      }

      setOpen(false)
      toast.success(`${values.name} updated!`)
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

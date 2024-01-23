"use client"

import * as React from "react"

import { boardSchema } from "@/lib/validations/board"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import type { Board } from "@/db/schema"

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { updateBoard } from "@/lib/actions/board"
import { toast } from "sonner"
import { catchError } from "@/lib/utils"

interface EditBoardDialogProps {
  board: Pick<Board, "id" | "name">
}

type Inputs = z.infer<typeof boardSchema>

export function EditBoardDialog({ board }: EditBoardDialogProps) {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

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
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.edit
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Edit Board</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
          <DialogDescription>
            Update the name of your board to better reflect its purpose.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e.Marketing Todo"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Update Board
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

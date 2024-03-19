import type { z } from "zod"
import type { boardSchema } from "@/lib/validations/board"
import type { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type Inputs = z.infer<typeof boardSchema>

interface BoardFormProps {
  type: "Create" | "Update"
  isPending: boolean
  onSubmit: (data: Inputs) => void
  form: UseFormReturn<
    {
      name: string
    },
    unknown,
    undefined
  >
}

export function BoardForm({ isPending, onSubmit, form, type }: BoardFormProps) {
  return (
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
          {type} Board
        </Button>
      </form>
    </Form>
  )
}

"use client"

import * as React from "react"
import type { User } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { updateProfile } from "@/lib/actions/account"
import { catchClerkError } from "@/lib/utils"
import { profileSchema } from "@/lib/validations/account"
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

interface ProfileFormProps {
  user: Pick<User, "username">
}

type Inputs = z.infer<typeof profileSchema>

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await updateProfile({
          username: values.username,
        })

        form.reset({ username: values.username })

        toast.success("Profile updated!")
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred name</FormLabel>
              <FormControl>
                <Input className="max-w-sm" placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <div className="fixed bottom-0 right-0 flex w-full items-center justify-end gap-4 border-t bg-background p-4">
            <Button
              onClick={() => form.reset()}
              aria-label="Cancel changes"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              aria-label="Apply changes"
              variant="destructive"
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Update
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

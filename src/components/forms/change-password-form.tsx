"use client"

import * as React from "react"

import { changePasswordSchema } from "@/lib/validations/account"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog"
import { PasswordInput } from "../password-input"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { catchClerkError } from "@/lib/utils"
import { updateUserPassword } from "@/lib/actions/account"
import { toast } from "sonner"

type Inputs = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    startTransition(async () => {
      try {
        await updateUserPassword({
          newPassword: values.newPassword,
        })

        setOpen(false)

        toast.success("Password successfully changed!")
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Change Password
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Change the password associated with this account
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
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
                Change password
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

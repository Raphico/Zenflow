"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { redirects } from "@/config/constants"
import {
  resetPasswordRequestSchema,
  type ResetPasswordRequestSchema,
} from "@/lib/zod/schemas/auth"
import { showErrorToast } from "@/utils/hanld-error"
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

export function ResetPasswordForm() {
  const [isPending, startTransition] = React.useTransition()
  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()

  const form = useForm<ResetPasswordRequestSchema>({
    resolver: zodResolver(resetPasswordRequestSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: ResetPasswordRequestSchema) => {
    if (!isLoaded) return null

    startTransition(async () => {
      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: values.email,
        })

        router.push(redirects.resetPasswordStep2)

        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        })
      } catch (err) {
        showErrorToast(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="youremail@gmail.com"
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
          Send verification code
        </Button>
      </form>
    </Form>
  )
}

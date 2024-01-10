"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"

import { resetRequestSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type z } from "zod"

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
import { catchClerkError } from "@/lib/utils"
import { toast } from "sonner"

type Inputs = z.infer<typeof resetRequestSchema>

export function ResetPasswordForm() {
  const [isPending, startTransition] = React.useTransition()
  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(resetRequestSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!isLoaded) return null

    startTransition(async () => {
      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: values.email,
        })

        router.push("/sign-in/reset-password/step-2")

        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        })
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

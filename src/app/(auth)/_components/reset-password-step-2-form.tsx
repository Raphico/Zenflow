"use client"

import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordVerificationSchema } from "@/lib/validations/auth"
import { type z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { catchClerkError } from "@/lib/utils"

type Inputs = z.infer<typeof passwordVerificationSchema>

export function ResetPasswordStep2Form() {
  const [isPending, startTransition] = React.useTransition()
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(passwordVerificationSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!isLoaded) return null

    startTransition(async () => {
      try {
        const firstFactor = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: values.code,
          password: values.password,
        })
        if (firstFactor.status === "needs_first_factor") {
          // Implement second factor authentication
        } else if (firstFactor.status === "complete") {
          await setActive({
            session: firstFactor.createdSessionId,
          })

          router.push("/app/dashboard")

          toast.success("Your password has been reset", {
            description: "You can now log in with your new password.",
          })
        } else {
          console.error(firstFactor)
        }
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
          Reset password
        </Button>
      </form>
    </Form>
  )
}

"use client"

import * as React from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { authSchema } from "@/lib/validations/auth"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "sonner"
import { PasswordInput } from "@/components/password-input"
import { catchClerkError } from "@/lib/utils"

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  const [isPending, startTransition] = React.useTransition()
  const { signUp, isLoaded } = useSignUp()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!isLoaded) return
    startTransition(async () => {
      try {
        // Start the sign-up process using the email and password provided
        await signUp.create({
          emailAddress: values.email,
          password: values.password,
        })

        // Send the user an email with the verification code
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        })

        router.push("/sign-up/verify-email")

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
                  placeholder="example@gmail.com"
                  {...field}
                />
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
          Sign up
        </Button>
      </form>
    </Form>
  )
}

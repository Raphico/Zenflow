"use client"

import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
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
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PasswordInput } from "../password-input"
import { Icons } from "../icons"
import { catchClerkError } from "@/lib/utils"

type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
  const [isPending, startTransition] = React.useTransition()
  const { isLoaded, signIn, setActive } = useSignIn()
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
        // Start the sign-in process using the email and password provided
        const completeSignIn = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        if (completeSignIn.status !== "complete") {
          // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
          // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
          console.log(JSON.stringify(completeSignIn, null, 2))
        }

        if (completeSignIn.status === "complete") {
          // If complete, user exists and provided password match -- set session active
          await setActive({ session: completeSignIn.createdSessionId })
          // Redirect the user to a post sign-in route
          router.push("/dashboard")
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
          Sign in
        </Button>
      </form>
    </Form>
  )
}

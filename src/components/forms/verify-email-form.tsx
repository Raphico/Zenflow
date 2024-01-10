"use client"

import * as React from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { verifyEmailSchema } from "@/lib/validations/auth"
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

type Inputs = z.infer<typeof verifyEmailSchema>

export function VerifyEmailForm() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = (values: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        // Submit the code that the user provides to attempt verification
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.code,
        })

        if (completeSignUp.status !== "complete") {
          // The status can also be `abandoned` or `missing_requirements`
          // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
          console.log(JSON.stringify(completeSignUp, null, 2))
        }

        // Check the status to see if it is complete
        // If complete, the user has been created -- set the session active
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId })
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sign up code</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} aria-label="Create account">
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create account
        </Button>
      </form>
    </Form>
  )
}

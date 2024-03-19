"use client"

import * as React from "react"
import type { manageSubscriptionSchema } from "@/lib/validations/stripe"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { catchError } from "@/lib/utils"
import { manageSubscription } from "@/lib/actions/stripe"

type ManageSubscriptionFormProps = z.infer<typeof manageSubscriptionSchema>

export function ManageSubscriptionForm({
  isCurrentPlan,
  isSubscribed,
  stripePriceId,
  stripeCustomerId,
  stripeSubscriptionId,
}: ManageSubscriptionFormProps) {
  const [isPending, startTransition] = React.useTransition()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(async () => {
      try {
        const session = await manageSubscription({
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripeSubscriptionId,
          stripePriceId,
        })

        // Redirect to the Stripe session.
        // This could be a checkout page for initial upgrade.
        // Or portal to manage existing subscription.
        if (session) {
          window.location.href = session.url ?? "/app/billing"
        }
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <Button className="w-full" disabled={isPending}>
        {isPending && (
          <Icons.spinner
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {isSubscribed ? "Manage" : "Subscribe"}
      </Button>
    </form>
  )
}

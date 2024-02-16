"use server"

import { currentUser } from "@clerk/nextjs"
import { stripe } from "../stripe"
import { revalidateTag } from "next/cache"

import type { z } from "zod"
import { manageSubscriptionSchema } from "../validations/stripe"
import { absoluteUrl, getUserEmail } from "../utils"

export async function manageSubscription(
  rawInputs: z.infer<typeof manageSubscriptionSchema>
) {
  const inputs = manageSubscriptionSchema.parse(rawInputs)

  const billingUrl = absoluteUrl("/app/billing")

  const user = await currentUser()

  if (!user) {
    throw new Error("User not found!")
  }

  const email = getUserEmail(user)

  // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
  if (inputs.isSubscribed && inputs.stripeCustomerId && inputs.isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: inputs.stripeCustomerId,
      return_url: billingUrl,
    })

    return {
      url: stripeSession.url,
    }
  }

  // If the user is not subscribed to a plan, we create a Stripe Checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: inputs.stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
  })

  revalidateTag("user-subscription")

  return {
    url: stripeSession.url,
  }
}
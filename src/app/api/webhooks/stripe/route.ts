import type { NextRequest } from "next/server"
import { headers } from "next/headers"
import { clerkClient } from "@clerk/nextjs"
import type Stripe from "stripe"
import { env } from "@/env.mjs"

import { stripe } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") ?? ""

  let event: Stripe.Event

  // checking the authenticity of the event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    )
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // If there is a user id in the metadata, then this is a new subscription
    if (session?.metadata?.userId) {
      // Update the user stripe into in our database.
      // Since this is the initial subscription, we need to update
      // the subscription id and customer id.

      await clerkClient.users.updateUserMetadata(session?.metadata?.userId, {
        privateMetadata: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    // If there is a user id in the metadata, then this is a new subscription
    if (session?.metadata?.userId) {
      // Retrieve the subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      // Update the price id and set the new period end
      await clerkClient.users.updateUserMetadata(session?.metadata?.userId, {
        privateMetadata: {
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
    }
  }

  return new Response(null, { status: 200 })
}

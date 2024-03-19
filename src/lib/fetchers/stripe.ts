"use server"

import { unstable_cache as cache } from "next/cache"
import type { UserSubscriptionPlan } from "@/types"
import { clerkClient } from "@clerk/nextjs"
import { addDays } from "date-fns"

import { subscriptionPlans } from "@/config/subscription"

import { stripe } from "../stripe"
import { userPrivateMetadataSchema } from "../validations/account"

export async function getSubscriptionPlan(inputs: {
  userId: string
}): Promise<UserSubscriptionPlan | null> {
  try {
    return await cache(
      async () => {
        const user = await clerkClient.users.getUser(inputs.userId)

        if (!user) {
          throw new Error("User not found!")
        }

        const userPrivateMetadata = userPrivateMetadataSchema.parse(
          user.privateMetadata
        )

        const isSubscribed =
          !!userPrivateMetadata.stripePriceId &&
          !!userPrivateMetadata.stripeCurrentPeriodEnd &&
          addDays(
            new Date(userPrivateMetadata.stripeCurrentPeriodEnd),
            1
          ).getTime() > Date.now()

        // if the user is subscribed get the subscription plan
        const plan = isSubscribed
          ? subscriptionPlans.find(
              (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId
            )
          : subscriptionPlans[0]

        if (!plan) {
          throw new Error("Plan not found!")
        }

        // Check if user has canceled subscription
        let isCanceled = false
        if (isSubscribed && !!userPrivateMetadata.stripeSubscriptionId) {
          const stripePlan = await stripe.subscriptions.retrieve(
            userPrivateMetadata.stripeSubscriptionId
          )
          isCanceled = stripePlan.cancel_at_period_end
        }

        return {
          ...plan,
          stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
          stripeCurrentPeriodEnd: userPrivateMetadata.stripeCurrentPeriodEnd,
          stripeCustomerId: userPrivateMetadata.stripeCustomerId,
          isSubscribed,
          isCanceled,
          isActive: isSubscribed && !isCanceled,
        }
      },
      [`${inputs.userId}-subscription`],
      {
        revalidate: 900,
      }
    )()
  } catch (error) {
    console.error(error)
    return null
  }
}

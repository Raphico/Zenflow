import { env } from "@/env.mjs"
import type { SubscriptionPlan } from "@/types"

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    features: [
      "Up to 3 boards",
      "3 columns per board",
      "Up to 5 tasks per column",
    ],
    price: 0,
    stripePriceId: "",
  },
  {
    name: "Pro",
    features: [
      "Unlimited Board Creations",
      "Unlimited Columns per Board",
      "Unlimited Tasks Creation",
      "Premium Support",
    ],
    price: 9.99,
    stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID,
  },
]

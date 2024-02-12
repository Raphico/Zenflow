import type { SubscriptionConfig } from "@/types"

export const subscriptionConfig: SubscriptionConfig[] = [
  {
    name: "Free",
    features: [
      "Up to 3 boards",
      "3 Columns per board",
      "Up to 5 tasks per column",
    ],
    price: 0,
  },
  {
    name: "Pro",
    features: [
      "Unlimited Board Creations",
      "Unlimited Columns per Board",
      "Unlimited Tasks Creation",
      "Access to Analytics",
      "Premium Support",
    ],
    price: 9.99,
  },
]

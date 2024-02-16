import type { SubscriptionPlan } from "@/types"
import { subscriptionPlans } from "@/config/subscription"

export function getPlanFeatures(planName?: SubscriptionPlan["name"]) {
  const plan = subscriptionPlans.find((plan) => plan.name === planName)

  const maxBoardCount = parseInt(
    plan?.features
      .find((feature) => feature.match(/boards/i))
      ?.match(/\d+/)?.[0] ?? "0"
  )

  const maxColumnCount = parseInt(
    plan?.features
      .find((feature) => feature.match(/columns/i))
      ?.match(/\d+/)?.[0] ?? "0"
  )

  const maxTaskCount = parseInt(
    plan?.features
      .find((feature) => feature.match(/tasks/i))
      ?.match(/\d+/)?.[0] ?? "0"
  )

  return {
    maxBoardCount,
    maxColumnCount,
    maxTaskCount,
  }
}

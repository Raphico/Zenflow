import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSubscriptionPlan } from "@/server/data/stripe"
import { getCachedUser } from "@/server/data/user"

import { redirects } from "@/config/constants"
import { subscriptionPlans } from "@/config/subscription"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utils/format-date"
import { formatPrice } from "@/utils/format-price"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { ManageSubscriptionForm } from "./_components/manage-subscription-form"

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription.",
}

export default async function BillingPage() {
  const user = await getCachedUser()

  if (!user) {
    redirect(redirects.toSignIn)
  }

  const subscriptionPlan = await getSubscriptionPlan({ userId: user.id })

  return (
    <Shell className="max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>Billing</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your billing and subscription
        </PageHeaderDescription>
      </PageHeader>

      <Separator className="mt-2.5" />

      <Alert className="!pl-14">
        <Icons.warning />
        <AlertTitle>This is a demo app.</AlertTitle>
        <AlertDescription>
          Zenflow is a demo app using a Stripe test environment. You can find a
          list of test card numbers on the{" "}
          <Link
            href="https://stripe.com/docs/testing#cards"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Stripe docs
          </Link>
          .
        </AlertDescription>
      </Alert>

      <section className="space-y-5">
        <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
        <Card className="grid gap-1 p-6">
          <h3 className="text-lg font-semibold sm:text-xl">
            {subscriptionPlan?.name ?? "Free"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {!subscriptionPlan?.isSubscribed
              ? "Upgrade to unlock unlimited access to Zenflow"
              : subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? `${formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.`
              : null}
          </p>
        </Card>
      </section>

      <section className="space-y-5 pb-5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription Plans
        </h2>

        <div className="grid gap-10 sm:grid-cols-2">
          {subscriptionPlans.map((plan, i) => (
            <Card
              key={plan.name}
              className={`${i === 1 && "border-primary shadow-md"} `}
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-3xl font-bold">
                  {formatPrice(plan.price, {
                    currency: "USD",
                  })}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>

                {plan.name === "Free" ? (
                  <Link
                    href="/app/dashboard"
                    className={cn(buttonVariants(), "w-full")}
                  >
                    Get Started
                  </Link>
                ) : (
                  <ManageSubscriptionForm
                    isCurrentPlan={plan.name === subscriptionPlan?.name}
                    isSubscribed={subscriptionPlan?.isSubscribed ?? false}
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    stripeSubscriptionId={
                      subscriptionPlan?.stripeSubscriptionId
                    }
                  />
                )}

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Icons.tick className="h-4 w-4" aria-hidden="true" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  )
}

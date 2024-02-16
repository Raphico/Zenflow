import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSubscriptionPlan } from "@/lib/fetchers/stripe"
import { getCachedUser } from "@/lib/fetchers/auth"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { ManageSubscriptionForm } from "@/components/forms/manage-subscription-form"
import { cn, formatDate, formatPrice } from "@/lib/utils"
import { subscriptionPlans } from "@/config/subscription"

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription.",
}

export default async function BillingPage() {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  const subscriptionPlan = await getSubscriptionPlan({ userId: user.id })

  return (
    <div className="container max-w-4xl space-y-8 px-8 py-2">
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
    </div>
  )
}

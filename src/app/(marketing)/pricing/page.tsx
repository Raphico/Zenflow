import type { Metadata } from "next"
import Link from "next/link"

import { subscriptionPlans } from "@/config/subscription"
import { cn, formatPrice } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Discover the right plan for you and start organizing your tasks effortlessly.",
}

export default function PricingPage() {
  return (
    <div className="container flex max-w-4xl flex-col space-y-10 py-12 lg:py-16">
      <PageHeader className="text-center">
        <PageHeaderHeading size="lg">
          Discover the right plan for you
        </PageHeaderHeading>
      </PageHeader>

      <section className="grid gap-10 sm:grid-cols-2">
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

              <Link
                href="/sign-in"
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                Get Started
              </Link>

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
      </section>

      <p className="text-center text-muted-foreground">
        Zenflow is a demo app.{" "}
        <strong className="font-semibold">
          You can test the upgrade and won&apos;t be charged.
        </strong>
      </p>
    </div>
  )
}

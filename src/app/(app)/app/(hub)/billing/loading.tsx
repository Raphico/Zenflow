import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function BillingLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
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
        <Skeleton className="h-[101.6px] w-full" />
      </section>

      <section className="space-y-5 pb-5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription Plans
        </h2>

        <div className="grid gap-10 sm:grid-cols-2">
          <Skeleton className="h-[381.6px] w-full sm:w-[396px]" />
          <Skeleton className="h-[381.6px] w-full sm:w-[396px]" />
        </div>
      </section>
    </div>
  )
}

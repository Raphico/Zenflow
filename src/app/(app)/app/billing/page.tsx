import type { Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription.",
}

export default function BillingPage() {
  return (
    <div className="container max-w-5xl px-8 py-2">
      <PageHeader>
        <PageHeaderHeading>Billing</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your billing and subscription
        </PageHeaderDescription>
      </PageHeader>

      <Separator className="my-6" />

      <div className="space-y-4">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Zenflow is a demo app using a Stripe test environment. You can find
            a list of test card numbers on the{" "}
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
      </div>
    </div>
  )
}

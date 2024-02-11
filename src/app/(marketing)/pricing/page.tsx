import type { Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Discover the right plan for you and start organizing your tasks effortlessly.",
}

export default function PricingPage() {
  return (
    <div className="container max-w-6xl space-y-8 py-8 lg:py-12">
      <PageHeader>
        <PageHeaderHeading size="lg">
          Unlock Unlimited Potential
        </PageHeaderHeading>
        <PageHeaderDescription size="lg">
          Experience the full power of Zenflow with our Pro plan
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the PRO plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Icons.tick className="h-4 w-4" />
              Unlimited Board Creations
            </li>
            <li className="flex items-center gap-2">
              <Icons.tick className="h-4 w-4" />
              Unlimited Columns per Board
            </li>
            <li className="flex items-center gap-2">
              <Icons.tick className="h-4 w-4" />
              Unlimited Tasks Creation
            </li>
            <li className="flex items-center gap-2">
              <Icons.tick className="h-4 w-4" />
              Access to Analytics
            </li>
            <li className="flex items-center gap-2">
              <Icons.tick className="h-4 w-4" />
              Premium Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">$9.99</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/sign-in" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </section>
      <p className="text-muted-foreground">
        Zenflow is a demo app.{" "}
        <strong className="font-semibold">
          You can test the upgrade and won&apos;t be charged.
        </strong>
      </p>
    </div>
  )
}

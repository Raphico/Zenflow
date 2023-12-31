import type { Metadata } from "next"

import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Stack",
  description: "Discover the tech stack powering Zenflow",
}

export default function StackPage() {
  return (
    <section className="container max-w-5xl space-y-8 py-8 md:py-12 lg:py-24">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Tech Stack</h2>
        <p className="text-muted-foreground">
          Discover the technologies powering Zenflow
        </p>
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="p-4">
            <Icons.nextjs className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">Next JS 14</CardTitle>
            <p className="text-sm text-muted-foreground">
              App dir, Routing, Layouts, Loading UI and API routes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Icons.react className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">React 18</CardTitle>
            <p className="text-sm text-muted-foreground">
              Server and Client Components
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Icons.database className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">Database</CardTitle>
            <p className="text-sm text-muted-foreground">
              ORM using Drizzle and deployed on Neon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Icons.component className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">Components</CardTitle>
            <p className="text-sm text-muted-foreground">
              UI components built using Radix UI and styled with Tailwind CSS
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Icons.authentication className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">Authentication</CardTitle>
            <p className="text-sm text-muted-foreground">
              Authentication using NextAuth.js and middlewares
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <Icons.subscription className="h-10 w-10" aria-hidden="true" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg">Subscriptions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Free and paid subscriptions using Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

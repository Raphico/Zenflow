import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import Balancer from "react-wrap-balancer"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon, RefreshCcwIcon, RocketIcon, TrophyIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="flex flex-col items-center justify-center gap-4 py-12 text-center md:pt-32">
        <Balancer
          as="h1"
          className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Elevate Your Productivity, Simplify Your Life
        </Balancer>
        <Balancer
          as="p"
          className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        >
          Stay organized, focused, and in control with our seamless task
          management companion
        </Balancer>

        <div className="flex items-center gap-4">
          <Link href="/sign-in" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.github className="mr-2 h-4 w-4" aria-hidden="true" />
            Github
          </Link>
        </div>
      </section>

      <section className="container space-y-8 py-12 lg:py-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Why Zenflow?
        </h2>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="p-4">
              <RocketIcon className="h-10 w-10" aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              <CardTitle className="text-lg">
                Effortless Task Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Experience efficiency in every task, effortlessly organizing and
                prioritizing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <RefreshCcwIcon className="h-10 w-10" aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              <CardTitle className="text-lg">
                Personalized Flexibility
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Tailor, tag, and prioritize tasks based on your individual
                priorities and preferences
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <TrophyIcon className="h-10 w-10" aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              <CardTitle className="text-lg">
                Track Progress, Celebrate Wins
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Effortlessly track task completion status and history. Celebrate
                your victories, big or small
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <ClockIcon className="h-10 w-10" aria-hidden="true" />
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              <CardTitle className="text-lg">
                Meet Deadlines Stress-Free
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Effortlessly stay on track without the stress with due dates
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

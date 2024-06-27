import type { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  getPopularTags,
  getPriorityAnalysis,
  getTaskCompletionRates,
  getTaskDistributionByStatus,
} from "@/server/data/analytics"
import { getCachedUser } from "@/server/data/auth"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { PopularTagsChart } from "./_components/popular-tags-chart"
import { PriorityAnalysisChart } from "./_components/priority-analysis-chart"
import { TaskCompletionRatesChart } from "./_components/task-completion-rates-chart"
import { TaskDistributionByStatusChart } from "./_components/task-distribution-status-chart"

export const metadata: Metadata = {
  title: "Analytics",
  description: "Explore insightful task analytics and board usage statistics",
}

export default async function AnalyticsPage() {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  const [
    popularTags,
    taskCompletionRates,
    taskDistributionByStatus,
    priorityAnalysis,
  ] = await Promise.all([
    getPopularTags(user.id),
    getTaskCompletionRates(user.id),
    getTaskDistributionByStatus(user.id),
    getPriorityAnalysis(user.id),
  ])

  return (
    <Shell className="max-w-6xl">
      <PageHeader>
        <PageHeaderHeading>Analytics</PageHeaderHeading>
        <PageHeaderDescription>
          Explore insightful task analytics
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid w-full gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PopularTagsChart data={popularTags} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PriorityAnalysisChart data={priorityAnalysis} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution by status</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <TaskDistributionByStatusChart data={taskDistributionByStatus} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionRatesChart data={taskCompletionRates} />
          </CardContent>
        </Card>
      </section>
    </Shell>
  )
}

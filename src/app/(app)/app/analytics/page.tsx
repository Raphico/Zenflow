import type { Metadata } from "next"

import {
  getPopularTags,
  getPriorityAnalysis,
  getTaskCompletionRates,
  getTaskDistributionByStatus,
} from "@/lib/fetchers/analytics"

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PopularTagsChart } from "./_components/popular-tags-chart"
import { TaskCompletionRatesChart } from "./_components/task-completion-rates-chart"
import { TaskDistributionByStatusChart } from "./_components/task-distribution-status-chart"
import { PriorityAnalysisChart } from "./_components/priority-analysis-chart"

export const metadata: Metadata = {
  title: "Analytics",
  description: "Explore insightful task analytics and board usage statistics",
}

export default async function AnalyticsPage() {
  const [
    popularTags,
    taskCompletionRates,
    taskDistributionByStatus,
    priorityAnalysis,
  ] = await Promise.all([
    getPopularTags(),
    getTaskCompletionRates(),
    getTaskDistributionByStatus(),
    getPriorityAnalysis(),
  ])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-8 pt-2">
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
    </div>
  )
}

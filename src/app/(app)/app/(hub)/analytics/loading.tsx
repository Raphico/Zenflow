import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

export default function AnalyticsLoading() {
  return (
    <Shell className="max-w-6xl">
      <PageHeader>
        <PageHeaderHeading>Analytics</PageHeaderHeading>
        <PageHeaderDescription>
          Explore insightful task analytics
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid w-full gap-4 sm:grid-cols-2">
        <Skeleton className="h-[350px]" />
        <Skeleton className="h-[350px]" />
        <Skeleton className="h-[350px]" />
        <Skeleton className="h-[350px]" />
      </section>
    </Shell>
  )
}

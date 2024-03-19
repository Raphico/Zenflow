import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
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
    </div>
  )
}

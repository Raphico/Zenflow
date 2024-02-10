import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-8 pt-2">
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

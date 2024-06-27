import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <Shell className="max-w-5xl">
      <div className="flex flex-col space-y-4">
        <PageHeader>
          <PageHeaderHeading>My Boards</PageHeaderHeading>
          <PageHeaderDescription>
            Here&apos;s a quick overview of your boards
          </PageHeaderDescription>
        </PageHeader>
        <Skeleton className="h-9 w-full" />
        <section className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </section>
      </div>
    </Shell>
  )
}

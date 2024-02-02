import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-8 py-2">
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
  )
}

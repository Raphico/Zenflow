import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLoading() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageHeader>
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>Manage account settings</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <div className="grid gap-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-9 w-full max-w-96" />
      </div>
      <Separator className="my-6 sm:my-8" />
      <section className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-4 w-full max-w-72" />
        </div>
        <Skeleton className="h-8 w-24" />
      </section>
      <Separator className="my-6 sm:my-8" />
      <section className="grid gap-4 sm:gap-6">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-full max-w-96" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </section>
    </div>
  )
}

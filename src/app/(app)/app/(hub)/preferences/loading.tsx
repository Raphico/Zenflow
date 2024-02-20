import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function PreferencesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader>
        <PageHeaderHeading>Preference</PageHeaderHeading>
        <PageHeaderDescription>
          Tailoring your experience to suit your unique preferences
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <div className="space-y-8">
        <div className="space-y-1">
          <Skeleton className="h-5 w-11" />
          <div className="grid max-w-md gap-4 pt-2 sm:grid-cols-2 sm:gap-8">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

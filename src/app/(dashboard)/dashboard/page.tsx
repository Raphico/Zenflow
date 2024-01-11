import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your tasks",
}

export default function DashboardPage() {
  return (
    <section className="container py-8 lg:py-10">
      <PageHeader>
        <PageHeaderHeading>Welcome, back!</PageHeaderHeading>
        <PageHeaderDescription>
          Here&apos;s a quick overview of your tasks
        </PageHeaderDescription>
      </PageHeader>
    </section>
  )
}

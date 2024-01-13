import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { UserProfile } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Account",
  description: "manage your account settings",
}

export default function AccountPage() {
  return (
    <section>
      <PageHeader>
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>Manage account settings</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <section className="w-full overflow-hidden">
        <UserProfile />
      </section>
    </section>
  )
}

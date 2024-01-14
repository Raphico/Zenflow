import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile-form"
import { getCachedUser } from "@/lib/fetchers/auth"

export const metadata: Metadata = {
  title: "Account",
  description: "manage your account settings",
}

export default async function AccountPage() {
  const user = await getCachedUser()

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>Manage account settings</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <ProfileForm user={{ username: user?.username || "" }} />
    </>
  )
}

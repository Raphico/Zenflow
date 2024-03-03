import type { Metadata } from "next"
import { redirect } from "next/navigation"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { getCachedUser } from "@/lib/fetchers/auth"
import { ProfileForm } from "@/components/forms/profile-form"
import { LogoutButton } from "@/components/auth/logout-button"
import { ChangePasswordForm } from "@/components/forms/change-password-form"

export const metadata: Metadata = {
  title: "Account",
  description: "manage your account settings",
}

export default async function AccountPage() {
  const user = await getCachedUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageHeader>
        <PageHeaderHeading>Account</PageHeaderHeading>
        <PageHeaderDescription>Manage account settings</PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <ProfileForm user={{ username: user.username }} />
      <Separator className="my-6 sm:my-8" />
      <section className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Password</h3>
          <p className="text-[12px] text-muted-foreground">
            change the password associated with this account
          </p>
        </div>

        <ChangePasswordForm />
      </section>
      <Separator className="my-6 sm:my-8" />
      <section className="grid gap-4 sm:gap-6">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Log out</h3>
            <p className="text-[12px] text-muted-foreground">
              Log out from this account
            </p>
          </div>
          <LogoutButton />
        </div>
      </section>
    </div>
  )
}

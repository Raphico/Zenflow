import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { ResetPasswordForm } from "../../_components/reset-password-form"

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
}

export default function ResetPasswordPage() {
  return (
    <Shell variant="centered" className="max-w-md">
      <div className="flex flex-col space-y-4">
        <PageHeader className="place-items-center text-center">
          <PageHeaderHeading>Reset Password</PageHeaderHeading>
          <PageHeaderDescription>
            Enter the email address associated with your account. We&apos;ll
            send an email with instructions to reset your password.
          </PageHeaderDescription>
        </PageHeader>

        <ResetPasswordForm />
      </div>
    </Shell>
  )
}

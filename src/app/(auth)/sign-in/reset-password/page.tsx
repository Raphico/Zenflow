import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
}

export default function ResetPasswordPage() {
  return (
    <>
      <PageHeader className="place-items-center text-center">
        <PageHeaderHeading>Reset Password</PageHeaderHeading>
        <PageHeaderDescription>
          Enter the email address associated with your account. We&apos;ll send
          an email with instructions to reset your password.
        </PageHeaderDescription>
      </PageHeader>

      <ResetPasswordForm />
    </>
  )
}

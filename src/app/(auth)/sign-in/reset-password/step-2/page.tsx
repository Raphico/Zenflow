import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { ResetPasswordStep2Form } from "@/components/forms/reset-password-step-2-form"

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
}

export default function ResetPasswordStep2Page() {
  return (
    <>
      <PageHeader className="place-items-center text-center">
        <PageHeaderHeading>Reset password</PageHeaderHeading>
        <PageHeaderDescription>
          Please enter the verification code sent to your email address, along
          with your new password.
        </PageHeaderDescription>
      </PageHeader>

      <ResetPasswordStep2Form />
    </>
  )
}

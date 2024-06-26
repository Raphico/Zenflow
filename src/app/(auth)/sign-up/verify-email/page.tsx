import { type Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { VerifyEmailForm } from "../../_components/verify-email-form"

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your email to create an account",
}

export default function VerifyEmail() {
  return (
    <Shell variant="centered" className="max-w-md">
      <div className="flex flex-col space-y-4">
        <PageHeader className="place-items-center text-center">
          <PageHeaderHeading>Verify Email</PageHeaderHeading>
          <PageHeaderDescription>
            Please check your inbox and paste the sign up code below to create
            an account
          </PageHeaderDescription>
        </PageHeader>

        <VerifyEmailForm />
      </div>
    </Shell>
  )
}

import { type Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { OAuthSignIn } from "../_components/oauth-sign-in"
import { SignUpForm } from "../_components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to Zenflow",
}

export default function SignIn() {
  return (
    <Shell variant="centered" className="max-w-md">
      <div className="flex w-full flex-col space-y-4">
        <PageHeader className="place-items-center text-center">
          <PageHeaderHeading>Welcome to Zenflow!</PageHeaderHeading>
          <PageHeaderDescription>
            Create your ZenFlow account in just a few simple steps
          </PageHeaderDescription>
        </PageHeader>

        <OAuthSignIn />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SignUpForm />

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            Already have an account?
          </span>
          <Link
            href="/sign-in"
            className="text-sm underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Shell>
  )
}

import { type Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { OAuthSignIn } from "@/components/auth/oauth-sign-in"
import { SignInForm } from "@/components/forms/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Zenflow",
}

export default function SignIn() {
  return (
    <>
      <PageHeader className="place-items-center text-center">
        <PageHeaderHeading size="sm">Welcome back!</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Choose your preferred sign-in method
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

      <SignInForm />

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link
          href="/sign-up"
          className="text-sm underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  )
}

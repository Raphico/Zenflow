import { type Metadata } from "next"
import Link from "next/link"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { OAuthSignIn } from "../_components/oauth-sign-in"
import { SignInForm } from "../_components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Zenflow",
}

export default function SignIn() {
  return (
    <>
      <PageHeader className="place-items-center text-center">
        <PageHeaderHeading>Welcome back!</PageHeaderHeading>
        <PageHeaderDescription>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground lg:inline-block">
            Don&apos;t have an account?
          </span>
          <Link
            href="/sign-up"
            className="text-sm underline-offset-4 hover:underline"
          >
            Sign Up
          </Link>
        </div>

        <Link
          href="/sign-in/reset-password"
          className="text-sm underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </>
  )
}

export const unknownError = "Something went. Please try again later"

export const redirects = {
  toSignIn: "/sign-in",
  afterSignIn: "/app/dashboard",
  afterSignOut: "/sign-in",
  ssoCallback: "/sso-callback",
  resetPassword: "/sign-in/reset-password",
  resetPasswordStep2: "/sign-in/reset-password/step-2",
  verifyEmail: "/sign-up/verify-email",
} as const

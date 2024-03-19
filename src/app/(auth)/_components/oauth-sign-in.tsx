"use client"

import * as React from "react"
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/nextjs/server"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const providers = [
  {
    name: "Google",
    strategy: "oauth_google",
    icon: "google",
  },
  {
    name: "Github",
    strategy: "oauth_github",
    icon: "github",
  },
] satisfies {
  name: string
  strategy: OAuthStrategy
  icon: keyof typeof Icons
}[]

export function OAuthSignIn() {
  const { isLoaded, signIn } = useSignIn()
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)

  const handleOAuthSignIn = async (oauthStrategy: OAuthStrategy) => {
    if (!isLoaded) return null

    try {
      setIsLoading(oauthStrategy)

      await signIn.authenticateWithRedirect({
        strategy: oauthStrategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/app/dashboard",
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = "Something went wrong, please try again."

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError)
    }
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {providers.map((provider) => {
        const Icon = Icons[provider.icon]
        return (
          <Button
            key={provider.name}
            aria-label={`Continue with ${provider.name}`}
            variant="outline"
            disabled={isLoading !== null}
            onClick={() => handleOAuthSignIn(provider.strategy)}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}

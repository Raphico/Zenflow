"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function LogoutButton() {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <div>
      <SignOutButton
        signOutCallback={() =>
          startTransition(() => {
            router.push("/sign-in")
          })
        }
      >
        <Button
          variant="outline"
          aria-label="Log out"
          size="sm"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Log out
        </Button>
      </SignOutButton>
    </div>
  )
}

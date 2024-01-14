"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import { Icons } from "../icons"
import { deleteAccount } from "@/lib/actions/profile"
import { catchClerkError } from "@/lib/utils"

export function DeleteAccountButton() {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handleDeleteUser = () => {
    startTransition(async () => {
      try {
        await deleteAccount()

        router.push("/")
      } catch (error) {
        catchClerkError(error)
      }
    })
  }

  return (
    <Button disabled={isPending} onClick={handleDeleteUser}>
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Continue
    </Button>
  )
}

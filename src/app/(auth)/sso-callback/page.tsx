import { type HandleOAuthCallbackParams } from "@clerk/types"

import { Shell } from "@/components/shell"

import { SSOCallback } from "../_components/sso-callback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <Shell variant="centered">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}

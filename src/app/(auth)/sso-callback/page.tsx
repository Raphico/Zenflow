import { type HandleOAuthCallbackParams } from "@clerk/types"

import { SSOCallback } from "../_components/sso-callback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <>
      <SSOCallback searchParams={searchParams} />
    </>
  )
}

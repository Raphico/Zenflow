import { env } from "@/env"

export function getAbsoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

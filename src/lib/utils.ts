import {
  isToday,
  isTomorrow,
  isThisWeek,
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns"
import { env } from "@/env.mjs"
import { isClerkAPIResponseError } from "@clerk/nextjs"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import type { User } from "@clerk/nextjs/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function truncate(text: string, maxLength: number) {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

export function getDueDate(dueDate: Date) {
  if (isToday(dueDate)) {
    return "Due today"
  } else if (isTomorrow(dueDate)) {
    return "Due tomorrow"
  } else if (isThisWeek(dueDate)) {
    return `Due on ${format(dueDate, "EEEE")}`
  } else {
    return `Due on ${format(dueDate, "MMM d")}`
  }
}

export function calculateDueDates(
  dueDateValue: string
): { endDate: Date; startDate: Date } | null {
  const today = new Date()

  switch (dueDateValue) {
    case "this.week":
      return { startDate: startOfWeek(today), endDate: endOfWeek(today) }
    case "next.7.days":
      return { startDate: today, endDate: addDays(today, 7) }
    case "this.month":
      return { startDate: startOfMonth(today), endDate: endOfMonth(today) }
    default:
      return null // For 'All (default)' and any other unsupported values
  }
}

/** Originally from `sadmann7/skateshop`
 * @link https://github.com/sadmann7/skateshop/blob/main/src/lib/utils.tsx
 */
export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  return email
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price))
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date))
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

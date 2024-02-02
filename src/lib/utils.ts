import { env } from "@/env.mjs"
import { isClerkAPIResponseError } from "@clerk/nextjs"
import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { isToday, isTomorrow, isThisWeek, format } from "date-fns"

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

type DebounceFunction<T extends unknown[]> = (...args: T) => void

export const debounce = <T extends unknown[]>(
  mainFunction: DebounceFunction<T>,
  timeout = 300
): DebounceFunction<T> => {
  // Declare a variable called 'timer' to store the timer ID
  let timer: ReturnType<typeof setTimeout>

  // Return an anonymous function that takes in any number of arguments
  return function (...args: T) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer)

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args)
    }, timeout)
  }
}

/** Originally from `sadmann7/skateshop`
 * @link https://github.com/sadmann7/skateshop/blob/main/src/lib/utils.tsx
 */
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

import { toast } from "sonner"
import { z } from "zod"

import { unknownError } from "@/config/constants"

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return err.errors[0].message
  } else if (err instanceof Error) {
    return err.message
  } else {
    return unknownError
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  return toast.error(errorMessage)
}

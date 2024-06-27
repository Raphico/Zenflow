import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { buttonVariants } from "./ui/button"

interface ErrorShellProps {
  title: string
  description: string
  retryLink: string
  retryLinkText: string
  icon?: keyof typeof Icons
}

export function ErrorShell({
  title,
  description,
  retryLink,
  retryLinkText,
  icon,
}: ErrorShellProps) {
  const Icon = icon && Icons[icon]

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 text-center"
    >
      {Icon && <Icon className="size-16" aria-hidden="true" />}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <Balancer className="max-w-lg text-sm text-muted-foreground">
        {description}
      </Balancer>
      <Link
        href={retryLink}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        {retryLinkText}
      </Link>
    </div>
  )
}

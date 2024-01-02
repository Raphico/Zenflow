import * as React from "react"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import Balancer from "react-wrap-balancer"

interface PageHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  as?: React.ElementType
}

const PageHeader = ({
  className,
  as: Comp = "section",
  ...props
}: PageHeaderProps) => (
  <Comp className={cn("grid gap-1", className)} {...props} />
)

const headingVariants = cva(
  "font-bold leading-tight tracking-tighter lg:leading-[1.1]",
  {
    variants: {
      size: {
        default: "text-3xl sm:text-4xl",
        sm: "text-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const PageHeaderHeading = ({
  className,
  as: Comp = "h1",
  size,
  ...props
}: PageHeaderHeadingProps) => (
  <Comp className={cn(headingVariants({ size, className }))} {...props} />
)

const descriptionVariants = cva("max-w-2xl text-muted-foreground", {
  variants: {
    size: {
      default: "text-base sm:text-lg",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface PageHeaderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {}

const PageHeaderDescription = ({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) => (
  <Balancer
    as="p"
    className={cn(descriptionVariants({ size, className }))}
    {...props}
  />
)

export { PageHeader, PageHeaderHeading, PageHeaderDescription }

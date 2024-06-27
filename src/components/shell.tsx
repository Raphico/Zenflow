import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 lg:py-6", {
  variants: {
    variant: {
      default: "container",
      centered:
        "container flex h-[100vh] w-full flex-col items-center justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ShellProps
  extends VariantProps<typeof shellVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export const Shell = ({
  as: Comp = "section",
  variant,
  className,
  ...props
}: ShellProps) => (
  <Comp className={cn(shellVariants({ variant }), className)} {...props} />
)

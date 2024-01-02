/** Originally from `sadmann7/skateshop`
 * @link https://github.com/sadmann7/skateshop/blob/main/src/components/mdx/mdx-image.tsx
 */

"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

interface MdxImageProps extends React.ComponentProps<typeof Image> {}

export function MdxImage({ className, ...props }: MdxImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt ?? "No caption"}
      className={cn(className)}
    />
  )
}

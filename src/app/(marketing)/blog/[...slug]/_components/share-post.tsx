"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface SharePostProps {
  postTitle: string
  postUrl: string
}

export function SharePost({ postTitle, postUrl }: SharePostProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error("unable to copy post")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-lg font-bold">Share this Post</p>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleCopyToClipboard}
        >
          {copied ? (
            <Icons.tick className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.copy className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">Copy post url to clipboard</span>
        </Button>
        <Link
          target="_blank"
          rel="noopener nofollow"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            postUrl
          )}&text=${encodeURIComponent(postTitle)}&via=yourTwitterHandle`}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "rounded-full"
          )}
        >
          <Icons.twitter className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Share this post on Twitter</span>
        </Link>

        <Link
          target="_blank"
          rel="noopener nofollow"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl
          )}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "rounded-full"
          )}
        >
          <Icons.facebook className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Share this post on Facebook</span>
        </Link>
        <Link
          target="_blank"
          rel="noopener nofollow"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            postUrl
          )}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "rounded-full"
          )}
        >
          <Icons.linkedin className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Share this post on Linkedin</span>
        </Link>
      </div>
    </div>
  )
}

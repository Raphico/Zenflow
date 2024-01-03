import Link from "next/link"
import { type Post } from "contentlayer/generated"

import { buttonVariants } from "@/components/ui/button"
import { cn, truncate } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface PostPagerProps {
  currentPost: Post
  allPosts: Post[]
}

export function PostPager({ currentPost, allPosts }: PostPagerProps) {
  const currentPostIndex = allPosts.findIndex(
    (post) => post.slug === currentPost.slug
  )
  const prevPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null
  const nextPost =
    currentPostIndex < allPosts.length - 1
      ? allPosts[currentPostIndex + 1]
      : null

  return (
    <div className="flex items-center justify-between">
      {prevPost && (
        <Link
          aria-label="previous post"
          href={prevPost.slug}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "whitespace-normal"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          {truncate(prevPost.title, 20)}
        </Link>
      )}
      {nextPost && (
        <Link
          aria-label="next post"
          href={nextPost.slug}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "ml-auto whitespace-normal"
          )}
        >
          {truncate(nextPost.title, 20)}
          <Icons.chevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

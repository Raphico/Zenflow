import type { Post } from "contentlayer/generated"
import Link from "next/link"
import Image from "next/image"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <Link href={post.slug}>
      <article className="space-y-2">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.image}
            alt={`${post.title} featured image`}
            fill
            className="rounded-md border bg-muted object-cover transition-opacity hover:opacity-80"
            priority={index <= 1}
          />
        </AspectRatio>
        <p className="text-sm text-muted-foreground">
          {formatDate(post.publishedAt)}
        </p>
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-muted-foreground">{post.description}</p>
      </article>
    </Link>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/utils/format-date"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore our blog for expert insights on productivity, task management, and workflow optimization",
}

export default function BlogPage() {
  // only include published posts in the order of their publication date from newest to oldest
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) =>
      compareDesc(new Date(b.publishedAt), new Date(a.publishedAt))
    )

  return (
    <Shell className="max-w-5xl">
      <PageHeader>
        <PageHeaderHeading size="lg">
          Productivity Hub: Tips & Insights
        </PageHeaderHeading>
        <PageHeaderDescription size="lg">
          Explore our blog for expert insights on productivity, task management,
          and workflow optimization.
        </PageHeaderDescription>
      </PageHeader>
      <Separator />
      <section className="grid gap-12 sm:grid-cols-2">
        {posts.map((post, index) => (
          <Link key={post._id} href={post.slug}>
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
        ))}
      </section>
    </Shell>
  )
}

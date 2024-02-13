import Link from "next/link"
import type { Metadata } from "next"
import Image from "next/image"

import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { formatDate } from "@/lib/utils"

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
    <section className="container max-w-5xl py-12 lg:py-16">
      <PageHeader>
        <PageHeaderHeading size="lg">
          Productivity Hub: Tips & Insights
        </PageHeaderHeading>
        <PageHeaderDescription size="lg">
          Explore our blog for expert insights on productivity, task management,
          and workflow optimization.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-8" />
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
    </section>
  )
}

import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Separator } from "@/components/ui/separator"
import { PostCard } from "./_components/post-card"

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
    <section className="container max-w-5xl py-8 lg:py-12">
      <PageHeader>
        <PageHeaderHeading>Productivity Hub: Tips & Insights</PageHeaderHeading>
        <PageHeaderDescription>
          Explore our blog for expert insights on productivity, task management,
          and workflow optimization.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-8" />
      <section className="grid gap-12 sm:grid-cols-2">
        {posts.map((post, index) => (
          <PostCard key={post._id} post={post} index={index} />
        ))}
      </section>
    </section>
  )
}

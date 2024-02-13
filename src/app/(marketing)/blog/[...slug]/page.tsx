import { type Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { allAuthors, allPosts } from "contentlayer/generated"
import "@/styles/mdx.css"

import { cn, formatDate, absoluteUrl } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Mdx } from "@/components/mdx/mdx-components"
import { Separator } from "@/components/ui/separator"
import { PostPager } from "./_components/post-pager"
import { SharePost } from "./_components/share-post"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

const getPostFromParams = (params: PostPageProps["params"]) => {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogUrl = absoluteUrl(post.image)

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find((a) => a.name === author.replace(/\r/g, ""))
  )

  return (
    <article className="container mx-auto grid max-w-3xl gap-8 py-12 lg:py-16">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <p>{formatDate(post.publishedAt)}</p>
          <span>•</span>
          <p>{post.readingTimeInMinutes} min read</p>
        </div>
        <h1 className="font-heading text-4xl font-bold lg:text-5xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground">{post.description}</p>
        {authors?.length ? (
          <div className="flex items-center gap-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={author.twitter}
                  className="flex items-center gap-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={30}
                    height={30}
                    className="rounded-full bg-white"
                  />
                  <p className="font-medium">
                    <span className="text-muted-foreground">By</span>{" "}
                    {author.name}
                  </p>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={post.image}
          alt={`${post.title} featured image`}
          fill
          className="rounded-md border bg-muted object-cover"
          priority
        />
      </AspectRatio>
      <Mdx code={post.body.code} />
      <Separator className="my-4" />
      <SharePost
        postTitle={post.title}
        postUrl={absoluteUrl(`blog/${post.slugAsParams}`)}
      />
      <Separator />
      <PostPager currentPost={post} allPosts={allPosts} />
      <Link
        href="/blog"
        className={cn(buttonVariants({ variant: "ghost" }), "mx-auto")}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        See all posts
      </Link>
    </article>
  )
}

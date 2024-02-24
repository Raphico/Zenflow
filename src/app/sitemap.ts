import { absoluteUrl } from "@/lib/utils"
import { allPosts } from "contentlayer/generated"

export default function sitemap() {
  const postsRoutes = allPosts.map((post) => ({
    url: absoluteUrl(`${post.slug}`),
    lastModified: new Date().toISOString(),
  }))

  const routes = ["", "/blog", "/pricing", "/stack"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [...postsRoutes, ...routes]
}

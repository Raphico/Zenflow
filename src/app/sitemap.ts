import { allPosts } from "contentlayer/generated"

import { getAbsoluteUrl } from "@/utils/get-absolute-url"

export default function sitemap() {
  const postsRoutes = allPosts.map((post) => ({
    url: getAbsoluteUrl(`${post.slug}`),
    lastModified: new Date().toISOString(),
  }))

  const routes = ["", "/blog", "/pricing", "/stack"].map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [...postsRoutes, ...routes]
}

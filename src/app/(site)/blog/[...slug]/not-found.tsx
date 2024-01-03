import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="container flex h-[75dvh] max-w-sm flex-col justify-center">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <Icons.notFound className="h-12 w-12" aria-hidden="true" />
        <h1 className="text-2xl font-semibold">We looked everywhere</h1>
        <p className="text-sm text-muted-foreground">
          The post you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Button variant="ghost">
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          See all posts
        </Button>
      </div>
    </section>
  )
}

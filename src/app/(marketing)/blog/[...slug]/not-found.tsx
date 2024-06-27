import { ErrorShell } from "@/components/empty-shell"
import { Shell } from "@/components/shell"

export default function NotFound() {
  return (
    <Shell variant="centered" className="h-[75vh]">
      <ErrorShell
        title="We looked everywhere"
        description="The post you are looking for might have been removed or is temporarily
          unavailable."
        retryLink="/blog"
        retryLinkText="See Posts"
        icon="notFound"
      />
    </Shell>
  )
}

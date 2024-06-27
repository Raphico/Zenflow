import { ErrorShell } from "@/components/empty-shell"
import { Shell } from "@/components/shell"

export default function NotFound() {
  return (
    <Shell variant="centered" className="h-[75vh]">
      <ErrorShell
        title="We looked everywhere"
        description=" The project doesn't seem to exist or you don't have
          permission to access it."
        retryLink="/app/dashboard"
        retryLinkText="See All Boards"
        icon="notFound"
      />
    </Shell>
  )
}

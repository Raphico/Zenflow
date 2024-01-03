import { SiteFooter } from "./_components/site-footer"
import { SiteHeader } from "./_components/site-header"

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

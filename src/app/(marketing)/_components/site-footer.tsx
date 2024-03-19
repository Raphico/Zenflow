import Link from "next/link"

import { JoinNewsletterForm } from "./join-newsletter-form"
import { ModeToggle } from "./mode-toggle"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-10 py-6">
        <div className="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-20">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" aria-hidden="true" />
            <span className="text-lg font-bold">{siteConfig.name}</span>
          </Link>
          <div className="grid flex-1 gap-10 sm:grid-cols-3">
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-2">
                <p className="font-medium">{item.title}</p>
                <div className="flex flex-col items-start gap-2">
                  {item.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      target={item?.external ? "_blank" : undefined}
                      rel={item?.external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="font-medium">Subscribe to our newsletter</p>
            <JoinNewsletterForm />
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Raphico <span className="sr-only">Twitter</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              href={siteConfig.links.github}
              rel="noreferrer"
              className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
            >
              <Icons.github className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Github</span>
            </Link>

            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

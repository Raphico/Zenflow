import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"

import { PreferenceForm } from "./_components/preference-form"

export const metadata: Metadata = {
  title: "Preferences",
  description: "Change your preferences",
}

export default function PreferencePage() {
  return (
    <Shell className="max-w-5xl">
      <div className="flex flex-col space-y-4">
        <PageHeader>
          <PageHeaderHeading>Preferences</PageHeaderHeading>
          <PageHeaderDescription>
            Tailoring your experience to suit your unique preferences
          </PageHeaderDescription>
        </PageHeader>

        <Separator />

        <PreferenceForm />
      </div>
    </Shell>
  )
}

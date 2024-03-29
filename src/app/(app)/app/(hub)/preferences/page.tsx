import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { PreferenceForm } from "./_components/preference-form"

export const metadata: Metadata = {
  title: "Preferences",
  description: "Change your preferences",
}

export default function PreferencePage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader>
        <PageHeaderHeading>Preferences</PageHeaderHeading>
        <PageHeaderDescription>
          Tailoring your experience to suit your unique preferences
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      <PreferenceForm />
    </div>
  )
}

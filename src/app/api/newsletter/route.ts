import { env } from "@/env.mjs"
import { z } from "zod"

import { joinNewsletterSchema } from "@/lib/validations/email"

export async function POST(req: Request) {
  const { email } = joinNewsletterSchema.parse(await req.json())
  try {
    const res = await fetch(
      `https://${env.MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`,

      {
        method: "POST",
        headers: {
          Authorization: `apikey ${env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    )

    return new Response(null, { status: res.status })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 500 })
    }

    return new Response("Something went wrong", { status: 500 })
  }
}

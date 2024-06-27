import { env } from "@/env"
import Stripe from "stripe"

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
})

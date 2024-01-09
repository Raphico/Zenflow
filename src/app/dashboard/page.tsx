import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  return <UserButton afterSignOutUrl="/sign-in" />
}

"use client"

import { useRouter } from "next/navigation"
import { Input } from "./ui/input"

export function SearchBoards() {
  const router = useRouter()

  const handleSearch = (query: string) => {
    router.push(query ? `/app/dashboard?query=${query}` : "/app/dashboard", {
      scroll: false,
    })
  }

  return (
    <Input
      placeholder="Search boards"
      className="w-full"
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}

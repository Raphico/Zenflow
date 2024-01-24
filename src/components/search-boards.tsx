"use client"

import { useRouter } from "next/navigation"
import { debounce } from "@/lib/utils"
import { Input } from "./ui/input"

export function SearchBoards() {
  const router = useRouter()

  const handleSearch = debounce((search: string) => {
    router.push(`/app/dashboard?search=${search}`, { scroll: false })
  }, 300)

  return (
    <Input
      placeholder="Search boards"
      className="w-full"
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}

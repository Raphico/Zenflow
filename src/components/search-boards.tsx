"use client"

import * as React from "react"

import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchBoards() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  const handleSearch = (query: string) => {
    router.push(query ? `/app/dashboard?query=${query}` : "/app/dashboard", {
      scroll: false,
    })
  }

  const debouncedQuery = useDebounce(handleSearch, 150)

  return (
    <Input
      placeholder="Search boards"
      className="w-full"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)

        debouncedQuery(e.target.value)
      }}
    />
  )
}

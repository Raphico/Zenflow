"use client"

import * as React from "react"
import type { Board } from "@/db/schema"

import { Icons } from "../icons"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { formatDate } from "@/lib/utils"
import { DeleteBoardDialog } from "../delete-board-dialog"

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card className="h-44">
      <CardHeader className="flex flex-row items-center justify-end">
        <div className="flex items-center gap-2">
          <Icons.edit className="h-4 w-4 text-muted-foreground" />
          <DeleteBoardDialog board={{ id: board.id, name: board.name }} />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-center text-xl font-bold">{board.name}</h3>
      </CardContent>
      <CardFooter>
        {board.createdAt && (
          <p className="text-[12px] text-muted-foreground">
            {formatDate(board.createdAt)}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

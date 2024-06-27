import * as React from "react"
import Link from "next/link"
import type { Board } from "@/server/db/schema"

import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { BoardActions } from "./board-actions"

interface BoardCardProps {
  board: Pick<Board, "userId" | "id" | "name" | "createdAt">
  userId: string
}

export function BoardCard({ board, userId }: BoardCardProps) {
  return (
    <Card className="h-44">
      <CardHeader className="flex flex-row items-center justify-end pt-4">
        <BoardActions
          userId={userId}
          board={{ id: board.id, name: board.name }}
        />
      </CardHeader>
      <Link href={`/app/board/${board.id}`}>
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
      </Link>
    </Card>
  )
}

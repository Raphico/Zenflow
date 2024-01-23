import * as React from "react"
import type { Board } from "@/db/schema"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { formatDate } from "@/lib/utils"
import { DeleteBoardDialog } from "../dialogs/delete-board-dialog"
import { EditBoardDialog } from "../dialogs/edit-board-dialog"

interface BoardCardProps {
  board: Board
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card className="h-44">
      <CardHeader className="flex flex-row items-center justify-end pt-4">
        <div className="flex items-center gap-2">
          <EditBoardDialog board={{ id: board.id, name: board.name }} />
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

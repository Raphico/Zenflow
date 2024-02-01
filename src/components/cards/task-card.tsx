import type { Task } from "@/db/schema"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { getDueDate } from "@/lib/utils"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="rounded-sm">
      <CardHeader className="items-start justify-start p-4">
        <span className="rounded-md border px-4 py-1 text-[12px]">
          {task.tag}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
      </CardContent>
      <CardFooter className="justify-between p-4 pt-0">
        <span className="text-[12px] font-semibold">{task.priority}</span>
        {task.dueDate && (
          <span className="text-[12px] font-semibold text-muted-foreground">
            {getDueDate(task.dueDate)}
          </span>
        )}
      </CardFooter>
    </Card>
  )
}

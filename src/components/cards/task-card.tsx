import * as React from "react"
import type { Task } from "@/db/schema"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { getDueDate } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { Icons } from "../icons"
import { Subtasks, SubtasksSkeleton } from "../subtasks"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="rounded-sm">
      <CardHeader className="flex-row items-center justify-between p-4">
        <Checkbox className="rounded-full" />
        <Icons.more className="h-6 w-6" aria-hidden="true" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
      </CardContent>
      <CardFooter className="justify-between p-4 pt-0">
        <span className="text-[12px] font-semibold">{task.priority}</span>

        <div className="flex items-center gap-4">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icons.calendar className="h-3 w-3" aria-label="Due Date" />
              <span className="text-[12px]">{getDueDate(task.dueDate)}</span>
            </div>
          )}

          {task.tag && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icons.tag className="h-3 w-3" aria-label="Tag" />
              <span className="text-[12px]">{task.tag}</span>
            </div>
          )}

          <React.Suspense fallback={<SubtasksSkeleton />}>
            <Subtasks taskId={task.id} />
          </React.Suspense>
        </div>
      </CardFooter>
    </Card>
  )
}

import { z } from "zod"

export const subtaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(35),
  done: z.boolean().default(false),
  dueDate: z.coerce.date().optional(),
})

export const taskSchema = z.object({
  title: z.string().min(3).max(35),
  description: z.string().max(150).optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4"]).default("P4"),
  tag: z.string().max(25).optional(),
  statusId: z.coerce.number(),
  subtasks: z.array(subtaskSchema),
})

export const addTaskSchema = taskSchema.extend({
  boardId: z.number(),
  statusId: z.number(),
})

export const updateTaskSchema = taskSchema.extend({
  id: z.number(),
  boardId: z.number(),
})

export const deleteTaskSchema = z.object({
  taskId: z.number(),
  boardId: z.number(),
})

export const updateTaskDoneSchema = deleteTaskSchema.extend({
  isDone: z.boolean(),
})

export const taskSearchParamsSchema = z.object({
  showCompletedTasks: z.string().optional().default("true"),
  sort: z.string().optional().default("createdAt.desc"),
  priorities: z.string().optional(),
  dueDate: z.string().optional(),
})

export const getTasksSchema = taskSearchParamsSchema
  .omit({ showCompletedTasks: true })
  .extend({
    statusId: taskSchema.shape.statusId,
  })

export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>
export type UpdateTaskDoneSchema = z.infer<typeof updateTaskDoneSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
export type AddTaskSchema = z.infer<typeof addTaskSchema>
export type SubtaskSchema = z.infer<typeof subtaskSchema>
export type SubTask = z.infer<typeof subtaskSchema>
export type TaskSchema = z.infer<typeof taskSchema>
export type TaskSearchParamsSchema = z.infer<typeof taskSearchParamsSchema>
export type GetTasksSchema = z.infer<typeof getTasksSchema>

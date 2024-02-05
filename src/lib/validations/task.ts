import { z } from "zod"

export const subtaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(35),
  done: z.boolean().default(false),
  dueDate: z.coerce.date().optional(),
})

export type SubTask = z.infer<typeof subtaskSchema>

export const taskSchema = z.object({
  title: z.string().min(3).max(35),
  description: z.string().max(150).optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4"]).default("P4"),
  tag: z.string().max(25).optional(),
  statusId: z.number(),
  subtasks: z.array(subtaskSchema),
})

import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title cannot be empty",
    })
    .max(35, {
      message: "Title cannot exceed 35 characters",
    }),
  dueDate: z.date().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4"]),
  tag: z
    .string()
    .max(25, {
      message: "Tag cannot exceed 25 characters",
    })
    .optional(),
  status: z.string({
    required_error: "Status is required",
  }),
  description: z
    .string()
    .max(150, {
      message: "Task description is too long",
    })
    .optional(),
  subtasks: z.array(
    z.object({
      title: z
        .string()
        .min(1, {
          message: "Title cannot be empty",
        })
        .max(35, {
          message: "Title cannot exceed 35 characters",
        }),
      done: z.boolean(),
      dueDate: z.date().optional(),
    })
  ),
})

export const updateTaskSchema = z.object({
  statusId: z.number(),
  title: taskSchema.shape.title,
  dueDate: taskSchema.shape.dueDate,
  priority: taskSchema.shape.priority,
  tag: taskSchema.shape.tag,
  description: taskSchema.shape.description,
  subtasks: taskSchema.shape.subtasks,
})

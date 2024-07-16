import { relations, sql } from "drizzle-orm"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const priorityEnum = pgEnum("priority", ["P1", "P2", "P3", "P4"])

export const boards = pgTable("boards", {
  userId: varchar("user_id", { length: 191 }).notNull(),
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export type Board = typeof boards.$inferSelect
export type NewBoard = typeof boards.$inferInsert

export const statuses = pgTable("statuses", {
  id: serial("id").primaryKey(),
  boardId: integer("board_id")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 35 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export type Status = typeof statuses.$inferSelect
export type NewStatus = typeof statuses.$inferInsert

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  statusId: integer("status_id")
    .notNull()
    .references(() => statuses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 35 }).notNull(),
  description: varchar("description", { length: 150 }),
  priority: priorityEnum("P1").notNull(),
  dueDate: timestamp("due_date"),
  done: boolean("done").default(false).notNull(),
  tag: varchar("tag", { length: 25 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
})

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert

export const subtasks = pgTable("subtasks", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 35 }).notNull(),
  done: boolean("done").default(false).notNull(),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").default(sql`current_timestamp`),
})

export type Subtask = typeof tasks.$inferSelect
export type NewSubtask = typeof tasks.$inferInsert

// relations
export const boardsRelations = relations(boards, ({ many }) => ({
  statuses: many(statuses),
}))

export const statusesRelations = relations(statuses, ({ one, many }) => ({
  tasks: many(tasks),
  board: one(boards, {
    fields: [statuses.boardId],
    references: [boards.id],
  }),
}))

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  subtasks: many(subtasks),
  status: one(statuses, {
    fields: [tasks.statusId],
    references: [statuses.id],
  }),
}))

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}))

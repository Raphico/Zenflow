import { relations } from "drizzle-orm"
import {
  boolean,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const boards = mysqlTable("boards", {
  userId: varchar("userId", { length: 191 }).notNull(),
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Board = typeof boards.$inferSelect

export const statuses = mysqlTable("statuses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 35 }).notNull(),
  boardId: int("boardId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Status = typeof statuses.$inferSelect

export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 35 }).notNull(),
  description: varchar("description", { length: 150 }),
  priority: mysqlEnum("priority", ["P1", "P2", "P3", "P4"])
    .default("P4")
    .notNull(),
  dueDate: datetime("dueDate"),
  done: boolean("done").default(false).notNull(),
  tag: varchar("tag", { length: 25 }),
  statusId: int("statusId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export type Task = typeof tasks.$inferSelect

export const subtasks = mysqlTable("subtasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 35 }).notNull(),
  done: boolean("done").default(false).notNull(),
  dueDate: datetime("dueDate"),
  taskId: int("taskId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

// relationships
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

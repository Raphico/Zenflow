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
import { relations } from "drizzle-orm"

export const boards = mysqlTable("boards", {
  userId: varchar("userId", { length: 191 }).notNull(),
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export type Board = typeof boards.$inferSelect

export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 20 }).notNull(),
  description: varchar("description", { length: 150 }),
  priority: mysqlEnum("priority", ["P1", "P2", "P3", "P4"]).default("P4"),
  status: varchar("status", { length: 25 }).notNull(),
  tags: varchar("tags", { length: 25 }),
  boardId: int("boardId").notNull(),
  dueDate: datetime("dueDate"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

export const subtasks = mysqlTable("subtasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 20 }).notNull(),
  done: boolean("done").default(false),
  dueDate: datetime("dueDate"),
  taskId: int("taskId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
})

// relationships
export const boardsRelations = relations(boards, ({ many }) => ({
  tasks: many(tasks),
}))

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  board: one(boards, {
    fields: [tasks.boardId],
    references: [boards.id],
  }),
  subtasks: many(subtasks),
}))

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}))

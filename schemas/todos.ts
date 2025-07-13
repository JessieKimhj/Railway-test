
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos",{
    todoId:serial("todo_id").primaryKey(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    createAt : timestamp("created_at").notNull().defaultNow()

})
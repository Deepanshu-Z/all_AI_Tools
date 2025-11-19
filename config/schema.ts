import {
  json,
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  dob: varchar("dob"),
  credits: integer().default(2),
  provider: varchar("provider").notNull(),
});

export const projectsTable = pgTable("projects", {
  id: text().primaryKey(),
  userId: integer().references(() => usersTable.id),
  title: varchar(),
});

export const framesTable = pgTable("frames", {
  id: varchar().primaryKey(),
  projectId: text().references(() => projectsTable.id),
});

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  frameId: varchar().references(() => framesTable.id),
  message: json(),
});

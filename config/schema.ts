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

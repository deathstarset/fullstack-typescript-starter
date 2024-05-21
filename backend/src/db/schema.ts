import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userRole = pgEnum("role", ["user", "admin"]);
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  role: userRole("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

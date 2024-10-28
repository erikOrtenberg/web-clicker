import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/mysql-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const transactions = sqliteTable("transactions", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  creation_time: integer("creation_time", {mode: "timestamp"})
    .notNull()
    .default(sql`(unixepoch())`),
  clicker_id: integer("clicker_id")
    .references(() => clickers.id)
    .notNull(),
  count: integer("count")
    .default(0)
    .notNull(),
});

const clickers = sqliteTable("clickers", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  item_id: integer("item_id")
    .references(() => items.id)
    .notNull(),
  click_number: integer("click_number")
    .default(1)
    .notNull(),
});

const items = sqliteTable("items", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  name: text("name").notNull(),
  price: integer("price"), // optional if tracking cost of physical item
  comment: text("comment"),
  // add picture later:
});

const users = sqliteTable("users", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});

type InsertTransactionParams = typeof transactions.$inferInsert;
type InsertClickerParams = typeof clickers.$inferInsert;
type InsertItemParams = typeof items.$inferInsert;
type InsertUserParams = typeof users.$inferInsert;

export {
  transactions,
  clickers,
  items,
  users,
  type InsertTransactionParams,
  type InsertClickerParams,
  type InsertItemParams,
  type InsertUserParams,
};

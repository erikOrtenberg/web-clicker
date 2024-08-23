import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  count: integer("count").default(0),
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

type InsertClickerParams = typeof clickers.$inferInsert;
type InsertItemParams = typeof items.$inferInsert;
type InsertUserParams = typeof users.$inferInsert;

export {
  clickers,
  items,
  users,
  type InsertClickerParams,
  type InsertItemParams,
  type InsertUserParams,
};

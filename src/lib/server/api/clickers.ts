import { db } from "../db/client";
import { clickers, users, items, type InsertClickerParams } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export async function getClickersByUser(userId: number) {
  const result = await db
    .select()
    .from(clickers)
    .leftJoin(users, eq(clickers.user_id, users.id))
    .leftJoin(items, eq(clickers.item_id, items.id))
    .where(eq(clickers.user_id, userId));
  return result;
}

export async function getClickerById(id: number) {
  const result = await db
    .select()
    .from(clickers)
    .leftJoin(users, eq(clickers.user_id, users.id))
    .leftJoin(items, eq(clickers.item_id, items.id))
    .where(eq(clickers.id, id));
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export async function getClickers() {
  const result = await db
    .select()
    .from(clickers)
    .leftJoin(users, eq(clickers.user_id, users.id))
    .leftJoin(items, eq(clickers.item_id, items.id));
  return result;
}

export async function createClickerForUser(userId: number, itemId: number) {
  const clicker = { user_id: userId, item_id: itemId };

  const result = await db.insert(clickers).values(clicker);
  return result;
}

export async function updateClickerForUser(
  id: number,
  userId: number,
  itemId: number,
  clickNumber: number,
) {
  const clicker = { id: id, user_id: userId, item_id: itemId, click_number: clickNumber};

  const result = await db
    .update(clickers)
    .set(clicker)
    .where(eq(clickers.id, id));
  return result;
}

import { db } from '../db/client'
import { clickers, users, items, type InsertClickerParams } from '../db/schema' 
import { eq, lt, gte, ne, sql} from 'drizzle-orm';

export async function getClickersByUser ( userId: number ) {
  const result = await db
    .select()
    .from(clickers)
    .fullJoin(users, eq(clickers.user_id, users.id))
    .fullJoin(items, eq(clickers.item_id, items.id))
    .where(eq(clickers.user_id, userId));
  return result;
} 

export async function incClickerById ( clickerId: number ) {
  const result = await db 
    .update(clickers)
    .set({
      count: sql`${clickers.count} + 1`,
    })
    .where(eq(clickers.id, clickerId));
  return result;
}

export async function createClickerForUser ( userId: number, itemId: number ) {
  const clicker = {"user_id": userId, "item_id": itemId, "count": 0};

  const result = await db
    .insert(clickers)
    .values(clicker)
  return result;
} 


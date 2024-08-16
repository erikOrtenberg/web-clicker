import { db } from '../db/client'
import { items, type InsertItemParams } from '../db/schema' 
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function getItemByName ( name: string ) {
  const result = await db
    .select()
    .from(items)
    .where(eq(items.name, name));
  return result;
} 

export async function createItem ( name: string, price: number | undefined ) {
  const item = {"name": name, "price": price}
  const result = await db
    .insert(items)
    .values(item)
  console.log(result);
  return result;
} 

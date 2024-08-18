import { db } from '../db/client'
import { items, type InsertItemParams } from '../db/schema' 
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function getItemByName ( name: string ) {
  const result = await db
    .select()
    .from(items)
    .where(eq(items.name, name));
  if(result.length > 0){
    return result[0];
  }
  return undefined;
} 

export async function getItemById(id: number) {
  const result = await db
    .select()
    .from(items)
    .where(eq(items.id, id));
  if(result.length > 0){
    return result[0];
  }
  return undefined;
}

export async function getItems() {
  const result = await db
    .select()
    .from(items)
  return result
}

export async function createItem ( name: string, price: number | undefined, comment: string | undefined) {
  const item = {"name": name, "price": price, "comment": comment}
  const result = await db
    .insert(items)
    .values(item)
  return result;
} 

export async function updateItem ( id: number, name: string, price: number | undefined, comment: string | undefined) {
  const item = {"id": id, "name": name, "price": price, "comment": comment}
  const result = await db
    .update(items)
    .set(item)
    .where(eq(items.id, id))
  return result;
} 

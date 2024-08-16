import { db } from '../db/client'
import { users, type InsertUserParams } from '../db/schema' 
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function getUsers () {
  const result = await db
    .select()
    .from(users)
  return result
}

export async function getUserByName ( name: string ) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.name, name));
  console.log(result);
  return result;
} 

export async function createUser ( user: InsertUserParams ) {
  const result = await db
    .insert(users)
    .values(user)
  console.log(result);
  return result;
} 

export async function updateUser ( user: InsertUserParams ) {
  if(!user.id) {
    return -1;
  }
  const userId = Number(user.id) 
  const result = await db
    .update(users)
    .set(user)
    .where(eq(users.id, userId));
  return result;

}

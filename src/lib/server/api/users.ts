import { db } from '../db/client'
import { users, type InsertUserParams } from '../db/schema' 
import { eq, lt, gte, ne } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

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
  if(result.length > 0){
    return result[0];
  }
  return undefined
} 

export async function getUserById ( id: number ) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id));
  if(result.length > 0){
    return result[0];
  }
  return undefined
} 

export async function createUser ( username: string, password: string ) {
  const user = { name: username, password: await bcrypt.hash(password, 10)}
  console.log(user)
  const result = await db
    .insert(users)
    .values(user)
  console.log(result);
  return result;
} 

export async function updateUser (id: number, username: string, password: string ) {
  const user = {id: id, name: username, password: await bcrypt.hash(password, 10)}
  const result = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id));
  return result;

}

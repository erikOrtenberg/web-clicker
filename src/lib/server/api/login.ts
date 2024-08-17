import { db } from '../db/client'
import { users, type InsertUserParams } from '../db/schema' 
import { JWT_ACCESS_SECRET } from '$env/static/private';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq, lt, gte, ne, and } from 'drizzle-orm';

export async function loginUser (username: string, password: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.name, username))
  // Validate
  if(result.length != 1){
    return {error: "non unique user found"};
  }
  const user = result[0];
  const isValid = await bcrypt.compare(password, user.password);
  if(!isValid) {
    return {error: "invalid credentails"};
  }
  
  // Create JWT 
  const jwtUser = {
    id: user.id,
    name: user.name
  };
  const token = jwt.sign(jwtUser, JWT_ACCESS_SECRET, {
    expiresIn: '31d'
  })

  return {token: token};
}

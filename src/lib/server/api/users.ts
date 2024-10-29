import { db } from "../db/client";
import { users, type InsertUserParams } from "../db/schema";
import { eq } from "drizzle-orm";
import { default as bcrypt }from "bcryptjs";

export async function getUsers() {
  const result = await db.select().from(users);
  return result;
}

export async function getUserByName(name: string) {
  const result = await db.select().from(users).where(eq(users.name, name));
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export async function getUserById(id: number) {
  const result = await db.select().from(users).where(eq(users.id, id));
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export async function createUser(username: string, password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  const user = { name: username, password: hash };
  const result = await db.insert(users).values(user);
  return result;
}

export async function updateUser(
  id: number,
  username: string,
  password: string | undefined,
) {
  let user = {}
  if(!password){
    user = {
      id: id,
      name: username,
    };
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    user = {
      id: id,
      name: username,
      password: hash,
    };
  }
  const result = await db.update(users).set(user).where(eq(users.id, id));
  return result;
}

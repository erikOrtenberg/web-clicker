import { db } from "../db/client";
import { transactions, clickers, users, items, type InsertTransactionParams } from "../db/schema";
import { eq, sql } from "drizzle-orm";

export async function getTransactionsByClicker(clickerId: number) {
  const result = await db
    .select()
    .from(transactions)
    .leftJoin(clickers, eq(clickers.id, transactions.clicker_id))
    .where(eq(clickers.id, clickerId));
  return result;
}

export async function getTransactionsByUser(userId: number) {
  const result = await db
    .select()
    .from(transactions)
    .leftJoin(clickers, eq(clickers.id, transactions.clicker_id))
    .where(eq(clickers.user_id, userId));
  return result;
}

export async function getTransactionsById(id: number) {
  const result = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id));
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export async function getTransactions() {
  const result = await db
    .select()
    .from(transactions)
  return result;
}

export async function createTransactionForClicker(clickerId: number, count: number) {
  const transaction = {clicker_id: clickerId, count: count};
  const result = await db
    .insert(transactions).values(transaction);
  return result;
}

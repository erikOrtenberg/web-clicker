import { db } from "../db/client";
import { clickers } from "../db/schema";
import { createTransactionForClicker } from "../api/transactions";

const cs = await db
  .select()
  .from(clickers);

cs.forEach((clicker) => {
  console.log(clicker);
  createTransactionForClicker(clicker.id, clicker.count);
});

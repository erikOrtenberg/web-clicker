import { getTransactionsByClicker } from "$lib/server/api/transactions";
import {
  getClickersByUser,
} from "../../lib/server/api/clickers";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  if (!user) {
    throw error(401, { message: "You must be logged in" });
  }

  const clickers = await getClickersByUser(user.id);
  const clickerAndCount = await Promise.all(clickers.map(async clicker => {
    const transactions = await getTransactionsByClicker(clicker.clickers.id)
    const count = (transactions.map(t => t.transactions.count)).reduce((a,b) => a+b, 0)
    return {
      clickers: clicker.clickers,
      items: clicker.items,
      users: clicker.users,
      count: count,
    }
  }))
  const spendings = clickerAndCount.map(clicker => {
    return {
      name: clicker.items!.name,
      count: clicker.count,
      total: Number(clicker.count) * Number(clicker.items?.price)
    }
  });
  let count = 0
  let total = 0 
  clickerAndCount.forEach(clicker => {
    total += Number(clicker.items!.price) * Number(clicker.count);
    count += Number(clicker.count);
  })
  spendings.unshift({name: "Total", count: count, total: total})
  return {
    spendings: spendings,
  };
};


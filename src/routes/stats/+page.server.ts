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
  const spendings = clickers.map(clicker => {
    return {
      name: clicker.items!.name,
      count: clicker.clickers.count,
      total: Number(clicker.clickers.count) * Number(clicker.items?.price)
    }
  });
  let count = 0
  let total = 0 
  clickers.forEach(clicker => {
    total += Number(clicker.items!.price) * Number(clicker.clickers.count);
    count += Number(clicker.clickers.count);
  })
  spendings.unshift({name: "Total", count: count, total: total})
  return {
    spendings: spendings,
  };
};


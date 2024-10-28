import { createTransactionForClicker, getTransactionsByClicker } from "$lib/server/api/transactions";
import { clickers } from "$lib/server/db/schema";
import {
    getClickerById,
  getClickersByUser,
  updateClickerForUser,
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
  const clickerTransactions : any[]= [];
  clickers.forEach(async (clicker) => {
    const transactions = await getTransactionsByClicker(clicker.clickers.id)
    const count = transactions.map(element => {
      return element.transactions.count;
    }).reduce((a,b) => a+b, 0);
    clickerTransactions.push({
      clickers: clicker.clickers, 
      items: clicker.items, 
      users: clicker.users, 
      transactions: transactions,
      count: count,
      clickNumber: clicker.clickers.click_number
    });
  });
  return {
    clickers: clickerTransactions,
  };
};

export const actions = {
  updateClickNumber: async (event) => {
    if (!event.locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await event.request.formData();

    const clickerId = Number(data.get("clickerId"));
    const clickNumber = Number(data.get("clickNumber"));

    const clicker = await getClickerById(clickerId);
    if(!clicker || !clicker.users || clicker.users.id !== event.locals.user.id){
      error(401, "Supplied clicker ID is not associated with user")
    }

    updateClickerForUser(clicker.clickers.id, 
      event.locals.user.id, 
      clicker.items!.id, 
      clickNumber);
  },
  inc: async (event) => {
    if (!event.locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await event.request.formData();

    const clickerId = Number(data.get("clickerId"));
    const clickNumber = Number(data.get("clickNumber"));

    const clickers = await getClickersByUser(event.locals.user.id);
    const contains = clickers.map(clicker => clicker.clickers.id).includes(clickerId);
    if (!contains) {
      error(401, "Supplied clicker ID is not associated with user")
    }

    createTransactionForClicker(clickerId, clickNumber);
  },
  dec: async (event) => {
    if (!event.locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await event.request.formData();

    const clickerId = Number(data.get("clickerId"));

    const clickers = await getClickersByUser(event.locals.user.id);
    const contains = clickers.map(clicker => clicker.clickers.id).includes(clickerId);
    if (!contains) {
      error(401, "Supplied clicker ID is not associated with user")
    }
      
    createTransactionForClicker(clickerId, -1);
  },
} satisfies Actions;

import {
  decClickerById,
  getClickersByUser,
  incClickerById,
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
  return {
    clickers: clickers,
  };
};

export const actions = {
  inc: async (event) => {
    if (!event.locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await event.request.formData();

    const clickerId = Number(data.get("clickerId"));

    incClickerById(clickerId);
  },
  dec: async (event) => {
    if (!event.locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await event.request.formData();

    const clickerId = Number(data.get("clickerId"));

    decClickerById(clickerId);
  },
} satisfies Actions;

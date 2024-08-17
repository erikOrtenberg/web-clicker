import type { Actions } from './$types';
import { createItem } from '$lib/server/api/items'
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  console.log("in clickers: ", user)

  if(!user) {
    throw error(401, {message: "You must be logged in"})
  }
};

export const actions = {
	default: async (event) => {
    console.log("received action from api")
    const formdata = await event.request.formData();

    const name = String(formdata.get("name"));
    const price = Number(formdata.get("price"));

    createItem(name, price);
	},
} satisfies Actions;

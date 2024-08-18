import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createItem } from '$lib/server/api/items'

export const actions = {
	default: async ({request, locals}) => {
    if(!locals.user){
      error(401, "You must be logged in to use this resource")
    }
    const data = await request.formData();
    console.log(data)
    const name = data.get("name");
    const price = data.get("price");
    const comment = data.get("comment");

    if (!name) {
      error(404, {
        message: "Please provide a complete item. "
      });
    }
    const result = await createItem(String(name), Number(price), String(comment));

    if (!result) {
      error(404, {
        message: "Couldn't create item with params. "
      });
    }
    redirect(303, "/admin/items")
	},
} satisfies Actions;

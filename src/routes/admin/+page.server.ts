import type { Actions } from './$types';
import { createItem } from '$lib/server/api/items'

export const actions = {
	default: async (event) => {
    console.log("received action from api")
    const formdata = await event.request.formData();

    const name = String(formdata.get("name"));
    const price = Number(formdata.get("price"));

    createItem(name, price);
	},
} satisfies Actions;

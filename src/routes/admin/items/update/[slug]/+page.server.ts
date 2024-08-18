import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { getItemById, updateItem } from '$lib/server/api/items'

export const load: PageServerLoad = async ({ params }) => {
  const itemId = parseInt(params.slug)
  console.log(itemId)
  if(isNaN(itemId)) {
    error(400, {
      message: "slug is not a number"
    });
  }
  const item = await getItemById(itemId);
  if(!item) {
    error(400, {
      message: "item with id " + itemId + " doesn't exist"
    });
  }
  return {
    item: item
  }
};


export const actions = {
	default: async ({request, params, locals}) => {
    if(!locals.user){
      error(401, "You must be logged in to use this resource")
    }
    const itemId = parseInt(params.slug);
    if(isNaN(itemId)) {
      error(400, {
        message: "slug is not a number"
      });
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
    const result = await updateItem(itemId ,String(name), String(price), String(comment));

    if (!result) {
      error(404, {
        message: "Couldn't create item with params. "
      });
    }
    redirect(303, "/admin/items")
	},
} satisfies Actions;

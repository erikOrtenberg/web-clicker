import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { getClickerById, updateClickerForUser } from '$lib/server/api/clickers'

export const load: PageServerLoad = async ({ params }) => {
  const clickerId = parseInt(params.slug)
  console.log(clickerId)
  if(isNaN(clickerId)) {
    error(400, {
      message: "slug is not a number"
    });
  }
  const clicker = await getClickerById(clickerId);
  if(!clicker) {
    error(400, {
      message: "clicker with id " + clickerId + " doesn't exist"
    });
  }
  return {
    clicker: clicker
  }
};


export const actions = {
	default: async ({request, params}) => {
    const clickerId = parseInt(params.slug);
    if(isNaN(clickerId)) {
      error(400, {
        message: "slug is not a number"
      });
    }
    const data = await request.formData();
    const count = data.get("count");
    if(!count) {
      error(400, "you must provide a count")
    }
    if(isNaN(parseInt(String(count)))){
      error(400, "you must provide an integer")
    }
  
    const clicker = await getClickerById(clickerId)

    const result = await updateClickerForUser(clickerId , clicker!.users!.id, clicker!.items!.id, Number(count));

    if (!result) {
      error(404, {
        message: "Couldn't create clicker with params. "
      });
    }
    redirect(303, "/admin/clickers")
	},
} satisfies Actions;

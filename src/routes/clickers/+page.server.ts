import {getClickersByUser, incClickerById} from '../../lib/server/api/clickers'
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  console.log("in clickers: ", user)

  if(!user) {
    throw error(401, {message: "You must be logged in"})
  }

	const clickers = await getClickersByUser(user.id);
	return {
    clickers: clickers
	};
};

export const actions = {
	default: async (event) => {
    const data = await event.request.formData()

    const clickerId = Number(data.get("clickerId"))

    incClickerById(clickerId)
	},
} satisfies Actions;

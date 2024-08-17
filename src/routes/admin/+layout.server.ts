import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  console.log("in clickers: ", user)

  if(!user) {
    throw error(401, {message: "You must be logged in"})
  }
};

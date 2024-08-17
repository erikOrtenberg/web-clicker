import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  console.log("in root node user: ", user)
	return {
    user: user
	};
};


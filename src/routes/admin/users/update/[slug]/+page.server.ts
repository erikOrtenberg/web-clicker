import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { getUserById, updateUser } from '$lib/server/api/users'

export const load: PageServerLoad = async ({ params }) => {
  const userId = parseInt(params.slug)
  console.log(userId)
  if(isNaN(userId)) {
    error(400, {
      message: "slug is not a number"
    });
  }
  const user = await getUserById(userId);
  if(!user) {
    error(400, {
      message: "user with id " + userId + " doesn't exist"
    });
  }
  return {
    user: user
  }
};


export const actions = {
	default: async ({request, params, locals}) => {
    if(!locals.user){
      error(401, "You must be logged in to use this resource")
    }
    const userId = parseInt(params.slug);
    if(isNaN(userId)) {
      error(400, {
        message: "slug is not a number"
      });
    }
    

    const data = await request.formData();
    console.log(data)
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      error(404, {
        message: "Please provide a complete user. " + request.json()
      });
    }
    const result = await updateUser(userId ,String(name), String(password));

    if (!result) {
      error(404, {
        message: "Couldn't create user with params. " + request.json()
      });
    }
    redirect(303, "/admin/users")
	},
} satisfies Actions;

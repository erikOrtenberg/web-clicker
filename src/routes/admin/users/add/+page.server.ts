import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createUser } from '../../../../lib/server/api/users'

export const actions = {
	default: async ({request}) => {
    const data = await request.formData();
    console.log(data)
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      error(404, {
        message: "Please provide a complete user. " + request.json()
      });
    }
    const result = await createUser(String(name), String(password));

    if (!result) {
      error(404, {
        message: "Couldn't create user with params. " + request.json()
      });
    }
    redirect(303, "/admin/users")
	},
} satisfies Actions;

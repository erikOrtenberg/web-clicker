import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginUser } from '$lib/server/api/login'

export const actions = {
	default: async ({cookies, request}) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      fail(401, {
        message: "Invalid login credentials. "
      });
    }
    const {error, token} = await loginUser(String(name), String(password));

    if (!token) {
      fail(401, {
        message: "Invalid login credentials. "
      });
    }
    console.log("error: ", error)
    console.log("token: ", token)
    
    cookies.set('AuthorizationToken', `Bearer ${token}`, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 31 // 31 days
    });

    redirect(303, "/clickers")
	},
} satisfies Actions;

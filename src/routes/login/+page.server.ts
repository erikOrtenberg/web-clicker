import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginUser } from '$lib/server/api/login'

export const actions = {
	default: async ({cookies, request}) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      error(401, "Invalid login credentials. ");
    }
    const {loginError, token} = await loginUser(String(name), String(password));

    if (!token || typeof loginError === "string") {
      error(401, "Invalid login credentials. ");
    }
    
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

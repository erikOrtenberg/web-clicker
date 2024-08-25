import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { loginUser } from "$lib/server/api/login";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.user;
  if (user) {
    redirect(303, "/clickers")
  }
};


export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      error(401, "Invalid login credentials. ");
    }
    const { loginError, token } = await loginUser(
      String(name),
      String(password),
    );

    if (!token || typeof loginError === "string") {
      error(401, "Invalid login credentials. ");
    }

    cookies.set("AuthorizationToken", `Bearer ${token}`, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 31, // 31 days
    });

    redirect(303, "/clickers");
  },
} satisfies Actions;

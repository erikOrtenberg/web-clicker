import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  logout: async (event) => {
    event.cookies.delete("AuthorizationToken", {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 31, // 31 days
    });
    event.locals.user = undefined;
    console.log(event.locals);
    //redirect(302, "/")
  },
} satisfies Actions;

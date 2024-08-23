import type { Handle } from "@sveltejs/kit";
import { JWT_ACCESS_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

import { getUserById } from "$lib/server/api/users";

export const handle: Handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get("AuthorizationToken");

  if (authCookie) {
    // Remove Bearer prefix
    const token = authCookie.split(" ")[1];

    try {
      const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }

      const user = await getUserById(jwtUser.id);

      if (!user) {
        throw new Error("User not found");
      }

      const sessionUser = {
        id: user.id,
        name: user.name,
      };

      event.locals.user = sessionUser;
    } catch (error) {
      event.locals.user = undefined;
      console.error(error);
    }
  }
  return await resolve(event);
};

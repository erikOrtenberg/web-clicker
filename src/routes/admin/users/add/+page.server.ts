import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { createUser } from "$lib/server/api/users";
import { getItems } from "$lib/server/api/items";
import { createClickerForUser } from "$lib/server/api/clickers";

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const data = await request.formData();
    const name = data.get("name");
    const password = data.get("password");

    if (!name || !password) {
      error(404, {
        message: "Please provide a complete user. " + request.json(),
      });
    }
    //data good, Create user
    const result = await createUser(String(name), String(password));

    if (!result) {
      error(404, {
        message: "Couldn't create user with params. " + request.json(),
      });
    }
    // we have user, create all available clickers for them
    const items = await getItems();
    items.forEach(item => {
      createClickerForUser(result.lastInsertRowid, item.id);
    })
    

    redirect(303, "/admin/users");
  },
} satisfies Actions;

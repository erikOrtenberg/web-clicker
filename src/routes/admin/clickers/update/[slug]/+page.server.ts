import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { getClickerById, updateClickerForUser } from "$lib/server/api/clickers";

export const load: PageServerLoad = async ({ params }) => {
  const clickerId = parseInt(params.slug);
  if (isNaN(clickerId)) {
    error(400, {
      message: "slug is not a number",
    });
  }
  const clicker = await getClickerById(clickerId);
  if (!clicker) {
    error(400, {
      message: "clicker with id " + clickerId + " doesn't exist",
    });
  }
  return {
    clicker: clicker,
  };
};

export const actions = {
  default: async ({ request, params, locals }) => {
    if (!locals.user) {
      error(401, "You must be logged in to use this resource");
    }
    const clickerId = parseInt(params.slug);
    if (isNaN(clickerId)) {
      error(400, {
        message: "slug is not a number",
      });
    }
    const data = await request.formData();
    const clickNumber = data.get("click_number");
    if (!clickNumber) {
      error(400, "you must provide a count");
    }
    if (isNaN(parseInt(String(clickNumber)))) {
      error(400, "you must provide an integer");
    }

    const clicker = await getClickerById(clickerId);

    const result = await updateClickerForUser(
      clickerId,
      clicker!.users!.id,
      clicker!.items!.id,
      Number(clickNumber),
    );

    if (!result) {
      error(404, {
        message: "Couldn't create clicker with params. ",
      });
    }
    redirect(303, "/admin/clickers");
  },
} satisfies Actions;

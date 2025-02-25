import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { getClickerById, updateClickerForUser } from "$lib/server/api/clickers";
import { createTransactionForClicker } from "$lib/server/api/transactions";

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
    const customTransactionCount = data.get("custom_transaction_count");
    var parsedTransactionCount = 0
    if (!clickNumber) {
      error(400, "you must provide a count");
    }
    if (!customTransactionCount) {
    } else if (isNaN(parseInt(String(customTransactionCount)))){
      error(400, "you must provide an integer")
    }else {
      parsedTransactionCount = Number(customTransactionCount)
    }
    if (isNaN(parseInt(String(clickNumber)))) {
      error(400, "you must provide an integer");
    }

    const clicker = await getClickerById(clickerId);

    if(parsedTransactionCount != 0){
      const resultTransaction = await createTransactionForClicker(clickerId, parsedTransactionCount);

      if (!resultTransaction) {
        error(404, {
          message: "Couldn't create transaction with params. ",
        });
      }
    }

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

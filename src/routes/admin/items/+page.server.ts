import { getItems } from "$lib/server/api/items";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const items = await getItems();
  return {
    items: items,
  };
};

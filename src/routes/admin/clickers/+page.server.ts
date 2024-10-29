import { createClickerForUser, getClickers } from "$lib/server/api/clickers";
import { getItems } from "$lib/server/api/items";
import { getTransactionsByClicker } from "$lib/server/api/transactions";
import { getUsers } from "$lib/server/api/users";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const clickers = await getClickers();
  const users = await getUsers();
  const sortedClickers = clickers.sort((a: any, b: any) => {
    return a.users!.name.localeCompare(b.users!.name, "en");
  });
  const finalClickers = await Promise.all(sortedClickers.map(async clicker => {
    const transactions = await getTransactionsByClicker(clicker.clickers.id);
    const count = transactions.map(t => {return t.transactions.count}).reduce((a,b) => a + b , 0);
    return {clickers: clicker.clickers, items: clicker.items, users: clicker.users, count: count}
  }))
  const userOptions = users
    .map(user => {
      return {value: user.id, name: user.name}
    })
  return {
    clickers: finalClickers,
    users: userOptions
  };
};

export const actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) {
      error(401, "You must be authenticated to use this resource");
    }
    const clickers = await getClickers();
    const users = await getUsers();
    const items = await getItems();

    let unusedUserItemCombos: any[] = [];
    users.forEach((user) => {
      items.forEach((item) => {
        let alreadyExists: boolean = false;
        for (let i = 0; i < clickers.length; i++) {
          if (
            clickers[i].users!.id === user.id &&
            clickers[i].items!.id === item.id
          ) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          unusedUserItemCombos.push({ user: user.id, item: item.id });
        }
      });
    });

    unusedUserItemCombos.forEach(async (x) => {
      const result = await createClickerForUser(x.user, x.item);
      if (!result) {
        error(500, "oopsie");
      }
    });
  },
} satisfies Actions;

import {
  getUsers,
  createUser,
  updateUser,
} from "$lib/server/api/users";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const users = await getUsers();
  return {
    users: users,
  };
};

import {getClickersByUser, incClickerById} from '../../lib/server/api/clickers'
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const clickers = await getClickersByUser(1);
	return {
    clickers: clickers
	};
};

export const actions = {
	default: async (event) => {
    const data = await event.request.formData()

    const clickerId = Number(data.get("clickerId"))

    incClickerById(clickerId)
	},
} satisfies Actions;

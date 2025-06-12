import * as db from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await db.getUserFromSession(cookies.get('sessionid') ?? '');
	return { user };
};

export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const user = await db.createUser(email, password)

		cookies.set('sessionid', await db.createSession(email), { path: '/' });

		return { success: true };
	},
} satisfies Actions;
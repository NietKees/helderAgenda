// src/routes/account/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import * as db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('sessionid');
	if (!session) throw redirect(302, '/login');

	const user = await db.getUserFromSession(session);
	if (!user) throw redirect(302, '/login');

	return { user };
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('sessionid', { path: '/' });
		throw redirect(302, '/login');
	}
};

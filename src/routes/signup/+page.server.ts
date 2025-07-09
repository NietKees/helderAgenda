import * as db from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const user = await db.getUserFromSession(cookies.get('sessionid') ?? '');
	return { user };
};

export const actions = {
	signup: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}
		// Optional: check if user already exists
		const existing = await db.getUser(email);
		if (existing) {
			return fail(400, { exists: true });
		}

		await db.createUser(email, password);
		const session = await db.createSession(email);
		cookies.set('sessionid', session, { path: '/' });

		// Redirect to account or dashboard
		throw redirect(303, '/account');
	},
} satisfies Actions;
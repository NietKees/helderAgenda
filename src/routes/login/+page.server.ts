import * as db from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { goto } from '$app/navigation';

export const load = async ({ cookies }) => {
	const user = await db.getUserFromSession(cookies.get('sessionid') ?? '');
	// if (user) throw redirect(303, `/${user.id}`);
	return { user: user };
};


export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// const user =( await db.getUser(email))[0];
		// cookies.set('sessionid', await db.createSession(user.email), { path: '/' });

		if (!email) {
			return fail(400, { email, missing: true });
		}

		/** mock database **/
		if (email === 'admin@email.com' && password === 'password') {
			cookies.set('sessionid','adminSession', {path: '/'})
			const id = '1'
			console.log('login attempt')
			throw redirect(303, `/${id}`)
		}
		else return { success: false };

	},
	register: async (event) => {
		// TODO register the user
	}
} satisfies Actions;
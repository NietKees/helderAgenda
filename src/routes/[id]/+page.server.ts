import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as db from '$lib/server/db';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const sessionId = cookies.get('sessionid');
	const user = await db.getUserFromSession(sessionId ?? '');

	if (!user) {
		throw redirect(303, '/login');
	}

	if (params.id !== user.id.toString()) {
		// Optional: forbid access to other users' pages
		throw redirect(303, '/unauthorized'); // or show a 403
	}

	const agenda =  await db.getAgenda(user.id);
	console.log('before load', agenda);
	return {
		user,
		agenda // or similar
	};
};

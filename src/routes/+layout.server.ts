// src/routes/+layout.server.ts
import * as db from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('sessionid');
	const user = session ? await db.getUserFromSession(session) : null;

	return {
		user // this becomes available as `data.user` in layout and nested pages
	};
};

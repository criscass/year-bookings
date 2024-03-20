// src/hooks.server.ts
import { ENV } from '$lib/server/env';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: ENV.PUBLIC_SUPABASE_URL,
		supabaseKey: ENV.PUBLIC_SUPABASE_ANON_KEY,
		event
		// cookie setting for local dev
		// remove when pushing to production
		// cookieOptions: {
		// 	domain: '192.168.188.20',
		// 	path: '/',
		// 	sameSite: 'lax',
		// 	secure: false,
		// 	maxAge: 60 * 60 * 24 * 30
		// }
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
``;

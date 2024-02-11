import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { emailSchema, profileSchema, passwordSchema } from '$lib/schemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/login');
	}

	/**
	 * Prepolpulate the form fields with user informations
	 */

	/**
	 * This only gets the active user profile because of schema policy "Users can see own profile"
	 */
	async function getUserProfile() {
		const { error: profileError, data: profile } = await event.locals.supabase
			.from('profiles')
			.select('*')
			.limit(1)
			.single();

		if (profileError) {
			throw error(500, 'Error retrieving your profile, please try again.');
		}
		return profile;
	}

	return {
		profileForm: superValidate(await getUserProfile(), profileSchema, {
			id: 'profile'
		}),
		emailForm: superValidate({ email: session.user.email }, emailSchema, {
			id: 'email'
		}),
		passwordForm: superValidate(passwordSchema, {
			id: 'password'
		})
	};
};

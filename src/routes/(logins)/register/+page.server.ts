import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

const registerUserSchema = z.object({
	full_name: z
		.string()
		.max(140, 'Name must be 140 characters or less')
		.nullish(),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less'),
	password_confirm: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(64, 'Password must be 64 characters or less')
});

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(registerUserSchema);
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/calendar');
	}
	return { form };

	// alternative, from huntabyte course, not working properly
	// return {
	// 	form: superValidate(registerUserSchema)
	// };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerUserSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.password_confirm) {
			return setError(form, 'password_confirm', 'Passwords do not match');
		}

		const { error: authError } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					full_name: form.data.full_name ?? ''
				}
			}
		});

		if (authError) {
			return setError(form, null, 'An error occurred while registering.');
		}

		return {
			form
		};
	}
};

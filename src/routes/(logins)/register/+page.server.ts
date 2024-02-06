import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';

const registerUserSchema = z.object({
	full_name: z.string().min(6).max(140).nullish(),
	email: z.string().email(),
	password: z.string().min(6).max(100),
	password_confirm: z.string().min(6).max(100)
});

export const load: PageServerLoad = async (event) => {
	return {
		form: superValidate(registerUserSchema)
	};
};

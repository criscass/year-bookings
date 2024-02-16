import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/client';
import { createBookingSchema } from '$lib/schemas';
import { supabaseAdmin } from '$lib/server/supabase-admin';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/login');
	}
	async function getBookings() {
		const { data: bookings, error: bookingsError } = await event.locals.supabase
			.from('bookings')
			.select('*');

		if (bookingsError) {
			throw error(500, 'Error fetching bookings, please try again later.');
		}
		return bookings;
	}

	return {
		createBookingForm: await superValidate(createBookingSchema),
		bookings: await getBookings()
	};
};

export const actions: Actions = {
	createBooking: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const createBookingForm = await superValidate(event, createBookingSchema);
		console.log('createBookingForm.data :', createBookingForm.data);

		if (!createBookingForm.valid) {
			return fail(400, {
				createBookingForm
			});
		}

		const { error: createBookingError } = await supabaseAdmin
			.from('bookings')
			.insert({
				...createBookingForm.data,
				user_id: session.user.id
			});

		if (createBookingError) {
			console.log(createBookingError);
			return setError(createBookingForm, null, 'Error creating contact.');
		}

		return {
			createBookingForm
		};
	}
};

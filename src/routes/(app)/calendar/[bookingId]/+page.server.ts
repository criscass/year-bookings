import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { createBookingSchema } from '$lib/schemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, '/login');
	}

	async function getBooking(booking_id: string) {
		const { error: bookingError, data: booking } = await event.locals.supabase
			.from('bookings')
			.select('*')
			.eq('id', booking_id)
			.limit(1)
			.maybeSingle();

		if (bookingError) {
			throw error(500, 'Error fetching bookings. Please try again later.');
		}
		if (!booking) {
			throw error(404, 'Booking not found.');
		}
		return booking;
	}

	return {
		updateBookingForm: superValidate(
			await getBooking(event.params.bookingId),
			createBookingSchema
		)
	};
};

export const actions: Actions = {
	updateBooking: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const updateBookingForm = await superValidate(event, createBookingSchema);

		if (!updateBookingForm.valid) {
			return fail(400, {
				updateBookingForm
			});
		}

		const { error: updateBookingError } = await event.locals.supabase
			.from('bookings')
			.update(updateBookingForm.data)
			.eq('id', event.params.bookingId);

		if (updateBookingError) {
			return setError(
				updateBookingForm,
				null,
				'Error updating booking, please try again later.'
			);
		}

		return {
			updateBookingForm
		};
	}
};

import { getBookings, addBooking } from '../lib/server/database';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session) {
		throw redirect(302, '/calendar');
	}
	const bookings = getBookings();
	return { bookings: bookings };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const bookingName = String(data.get('bookingName'));
		const checkInDate = String(data.get('check-in'));
		const checkOutDate = String(data.get('check-out'));
		const bookingColor = String(data.get('bookingColor'));
		const newBooking: Booking = {
			id: crypto.randomUUID(),
			name: bookingName,
			startOnDay: new Date(checkInDate),
			endOnDay: new Date(checkOutDate),
			color: bookingColor
		};

		addBooking(newBooking);

		return { success: true };
	}
};

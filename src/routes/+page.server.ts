import * as db from '../lib/server/database';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	const data = db.getBookings();

	return { bookings: data };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const bookingName = String(data.get('bookingName'));
		const checkInDate = String(data.get('check-in'));
		const checkOutDate = String(data.get('check-out'));
		const newBooking: newBooking = {
			id: Date.now(),
			name: bookingName,
			startOnDay: new Date(checkInDate),
			endOnDay: new Date(checkOutDate),
			color: 'border-b-4 border-success-600'
		};

		db.addBooking(newBooking);
		return { success: true };
	}
};

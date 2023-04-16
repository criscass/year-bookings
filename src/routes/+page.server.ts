import * as db from '../lib/server/database';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const bookingName = String(data.get('bookingName'));
		const newBooking: newBooking = {
			id: 5,
			name: bookingName,
			startOnDay: new Date(2023, 4, 10),
			endOnDay: new Date(2023, 4, 20),
			color: 'yellow'
		};
		db.addBooking(newBooking);
	}
};

export const load: PageServerLoad = async function () {
	const data = db.getBookings();
	return { bookings: data };
};

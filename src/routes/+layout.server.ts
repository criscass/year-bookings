import { getBookings } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const bookings = getBookings();
	return { bookings };
}) satisfies LayoutServerLoad;

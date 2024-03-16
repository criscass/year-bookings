import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/client';
import {
	createBookingSchema,
	editBookingSchema,
	deleteBookingSchema
} from '$lib/schemas';

export const load: LayoutServerLoad = async (event) => {
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

	async function getProperties() {
		const { data: properties, error: propertiesError } =
			await event.locals.supabase.from('properties').select('*');

		if (propertiesError) {
			throw error(500, 'Error fetching properties, please try again later.');
		}
		return properties;
	}

	async function getUserProfile() {
		const { data: profile, error: profileError } = await event.locals.supabase
			.from('profiles')
			.select('*');

		if (profileError) {
			throw error(500, 'Error fetching bookings, please try again later.');
		}
		return profile;
	}

	return {
		createBookingForm: await superValidate(createBookingSchema, {
			id: 'create'
		}),
		bookings: await getBookings(),
		properties: await getProperties(),
		profile: await getUserProfile(),
		deleteBookingForm: await superValidate(deleteBookingSchema, {
			id: 'delete'
		}),
		editBookingForm: await superValidate(editBookingSchema, {
			id: 'edit'
		})
	};
};

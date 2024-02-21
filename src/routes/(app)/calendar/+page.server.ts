import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/client';
import {
	createBookingSchema,
	editBookingSchema,
	deleteBookingSchema
} from '$lib/schemas';
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
		profile: await getUserProfile(),
		deleteBookingForm: await superValidate(deleteBookingSchema, {
			id: 'delete'
		}),
		editBookingForm: await superValidate(editBookingSchema, {
			id: 'edit'
		})
	};
};

export const actions: Actions = {
	createBooking: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const createBookingForm = await superValidate(event, createBookingSchema, {
			id: 'create'
		});

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
	},

	updateBooking: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const updateBookingForm = await superValidate(event, editBookingSchema, {
			id: 'edit'
		});

		if (!updateBookingForm.valid) {
			return fail(400, {
				updateBookingForm
			});
		}

		const { error: updateBookingError } = await event.locals.supabase
			.from('bookings')
			.update({
				guest_name: updateBookingForm.data.guest_name,
				start_on_day: updateBookingForm.data.start_on_day,
				end_on_day: updateBookingForm.data.end_on_day,
				color: updateBookingForm.data.color
			})
			.eq('id', updateBookingForm.data.booking_id);

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
	},

	deleteBooking: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const deleteBookingForm = await superValidate(event, deleteBookingSchema, {
			id: 'delete'
		});

		if (!deleteBookingForm.valid) {
			return fail(400, {
				deleteBookingForm
			});
		}

		const { error: deleteBookingError } = await event.locals.supabase
			.from('bookings')
			.delete()
			.eq('id', deleteBookingForm.data.delete_booking_id);

		if (deleteBookingError) {
			return setError(deleteBookingForm, null, 'Error deleting booking');
		}

		return {
			deleteBookingForm
		};
	}
};

import { z } from 'zod';

/**
 * Register Form Schema
 */
export const registerUserSchema = z.object({
	full_name: z
		.string()
		.min(2, 'Password must be at least 2 characters')
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

/**
 * Account Settings - Change Name Form Schema
 */
export const profileSchema = registerUserSchema.pick({
	full_name: true
});
export type ProfileSchema = typeof profileSchema;

/**
 * Account Settings - Change Password Form Schema
 */
export const passwordSchema = registerUserSchema.pick({
	password: true,
	password_confirm: true
});
export type PasswordSchema = typeof passwordSchema;

/**
 * Account Settings - Change email Form Schema
 */
export const emailSchema = registerUserSchema.pick({ email: true });
export type EmailSchema = typeof emailSchema;

/**
 * Login Form Schema
 */
export const loginUserSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(1, 'Please enter a password')
});
export type LoginUserSchema = typeof loginUserSchema;

/**
 * Create Booking Form Schema
 */
export const createBookingSchema = z.object({
	guest_name: z
		.string()
		.min(2, 'The guest name should be at least 2 characters')
		.max(28, 'The guest name cannot exceed 28 characters'),
	start_on_day: z.string().min(1, 'Please enter a check-in date'),
	end_on_day: z.string().min(1, 'Please enter a check-out date'),
	color: z.string().min(1, 'Please choose a color')
});
export type CreateBookingSchema = typeof createBookingSchema;

/**
 * Edit Booking Form Schema
 */
export const editBookingSchema = z.object({
	booking_id: z.number(),
	guest_name: z
		.string()
		.min(2, 'The guest name should be at least 2 characters')
		.max(28, 'The guest name cannot exceed 28 characters'),
	start_on_day: z.string().min(1, 'Please enter a check-in date'),
	end_on_day: z.string().min(1, 'Please enter a check-out date'),
	color: z.string().min(1, 'Please choose a color')
});
export type EditBookingSchema = typeof editBookingSchema;

/**
 * Delete Booking Form Schema
 */
export const deleteBookingSchema = z.object({
	delete_booking_id: z.string()
});

export type DeleteBookingSchema = typeof deleteBookingSchema;

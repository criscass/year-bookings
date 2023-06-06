import { z } from 'zod';

export const BookingSchema = z.object({
	bookingName: z.string(),
	checkIn: z.string(),
	checkOut: z.string(),
	bookingColor: z.string()
});
export type BookingSchema = typeof BookingSchema;

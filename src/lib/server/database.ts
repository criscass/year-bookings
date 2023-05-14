let bookings: Booking[] = [
	{
		id: crypto.randomUUID(),
		name: 'Mr White',
		startOnDay: new Date(2023, 2, 21),
		endOnDay: new Date(2023, 2, 29),
		color: 'primary'
	},
	{
		id: crypto.randomUUID(),
		name: 'Mr Green',
		startOnDay: new Date(2023, 2, 12),
		endOnDay: new Date(2023, 2, 21),
		color: 'secondary'
	},
	{
		id: crypto.randomUUID(),
		name: 'Mr Pink',
		startOnDay: new Date(2023, 3, 2),
		endOnDay: new Date(2023, 3, 12),
		color: 'tertiary'
	}
];

export function getBookings() {
	return bookings;
}

export function addBooking(newBooking: Booking) {
	bookings = [...bookings, newBooking];
}

export function removeBooking(id: string) {
	bookings = bookings.filter((booking) => booking.id !== id);
}

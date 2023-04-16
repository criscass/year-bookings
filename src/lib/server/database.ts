let bookings: booking[] = [
	{
		id: 1,
		name: 'Mr White',
		startOnDay: new Date(2023, 2, 21),
		endOnDay: new Date(2023, 2, 29),
		color: 'border-b-4 border-success-600'
	},
	{
		id: 2,
		name: 'Mr Green',
		startOnDay: new Date(2023, 2, 12),
		endOnDay: new Date(2023, 2, 21),
		color: 'border-b-4 border-error-600'
	}
];

export function getBookings() {
	return bookings;
}

export function addBooking(newBooking: newBooking) {
	bookings = [...bookings, newBooking];
}

export function removeBooking(id: number) {
	bookings = bookings.filter((booking) => booking.id !== id);
}

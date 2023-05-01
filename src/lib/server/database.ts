let bookings: booking[] = [
	{
		id: 1,
		name: 'Mr White',
		startOnDay: new Date(2023, 2, 21),
		endOnDay: new Date(2023, 2, 29),
		color: 'primary'
	},
	{
		id: 2,
		name: 'Mr Green',
		startOnDay: new Date(2023, 2, 12),
		endOnDay: new Date(2023, 2, 21),
		color: 'secondary'
	},
	{
		id: 3,
		name: 'Mr Pink',
		startOnDay: new Date(2023, 3, 2),
		endOnDay: new Date(2023, 3, 12),
		color: 'tertiary'
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

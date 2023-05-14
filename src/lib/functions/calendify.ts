//*************************************************************/
// Calendify creates a month, which consists of
// an array of weeks arrays.
// Each week array contains either a number
// ( at the beginning or at the end of the month, representing the first or last days
// of the week that belong to the previous or next month ) or an object of type Day,
//  ( representing a day ) which contains all needed informations for unbooked
// and booked days
//*************************************************************/

export default function (target: Date, bookings: Booking[]) {
	let i = 0;
	let j = 0;
	let week: (Day | number)[] = [];
	const out: (Day | number)[][] = [];
	const date = new Date(target || new Date());
	const year = date.getFullYear();
	const month = date.getMonth();

	// day index (of week) for 1st of month
	// 0 = sunday ...and 6 = saturday
	let first = new Date(year, month, 1).getDay();

	// amount of days  in the month
	const days = new Date(year, month + 1, 0).getDate();

	while (i < days) {
		for (j = 0, week = Array(7); j < 7; ) {
			while (j < first) week[j++] = 0;

			if (++i > days) {
				week[j++] = 0;
			} else {
				// todayBookings would rappresent the eventual bookings for the day
				// if there is no booking it's an empty []
				const today = new Date(year, month, i);
				const todayBookings: Booking[] = bookings.filter(
					(booking) =>
						booking.startOnDay.valueOf() <= today.valueOf() &&
						today.valueOf() <= booking.endOnDay.valueOf()
				);
				if (todayBookings.length === 1) {
					week[j++] = {
						dayNumber: i,
						color1: todayBookings[0].color,
						isBooked: true,
						name1: todayBookings[0].name,
						startOnDay: todayBookings[0].startOnDay,
						endOnDay: todayBookings[0].endOnDay
					};
				} else if (todayBookings.length === 2) {
					week[j++] = {
						dayNumber: i,
						color1: todayBookings[0].color,
						color2: todayBookings[1].color,
						isBooked: true,
						name1: todayBookings[0].name,
						name2: todayBookings[1].name,
						startOnDay: todayBookings[0].startOnDay,
						endOnDay: todayBookings[0].endOnDay
					};
				} else {
					week[j++] = {
						dayNumber: i,
						isBooked: false
					};
				}
			}
			first = 0;
		}
		out.push(week);
	}

	return out;
}

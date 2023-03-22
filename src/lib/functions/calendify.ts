// returns an array of weeks arrays
export default function (target: Date, bookings: booking[]) {
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

	// amount of days  in this month
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
				const todayBookings: booking[] = bookings.filter(
					(booking) =>
						booking.startOnDay.valueOf() <= today.valueOf() &&
						today.valueOf() <= booking.endOnDay.valueOf()
				);
				if (todayBookings.length != 0) {
					week[j++] = {
						dayNumber: i,
						color1: todayBookings[0].color,
						color2: '',
						isBooked: true
					};
				} else {
					week[j++] = {
						dayNumber: i,
						color1: '',
						color2: '',
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

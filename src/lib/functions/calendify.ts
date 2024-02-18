//*************************************************************/
// Calendify creates a month, which consists of
// an array of weeks arrays.
// Each week array contains either a number
// ( at the beginning or at the end of the month, representing the first or last days
// of the week that belong to the previous or next month ) or an object of type Day,
//  ( representing a day ) which contains all needed informations for unbooked
// and booked days
//*************************************************************/

type Day =
	| {
			dayNumber: number;
			color1?: string;
			color2?: string;
			isBooked: boolean;
			name1?: string;
			name2?: string;
			start_on_day?: string;
			end_on_day?: string;
			booking_id?: number;
			booking_id2?: number;
	  }
	| number;

function getDateTimestamp(datestring: string) {
	const dateObj = new Date(datestring);
	dateObj.setHours(0, 0, 0, 0);

	return dateObj.getTime();
}

export default function (target: Date, bookings: any) {
	let i = 0;
	let j = 0;
	let week: (Day | number)[] = [];
	const out: (Day | number)[][] = [];
	const date = new Date(target || new Date());
	const year = date.getFullYear();
	const month = date.getMonth();

	// get the timestamp disregarding the time of the day, to avoid timezone problems

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
				const today = getDateTimestamp(`${year}-${month + 1}-${i}`);

				const todayBookings = bookings.filter((booking: any) => {
					const start = getDateTimestamp(booking.start_on_day);
					const end = getDateTimestamp(booking.end_on_day);

					return (
						start.valueOf() <= today.valueOf() &&
						today.valueOf() <= end.valueOf()
					);
				});

				if (todayBookings.length === 1) {
					week[j++] = {
						dayNumber: i,
						color1: todayBookings[0].color,
						isBooked: true,
						name1: todayBookings[0].guest_name,
						start_on_day: todayBookings[0].start_on_day,
						end_on_day: todayBookings[0].end_on_day,
						booking_id: todayBookings[0].id
					};
				} else if (todayBookings.length === 2) {
					week[j++] = {
						dayNumber: i,
						color1: todayBookings[0].color,
						color2: todayBookings[1].color,
						isBooked: true,
						name1: todayBookings[0].guest_name,
						name2: todayBookings[1].guest_name,
						start_on_day: todayBookings[0].start_on_day,
						end_on_day: todayBookings[0].end_on_day,
						booking_id: todayBookings[0].id,
						booking_id2: todayBookings[1].id
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

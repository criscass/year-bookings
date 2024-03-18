//*************************************************************/
// Calendify takes a date and the bookings, and creates a month, which consists of
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
			color1?: string; // Primary booking color
			color2?: string; // Secondary booking color (if there are two bookings)
			isBooked: boolean;
			name1?: string; // Name of the first guest
			name2?: string; // Name of the second guest
			start_on_day?: string; // Start date of the booking
			end_on_day?: string; // End date of the booking
			booking_id?: number; // ID of the first booking
			booking_id2?: number; // ID of the second booking
	  }
	| number;

// get the timestamp disregarding the time of the day, to avoid timezone problems
function getDateTimestamp(datestring: string) {
	const dateObj = new Date(datestring);
	dateObj.setHours(0, 0, 0, 0);

	return dateObj.getTime();
}

export default function calendify(target: Date, bookings: any) {
	let currentDateIndex = 0;
	let currentWeekIndex = 0;
	let currentWeek: (Day | number)[] = [];
	const calendarMonth: (Day | number)[][] = [];
	const targetDate = new Date(target || new Date());
	const targetYear = targetDate.getFullYear();
	const targetMonth = targetDate.getMonth();

	// day index (of week) for 1st of month
	// 0 = sunday ...and 6 = saturday
	let firstDayOfMonth = new Date(targetYear, targetMonth, 1).getDay();

	// amount of days  in the month
	const totalDaysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

	// Build the calendar
	while (currentDateIndex < totalDaysInMonth) {
		// Reset and initialize week at the start of each iteration
		for (currentWeekIndex = 0, currentWeek = Array(7); currentWeekIndex < 7; ) {
			// Fill initial days from the previous month
			while (currentWeekIndex < firstDayOfMonth)
				currentWeek[currentWeekIndex++] = 0;

			if (++currentDateIndex > totalDaysInMonth) {
				currentWeek[currentWeekIndex++] = 0;
			} else {
				// Create timestamp for the current day, ignoring time components
				const today = getDateTimestamp(
					`${targetYear}-${(targetMonth + 1)
						.toString()
						.padStart(2, '0')}-${currentDateIndex.toString().padStart(2, '0')}`
				);

				// bookingsForDay would rappresent the eventual bookings for the day
				// if there is no booking it's an empty []
				const bookingsForDay = bookings.filter((booking: any) => {
					const start = getDateTimestamp(booking.start_on_day);
					const end = getDateTimestamp(booking.end_on_day);

					return (
						start.valueOf() <= today.valueOf() &&
						today.valueOf() <= end.valueOf()
					);
				});

				if (bookingsForDay.length === 1) {
					currentWeek[currentWeekIndex++] = {
						dayNumber: currentDateIndex,
						color1: bookingsForDay[0].color,
						isBooked: true,
						name1: bookingsForDay[0].guest_name,
						start_on_day: bookingsForDay[0].start_on_day,
						end_on_day: bookingsForDay[0].end_on_day,
						booking_id: bookingsForDay[0].id
					};
				} else if (bookingsForDay.length === 2) {
					currentWeek[currentWeekIndex++] = {
						dayNumber: currentDateIndex,
						color1: bookingsForDay[0].color,
						color2: bookingsForDay[1].color,
						isBooked: true,
						name1: bookingsForDay[0].guest_name,
						name2: bookingsForDay[1].guest_name,
						start_on_day: bookingsForDay[0].start_on_day,
						end_on_day: bookingsForDay[0].end_on_day,
						booking_id: bookingsForDay[0].id,
						booking_id2: bookingsForDay[1].id
					};
				} else {
					currentWeek[currentWeekIndex++] = {
						dayNumber: currentDateIndex,
						isBooked: false
					};
				}
			}
			firstDayOfMonth = 0;
		}
		calendarMonth.push(currentWeek);
	}

	return calendarMonth;
}

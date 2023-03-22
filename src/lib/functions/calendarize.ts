// returns an array of weeks arrays
export default function (target: Date) {
	let i = 0;
	let j = 0;
	let week: (Day | number)[] = [];
	const out: (Day | number)[][] = [];
	const date = new Date(target || new Date());
	const year = date.getFullYear();
	const month = date.getMonth();

	// day index (of week) for 1st of month
	let first = new Date(year, month, 1).getDay();

	// amount of days  in this month
	const days = new Date(year, month + 1, 0).getDate();

	while (i < days) {
		for (j = 0, week = Array(7); j < 7; ) {
			while (j < first) week[j++] = 0;
			week[j++] =
				++i > days
					? 0
					: {
							dayNumber: i,
							color: '',
							isBooked: false
					  };
			first = 0;
		}
		out.push(week);
	}

	return out;
}

// returns an array of weeks arrays
export default function (target: Date, offset: number) {
	let i = 0;
	let j = 0;
	let week: number[] = [];
	const out: number[][] = [];
	const date = new Date(target || new Date());
	const year = date.getFullYear();
	const month = date.getMonth();

	// day index (of week) for 1st of month
	let first = new Date(year, month, 1 - (offset | 0)).getDay();

	// how many days there are in this month
	const days = new Date(year, month + 1, 0).getDate();

	while (i < days) {
		for (j = 0, week = Array(7); j < 7; ) {
			while (j < first) week[j++] = 0;
			week[j++] = ++i > days ? 0 : i;
			first = 0;
		}
		out.push(week);
	}

	return out;
}

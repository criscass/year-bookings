<script lang="ts">
	import calendarize from '$lib/functions/calendarize';

	import { year } from '../stores/store';
	export let month = 0; //Jan
	export let offset = 0; // Sun
	export let today: Date | null = null; // Todays Date
	export let today_day = 0;
	export let today_year = 0;
	export let today_month = 0;

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// prettier-ignore
	export const months = [ 'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'
	];

	// Month array for prev, current and next month
	let prev = calendarize(new Date($year, month - 1), offset);
	let current = calendarize(new Date($year, month), offset);
	let next = calendarize(new Date($year, month + 1), offset);

	//  **********************************************************

	// Functions for previous or next month buttons
	// function toPrev() {
	// 	[current, next] = [prev, current];

	// 	if (--month < 0) {
	// 		month = 11;
	// 		year--;
	// 	}

	// 	prev = calendarize(new Date(year, month - 1), offset);
	// }

	// function toNext() {
	// 	[prev, current] = [current, next];

	// 	if (++month > 11) {
	// 		month = 0;
	// 		year++;
	// 	}

	// 	next = calendarize(new Date(year, month + 1), offset);
	// }
	//  **********************************************************

	// Returns true if year, month and day corrisponds to todays date
	function isToday(day: number) {
		return today && today_year === $year && today_month === month && today_day === day;
	}
</script>

<div class="card variant-soft pb-4 pt-2 px-8">
	<header class="card-header pt-2 mb-2">
		<h4 class="unstyled text-2xl">{months[month]}</h4>
	</header>

	<section class="grid grid-cols-7 gap-4 text-lg text-center">
		{#each labels as txt, idx (txt)}
			<span>{labels[(idx + offset) % 7]}</span>
		{/each}

		{#each { length: 6 } as w, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as d, idxd (idxd)}
					{#if current[idxw][idxd] != 0}
						<span>
							{current[idxw][idxd]}
						</span>
					{:else if idxw < 1}
						<span>{prev[prev.length - 1][idxd]}</span>
					{:else}
						<span>{next[0][idxd]}</span>
					{/if}
				{/each}
			{/if}
		{/each}
	</section>
</div>

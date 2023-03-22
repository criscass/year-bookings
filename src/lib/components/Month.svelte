<script lang="ts">
	import calendify from '$lib/functions/calendify';
	// import { onMount } from 'svelte';

	import { year, bookings } from '../stores/store';
	export let month = 0; //Jan
	export let today: Date | null = null; // Todays Date
	export let today_day = 0;
	export let today_year = 0;
	export let today_month = 0;

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// prettier-ignore
	export const months = [ 'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'
	];

	// Month array for prev, current and next month
	$: prev = calendify(new Date($year, month - 1), $bookings);
	$: current = calendify(new Date($year, month), $bookings);
	$: next = calendify(new Date($year, month + 1), $bookings);

	// onMount(() => {
	// 	console.log(current);
	// });

	// Returns true if year, month and day corrisponds to todays date
	function isToday(day: number) {
		return today && today_year === $year && today_month === month && today_day === day;
	}
</script>

<div class="card variant-soft py-4 px-4">
	<header class="card-header pt-2 mb-2">
		<h4 class="unstyled text-2xl">{months[month]}</h4>
	</header>

	<section class="grid grid-cols-7 gap-4 text-lg text-center">
		<!-- Renders the week days labels array-->
		{#each labels as txt, idx (txt)}
			<span>{labels[idx % 7]}</span>
		{/each}
		<!-- Renders the Days Array-->
		{#each { length: 6 } as w, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as d, idxd (idxd)}
					<!-- {#if current[idxw][idxd] != 0} -->

					{@const day = current[idxw][idxd]}
					{#if typeof day === 'object'}
						<span class={day.color1 === '' ? '' : day.color1}>
							{day.dayNumber}
						</span>
					{:else if idxw < 1}
						{@const prevDay = prev[prev.length - 1][idxd]}
						{#if typeof prevDay === 'object'}
							<span class="opacity-0">{prevDay.dayNumber}</span>
						{/if}
					{:else}
						{@const nexDay = next[0][idxd]}
						{#if typeof nexDay === 'object'}
							<span class="opacity-0">{nexDay.dayNumber}</span>
						{/if}
					{/if}
				{/each}
			{/if}
		{/each}
	</section>
</div>

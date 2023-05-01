<script lang="ts">
	import calendify from '$lib/functions/calendify';
	import type { PageData } from '../../routes/$types';
	// import { onMount } from 'svelte';

	import {
		year,
		pickedCheckInDate,
		pickedCheckOutDate,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus
	} from '../stores/store';

	// import { onMount } from 'svelte';
	export let month = 0; //Jan
	export let today: Date | null = null; // Todays Date
	export let today_day = 0;
	export let today_year = 0;
	export let today_month = 0;
	export let data: PageData;

	let bookings = data.bookings;

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// prettier-ignore
	export const months = [ 'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'
	];

	// SkeletonUI colors for border bottom bookings display
	const borderColor: BorderColor = {
		primary: 'border-b-4 border-primary-500',
		primaryToken: 'border-b-4 border-primary-800-100-token',
		secondary: 'border-b-4 border-secondary-500',
		secondaryToken: 'border-b-4 border-secondary-800-100-token',
		tertiary: 'border-b-4 border-tertiary-500',
		success: 'border-b-4 border-success-500',
		warning: 'border-b-4 border-warning-500',
		error: 'border-b-4 border-error-500',
		surface: 'border-b-4 border-surface-500'
	};

	// Month array for prev, current and next month
	$: prev = calendify(new Date($year, month - 1), bookings);
	$: current = calendify(new Date($year, month), bookings);
	$: next = calendify(new Date($year, month + 1), bookings);

	// onMount(() => {
	// 	console.log(bookings);
	// });

	// Returns true if year, month and day corrisponds to todays date
	function isToday(day: number) {
		return (
			today &&
			today_year === $year &&
			today_month === month &&
			today_day === day
		);
	}
	// Updates the pickedDate store variable
	function dayPicked(year: number, month: number, day: number | Day) {
		if ($checkInInputIsOnFocus) {
			$pickedCheckInDate = `${months[month]} ${day}, ${year}`;
			$checkInInputIsOnFocus = false;
		}
		if ($checkOutInputIsOnFocus) {
			$pickedCheckOutDate = `${months[month]} ${day}, ${year}`;
			$checkOutInputIsOnFocus = false;
		}
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
				{#each { length: 7 } as _, idxd (idxd)}
					{@const day = current[idxw][idxd]}
					{#if typeof day === 'object'}
						<div
							on:click={() => {
								$isEditable ? dayPicked($year, month, day.dayNumber) : null;
							}}
							on:keydown={() => {
								$isEditable ? dayPicked($year, month, day.dayNumber) : null;
							}}
							class:day={$isEditable}
						>
							<span>
								{day.dayNumber}
							</span>
							{#if day.color2 != ''}
								<div class="grid grid-cols-2">
									<div class={`${borderColor[`${day.color2}`]}`} />
									<div class={`${borderColor[`${day.color1}`]}`} />
								</div>
							{:else if day.color2 === ''}
								<div
									class={day.color1 === ''
										? ''
										: `${borderColor[`${day.color1}`]}`}
								/>
							{/if}
						</div>
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

<style>
	.day {
		cursor: pointer;
	}
	.day:hover {
		transform: scale(1.2);
		color: white;
	}
</style>

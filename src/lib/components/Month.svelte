<script lang="ts">
	import calendify from '$lib/functions/calendify';
	import type { PageData } from '../../routes/$types';
	import {
		formStatus,
		isEditable,
		isEditable2,
		borderColor
	} from '../stores/store';

	import { onMount } from 'svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	interface BorderColorString {
		primary: string;
		primaryToken: string;
		secondary: string;
		secondaryToken: string;
		tertiary: string;
		success: string;
		warning: string;
		error: string;
		surface: string;
	}

	import { year } from '../stores/store';
	import { redirect } from '@sveltejs/kit';

	export let month = 0; //Jan

	export let data: PageData;

	$: bookings = data.bookings;

	let tooltipMessage: string = '';

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// prettier-ignore
	export const months = [ 'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'
	];

	// SkeletonUI colors for border bottom bookings display
	const borderColorString: BorderColorString = {
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

	// Turns a date object into a formatted string
	function formatDateString(dateString: string) {
		const dateObj = new Date(dateString);

		if (isNaN(dateObj.getTime())) {
			return 'Invalid Date';
		}

		const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
		const monthName = dateObj.toLocaleDateString('en-US', monthOptions);
		const day = dateObj.getDate() + getDayOrdinalSuffix(dateObj.getDate());

		return `${monthName} ${day}`;
	}

	// Helper function to get the ordinal suffix
	function getDayOrdinalSuffix(day: number) {
		if (day > 3 && day < 21) return 'th';
		switch (day % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}
	function handleEditClick(
		name: string,
		start_on_day: string,
		end_on_day: string,
		color: string,
		id: number
	) {
		$isEditable = false;
		$formStatus.name = name;
		$formStatus.start_on_day = start_on_day;
		$formStatus.end_on_day = end_on_day;
		$borderColor = color;
		$isEditable2 = true;
		$formStatus.booking_id = id;
	}

	// Month array for prev, current and next month
	$: prev = calendify(new Date($year, month - 1), bookings);
	$: current = calendify(new Date($year, month), bookings);
	$: next = calendify(new Date($year, month + 1), bookings);
	// onMount(() => {
	// 	console.log('bookings: ', bookings);
	// });
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
		{#each { length: 6 } as _, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as _, idxd (idxd)}
					{@const day = current[idxw][idxd]}

					<!-- It starts from the first day of the month, not printing the days of the week at the beginning or at
            the end of the month, those are in fact numbers and not objects, which belong to the previous or next month  -->

					{#if (typeof day === 'object' && day.color2) || (typeof day === 'object' && day.color1)}
						<!-- Infos Tooltip -->
						<div class="booked-day" data-tooltip={day.name1}>
							<span class="text-lg font-normal">
								{day.dayNumber}
							</span>
							{#if day.color2}
								<div class="grid grid-cols-2">
									<div class={`${borderColorString[`${day.color2}`]}`} />
									<div class={`${borderColorString[`${day.color1}`]}`} />
								</div>
							{:else if day.color1}
								<div
									class={day.color1 === ''
										? ''
										: `${borderColorString[`${day.color1}`]} `}
								/>
							{/if}
						</div>
					{:else if typeof day === 'object'}
						<div>
							<span class="text-lg font-normal">
								{day.dayNumber}
							</span>
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
	.booked-day {
		position: relative;
	}

	.booked-day::before,
	.booked-day::after {
		--scale: 0;
		--arrow-size: 10px;
		--tooltip-color: #5052c7;
		position: absolute;

		top: -0.25rem;
		left: 50%;
		transform: translateX(-50%) translateY(var(--translate-y, 0))
			scale(var(--scale));
		transition: 50ms transform;
		transform-origin: bottom center;
	}

	.booked-day::before {
		--translate-y: calc(-100% - var(--arrow-size));
		content: attr(data-tooltip);
		color: white;
		padding: 0.5rem;
		width: max-content;
		background: var(--tooltip-color);
		border-radius: 0.3rem;
		text-align: center;
	}

	.booked-day:hover::before,
	.booked-day:hover::after {
		--scale: 1;
		scale: var(--scale);
	}

	.booked-day::after {
		--translate-y: calc(-1 * var(--arrow-size));

		content: '';
		border: var(--arrow-size) solid transparent;
		border-top-color: var(--tooltip-color);
		transform-origin: top center;
	}
</style>

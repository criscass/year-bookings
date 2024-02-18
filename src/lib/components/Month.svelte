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
	import { popup } from '@skeletonlabs/skeleton';
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
						<button
							use:popup={{
								event: 'click',
								target: 'loopExample-' + day.name1,
								placement: 'top'
							}}
						>
							<!-- Infos Popup -->
							<div
								class="card p-6 w-72 shadow-xl"
								data-popup="loopExample-{day.name1}"
							>
								<div>
									<p class="my-4">{day.name1}</p>
									<p class="text-sm mb-5">
										{formatDateString(day.start_on_day)} to {formatDateString(
											day.end_on_day
										)}
									</p>
									<a
										role="button"
										class="btn variant-soft w-full mt-4"
										on:click={() =>
											handleEditClick(
												day.name1,
												day.start_on_day,
												day.end_on_day,
												day.color1,
												day.booking_id
											)}>Edit</a
									>
								</div>

								<div class="arrow bg-surface-100-800-token" />
							</div>
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
						</button>
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

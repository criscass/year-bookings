<script lang="ts">
	import calendify from '$lib/functions/calendify';
	import type { PageData } from '../../routes/$types';

	import { onMount } from 'svelte';

	interface BorderColor {
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

	import {
		year,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		formStatus
	} from '../stores/store';

	export let month = 0; //Jan

	// - - - - props for today day higligthing  - - - -
	// export const today: Date | null = null; // Todays Date
	// export let today_day = 0;
	// export let today_year = 0;
	// export let today_month = 0;

	export let data: PageData;

	//   create table public.bookings(
	//   id int primary key generated always as identity,
	//   guest_name text not null,
	//   startOnDay date not null,
	//   endOnDay date not null,
	//   color text not null,
	//   created_at timestamptz default now(),
	//   user_id uuid references auth.users(id) on delete cascade not null
	// );

	type Booking = {
		id: number;
		guest_name: string;
		start_on_day: Date;
		end_on_day: Date;
		color: string;
	};

	type Bookings = Booking[];

	const bookings: Bookings = [
		{
			id: 1,
			guest_name: 'The greens',
			start_on_day: new Date('2024-02-20'),
			end_on_day: new Date('2024-02-25'),
			color: 'primary'
		},
		{
			id: 2,
			guest_name: 'The browns',
			start_on_day: new Date('2024-03-10'),
			end_on_day: new Date('2024-03-15'),
			color: 'secondary'
		}
	];

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

	// Returns true if year, month and day corrisponds to todays date
	// function isToday(day: number) {
	// 	return (
	// 		today &&
	// 		today_year === $year &&
	// 		today_month === month &&
	// 		today_day === day
	// 	);
	// }

	// Updates the formStatus.startOnDay and formStatus.endOnDay
	// store variables
	function dayPicked(year: number, month: number, day: number) {
		if ($checkInInputIsOnFocus) {
			$formStatus.start_on_day = `${months[month]}/${day}/${year}`;

			$checkInInputIsOnFocus = false;
		}
		if ($checkOutInputIsOnFocus) {
			$formStatus.end_on_day = `${months[month]}/${day}/${year}`;
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
		{#each { length: 6 } as _, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as _, idxd (idxd)}
					{@const day = current[idxw][idxd]}

					<!-- It starts from the first day of the month, not printing the days of the week at the beginning or at
            the end of the month, those are in fact numbers and not objects, which belong to the previous or next month  -->

					<!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
					// Symplify this ↓ by getting startOnDay and endOnDay directly as
					dates, from the value in the object and then converting it to locale format string in the form. -->

					{#if typeof day === 'object'}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div>
							<span>
								{day.dayNumber}
							</span>
							{#if day.color2}
								<div class="grid grid-cols-2">
									<div class={`${borderColor[`${day.color2}`]}`} />
									<div class={`${borderColor[`${day.color1}`]}`} />
								</div>
							{:else if day.color1}
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
</style>

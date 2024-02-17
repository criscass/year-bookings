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

	import { year } from '../stores/store';

	export let month = 0; //Jan

	export let data: PageData;

	$: bookings = data.bookings;

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

	function openPopup() {
		console.log('open');
	}

	// Month array for prev, current and next month
	$: prev = calendify(new Date($year, month - 1), bookings);
	$: current = calendify(new Date($year, month), bookings);
	$: next = calendify(new Date($year, month + 1), bookings);
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
						<button on:click={() => openPopup()}>
							<span class="text-lg font-normal">
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
										: `${borderColor[`${day.color1}`]} `}
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

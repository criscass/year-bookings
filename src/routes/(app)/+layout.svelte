<script lang="ts">
	import IconAccountBoxOutline from '~icons/mdi/account-box-outline';
	import '../../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import {
		year,
		isEditable,
		isEditable2,
		createYourFirstProperty
	} from '$lib/stores/store';
	import { scale } from 'svelte/transition';
	import type { PageData } from '../$types';
	import PropertyPicker from '$lib/components/PropertyPicker.svelte';

	export let data: PageData;

	function prevYear() {
		$year = $year - 1;
	}
	function nextYear() {
		$year = $year + 1;
	}

	function handleClick() {
		$isEditable2 = false;
		$isEditable = !$isEditable;
	}
	function handleCloseDrawers() {
		$isEditable2 = false;
		$isEditable = false;
	}
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<PropertyPicker {data} />
			</svelte:fragment>

			<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />

			<svelte:fragment slot="trail">
				{#if !$isEditable}
					<button
						transition:scale|global={{ duration: 300 }}
						type="button"
						on:click={() => handleClick()}
						class="btn btn-sm rounded-xl sm:btn-md sm:rounded-2xl sm:text-2xl text-lg variant-filled-surface"
						>+</button
					>
				{/if}
				<a href="/account" class="relative" on:click={handleCloseDrawers}>
					<IconAccountBoxOutline class="icon-box hover:opacity-50" />
					<div class="z-10" class:arrow={$createYourFirstProperty} />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>

<style>
	:global(.icon-box) {
		font-size: 2rem;
	}
	.arrow {
		position: absolute;
		top: 50px;
		right: 3px;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 25px solid #ef4444;
	}

	@keyframes arrow-move {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(45px);
		}
	}

	.arrow {
		animation: arrow-move 1.5s ease-in-out infinite alternate;
	}
</style>

<script lang="ts">
	import type { PageData } from './$types';
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import { year } from '../lib/stores/store';
	import EditSlideDrawer from '$lib/components/EditSlideDrawer.svelte';
	import { slide, scale } from 'svelte/transition';

	export let data: PageData;

	let isEditable: boolean = false;

	function toggleEditMode() {
		isEditable = !isEditable;
	}

	function prevYear() {
		$year = $year - 1;
	}
	function nextYear() {
		$year = $year + 1;
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
				<strong class="text-xl uppercase">La Civettaia</strong>
			</svelte:fragment>
			<svelte:fragment>
				<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />
			</svelte:fragment>

			<svelte:fragment slot="trail">
				{#if !isEditable}
					<button
						transition:scale={{ duration: 300 }}
						type="button"
						on:click={toggleEditMode}
						class="btn btn-sm mr-12 px-4 text-lg variant-filled-surface"
						>+</button
					>
				{/if}

				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	{#if isEditable}
		<div transition:slide={{ duration: 200 }} class="h-24 sticky top-0">
			<EditSlideDrawer />
		</div>
	{/if}
	<slot />
</AppShell>

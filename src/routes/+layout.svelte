<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	} from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import { year, isEditable } from '../lib/stores/store';

	import { scale } from 'svelte/transition';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

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
				<strong class="text-sm uppercase">La Civettaia</strong>
			</svelte:fragment>

			<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />

			<svelte:fragment slot="trail">
				{#if !$isEditable}
					<button
						transition:scale={{ duration: 300 }}
						type="button"
						on:click={() => ($isEditable = !$isEditable)}
						class="btn btn-sm rounded-2xl text-sm variant-filled-surface"
						>+</button
					>
				{/if}

				<LightSwitch width="w-12" height="h-6" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>

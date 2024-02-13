<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';

	import IconAccountBoxOutline from '~icons/mdi/account-box-outline';
	import '../../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import { year, isEditable } from '../../lib/stores/store';
	import { scale } from 'svelte/transition';

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
				<strong class="text-xl ml-5">La Civettaia</strong>
			</svelte:fragment>

			<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />

			<svelte:fragment slot="trail">
				{#if !$isEditable}
					<button
						transition:scale|global={{ duration: 300 }}
						type="button"
						on:click={() => ($isEditable = !$isEditable)}
						class="btn btn-m rounded-2xl text-2xl variant-filled-surface"
						>+</button
					>
				{/if}
				<a href="/account">
					<IconAccountBoxOutline class="icon-box hover:opacity-50" />
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
	/* :global(.icon-box):hover {
		opacity: 50;
	} */
</style>

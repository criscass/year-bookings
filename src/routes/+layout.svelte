<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import YearButtons from '$lib/components/YearButtons.svelte';
	import { year } from '../lib/stores/store';

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
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">La Civettaia - Bookings</strong>
			</svelte:fragment>
			<svelte:fragment>
				<YearButtons on:prevYear={prevYear} on:nextYear={nextYear} />
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

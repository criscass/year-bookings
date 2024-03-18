<script lang="ts">
	import { isEditable, isEditable2, storePropertyId } from '$lib/stores/store';
	import Month from '$lib/components/Month.svelte';
	import type { PageData } from './$types';
	import CreateSlideDrawer from '$lib/components/CreateSlideDrawer.svelte';
	import EditSlideDrawer from '$lib/components/EditSlideDrawer.svelte';

	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: propertyBookings = data.bookings.filter(
		(probertyBooking) => probertyBooking.property_id === $storePropertyId
	);

	// onMount(() => {
	// });
</script>

{#if $isEditable}
	<div transition:slide|global={{ duration: 200 }} class="h-54 sticky top-0">
		<CreateSlideDrawer data={data.createBookingForm} />
	</div>
{/if}
{#if $isEditable2}
	<div transition:slide|global={{ duration: 200 }} class="h-54 sticky top-0">
		<EditSlideDrawer data={data.createBookingForm} />
	</div>
{/if}

<div
	class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
>
	{#each { length: 12 } as _, idx (idx)}
		<Month month={idx} {propertyBookings} />
	{/each}
</div>

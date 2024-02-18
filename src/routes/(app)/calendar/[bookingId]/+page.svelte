<script lang="ts">
	import Month from '$lib/components/Month.svelte';
	import type { PageData } from './$types';
	import EditSlideDrawer from '$lib/components/CreateSlideDrawer.svelte';
	import { slide } from 'svelte/transition';
	import { isEditable2 } from '$lib/stores/store';

	const today = new Date();

	export let data: PageData;
</script>

{#if $isEditable2}
	<div transition:slide|global={{ duration: 200 }} class="h-54 sticky top-0">
		<EditSlideDrawer data={data.updateBookingForm} />
	</div>
{/if}

<div
	class=" p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
>
	{#each { length: 12 } as _, idx (idx)}
		<Month month={idx} {data} />
	{/each}
</div>

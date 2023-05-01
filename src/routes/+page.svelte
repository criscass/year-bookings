<script lang="ts">
	import { isEditable } from '../lib/stores/store';
	import Month from '$lib/components/Month.svelte';
	import type { PageData } from './$types';
	import EditSlideDrawer from '$lib/components/EditSlideDrawer.svelte';
	import { slide } from 'svelte/transition';
	const today = new Date();
	const today_month = today && today.getMonth();
	const today_year = today && today.getFullYear();
	const today_day = today && today.getDate();
	export let data: PageData;
	console.log(data.bookings);
</script>

{#if $isEditable}
	<div transition:slide={{ duration: 200 }} class="h-54 sticky top-0">
		<EditSlideDrawer />
	</div>
{/if}

<!-- <pre>{JSON.stringify(data.bookings, null, '\t')}</pre> -->

<div
	class=" p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
>
	{#each { length: 12 } as _, idx (idx)}
		<Month {today} {today_day} {today_month} {today_year} month={idx} {data} />
	{/each}
</div>

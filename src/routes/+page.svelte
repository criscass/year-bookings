<script lang="ts">
	import Month from '$lib/components/Month.svelte';
	import type { PageData } from './$types';
	const today = new Date();
	const today_month = today && today.getMonth();
	const today_year = today && today.getFullYear();
	const today_day = today && today.getDate();
	export let data: PageData;
</script>

<div
	class=" p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
>
	{#each { length: 12 } as x, idx (idx)}
		<Month {today} {today_day} {today_month} {today_year} month={idx} {data} />
	{/each}
</div>

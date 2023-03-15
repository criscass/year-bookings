<script lang="ts">
	import Month from '$lib/components/Month.svelte';
	const today = new Date();
	export let year = 2023;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
	{#each { length: 12 } as x, idx (idx)}
		<Month {today} month={idx} {year} />
	{/each}
</div>

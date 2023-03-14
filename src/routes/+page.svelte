<script lang="ts">
	import Month from '$lib/components/Month.svelte';
	const today = new Date();
</script>

<Month {today} />

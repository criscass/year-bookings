<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { year } from '../stores/store';
</script>

<!-- Left arrow button -->
<div class="flex flex-row items-center">
	<button
		type="button"
		on:click={() => dispatch('prevYear')}
		class="hover:opacity-50"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28"
			height="28"
			viewBox="6 6 12 12"
			><path
				fill="currentColor"
				d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z"
			/></svg
		>
	</button>

	<strong class="text-xl md:text-4xl">{$year}</strong>

	<!-- Right arrow button -->
	<button
		type="button"
		on:click={() => dispatch('nextYear')}
		class="hover:opacity-50"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="28"
			height="28"
			viewBox="6 6 12 12"
			><path
				fill="currentColor"
				d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
			/></svg
		>
	</button>
</div>

<style>
</style>

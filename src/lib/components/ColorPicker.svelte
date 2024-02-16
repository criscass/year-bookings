<script lang="ts">
	// import { onMount } from 'svelte';
	import { border_color } from '../stores/store';

	let active = '';

	function handleClick(e: any) {
		active = e.target.id;
		$border_color = e.target.id;
	}
</script>

<div class="mt-2 p-2 rounded-lg">
	<!-- palette-of-colors -->
	<div class=" whitespace-nowrap overflow-x-auto">
		<!-- single color -->
		<button
			id="secondary"
			type="button"
			class="inline-block mr-2 rounded-full bg-secondary-500 w-10 h-10 transition-all"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'secondary'}
		/>
		<button
			id="primary"
			type="button"
			class="inline-block mr-2 rounded-full bg-primary-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'primary'}
		/>
		<button
			id="tertiary"
			type="button"
			class="inline-block mr-2 rounded-full bg-tertiary-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'tertiary'}
		/>
		<button
			id="success"
			type="button"
			class="inline-block mr-2 rounded-full bg-success-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'success'}
		/>
		<button
			id="warning"
			type="button"
			class="inline-block mr-2 rounded-full bg-warning-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'warning'}
		/>
		<button
			id="error"
			type="button"
			class="inline-block mr-2 rounded-full bg-error-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'error'}
		/>
		<button
			id="surface"
			type="button"
			class="inline-block mr-2 rounded-full bg-surface-500 w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'surface'}
		/>
		<button
			id="primaryToken"
			type="button"
			class="inline-block mr-2 rounded-full bg-primary-800-100-token w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'primaryToken'}
		/>
		<button
			id="secondaryToken"
			type="button"
			class="inline-block mr-2 rounded-full bg-secondary-800-100-token w-10 h-10"
			on:click={(e) => handleClick(e)}
			class:is-selected={active === 'secondaryToken'}
		/>
	</div>
</div>

<style>
	.is-selected {
		animation: wobble 0.5s ease-in-out;
		border-radius: 1px;
	}

	@keyframes wobble {
		50% {
			border-radius: 10px;
		}
		100% {
			border-radius: 1px;
		}
	}
</style>

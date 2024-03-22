<script lang="ts">
	import type { CreateBookingSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { isEditable, borderColor, storePropertyId } from '../stores/store';

	import ColorPicker from './ColorPicker.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import IconClose from '~icons/mdi/close-box-outline';

	export let data: SuperValidated<CreateBookingSchema>;
	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				$isEditable = false;
				$borderColor = '';
				return;
			}
		}
	});

	function closeDrawer() {
		$isEditable = !$isEditable;
	}
</script>

<form
	method="POST"
	action="?/createBooking"
	class="grid grid-cols-10 md:grid-cols-12 gap-4 p-4 backdrop-blur-md max-w-screen"
	use:enhance
>
	<!-- Booking name -->

	<div class="col-span-8 md:col-span-4 md:order-1">
		<input
			type="text"
			name="guest_name"
			placeholder={'Guest Name'}
			autocomplete="off"
			class="input"
			bind:value={$form.guest_name}
		/>
		{#if $errors.guest_name}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.guest_name}</span
			>
		{/if}
	</div>

	<!-- close button -->

	<button
		type="button"
		on:click={() => closeDrawer()}
		class="col-span-2 order-2 text-2xl flex justify-end md:order-3"
		><IconClose class="text-slate-400 hover:text-slate-50 text-4xl" /></button
	>

	<!-- Check in date -->
	<div class="col-span-5 md:order-4 md:col-span-5 order-3">
		<input
			type="date"
			name="start_on_day"
			autocomplete="off"
			placeholder="check-in date"
			class="input"
			inputmode="none"
			bind:value={$form.start_on_day}
		/>
		{#if $errors.start_on_day}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.start_on_day}</span
			>
		{/if}
	</div>
	<!-- Check out date -->
	<div class="col-span-5 md:order-5 md:col-span-5 order-4">
		<input
			type="date"
			name="end_on_day"
			placeholder="check-out"
			autocomplete="off"
			class="input"
			inputmode="none"
			bind:value={$form.end_on_day}
		/>
		{#if $errors.end_on_day}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.end_on_day}</span
			>
		{/if}
	</div>

	<!-- Color choice -->

	<div class=" md:col-span-6 md:order-2 col-span-8 order-5">
		<input type="hidden" name="color" bind:value={$borderColor} />
		<ColorPicker />
		{#if $errors.color}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.color}</span
			>
		{/if}
	</div>

	<!-- Property -->
	<input type="hidden" name="property_id" bind:value={$storePropertyId} />

	<!-- Submit button -->
	<button
		type="submit"
		class:opacity-25={$errors._errors}
		class="btn md:btn-lg btn-sm px-8 py-6 text-lg variant-filled col-span-2 justify-self-center md:justify-self-end self-center h-8 w-8 md:h-10 md:w-28 order-7"
		>save</button
	>
</form>

<style>
</style>

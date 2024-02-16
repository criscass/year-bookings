<script lang="ts">
	import type { CreateBookingSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { isEditable, border_color } from '../stores/store';

	import ColorPicker from './ColorPicker.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: SuperValidated<CreateBookingSchema>;
	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				$isEditable = false;
				$border_color = '';
				return;
			}
		}
	});

	function closeDrawer() {
		$isEditable = !$isEditable;
	}

	console.log($errors._errors);

	// let guestNameError = $errors.guest_name;
</script>

<form
	method="POST"
	action="?/createBooking"
	class="grid grid-cols-12 gap-4 p-4 backdrop-blur-md max-w-screen"
	use:enhance
>
	<!-- Booking name -->

	<div class="col-span-11">
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
		class="col-span-1 text-2xl">X</button
	>

	<!-- Check in date -->
	<div class="col-span-6">
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
	<div class="col-span-6">
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

	<div class="  col-span-9 row-start-3">
		<input type="hidden" name="color" bind:value={$border_color} />
		<ColorPicker />
		{#if $errors.color}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.color}</span
			>
		{/if}
	</div>

	<!-- Submit button -->
	<button
		type="submit"
		class:opacity-25={$errors._errors}
		class="btn btn-sm px-8 py-6 text-lg variant-filled col-span-3 justify-self-center self-center h-8 w-8"
		>save</button
	>
</form>

<style>
	input[type='date']:before {
		content: attr(placeholder) !important;
		color: #6466f1;
		margin-right: 0.5em;
	}
	input[type='date']:focus:before,
	input[type='date']:valid:before {
		content: '';
	}

	input::placeholder {
		color: #6466f1;
	}
	.error_message input::placeholder {
		color: red !important;
	}
</style>

<script lang="ts">
	import type { CreateBookingSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { isEditable2, borderColor, formStatus } from '../stores/store';

	import ColorPicker from './ColorPicker.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { onMount } from 'svelte';

	export let data: SuperValidated<CreateBookingSchema>;
	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				$isEditable2 = false;
				return;
			}
		}
	});

	function closeDrawer() {
		$isEditable2 = !$isEditable2;
	}

	// it scrolls all the way to the top so that the drawer becomes visible
	let topDiv: any;
	function scrollToTop() {
		topDiv.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'nearest'
		});
	}

	onMount(() => {
		scrollToTop();
	});

	let visible: boolean = false;
</script>

<div bind:this={topDiv} class="absolute top-0 left-0" />

{#if visible}
	<aside class="alert variant-ghost-error flex-col items-center">
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">Are you sure you want to delete this booking?</h3>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<button
				type="button"
				class="btn btn-sm variant-filled mr-4"
				on:click={() => (visible = false)}>No</button
			>
			<form action="?/deleteBooking" method="POST" use:enhance>
				<input
					type="hidden"
					name="delete_booking_id"
					bind:value={$formStatus.booking_id}
				/>
				<button type="submit" class="btn btn-sm variant-filled">Yes!</button>
			</form>
		</div>
	</aside>
{/if}

{#if !visible}
	<form
		method="POST"
		action="?/updateBooking"
		class="grid grid-cols-12 gap-4 p-4 backdrop-blur-md max-w-screen"
		use:enhance
	>
		<input
			type="hidden"
			name="booking_id"
			bind:value={$formStatus.booking_id}
		/>
		<!-- Booking name -->
		<div class="col-span-11">
			<input
				type="text"
				name="guest_name"
				placeholder={'Guest Name'}
				autocomplete="off"
				class="input"
				bind:value={$formStatus.name}
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
				bind:value={$formStatus.start_on_day}
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
				bind:value={$formStatus.end_on_day}
			/>
			{#if $errors.end_on_day}
				<span class="block text-error-600 dark:text-error-500"
					>{$errors.end_on_day}</span
				>
			{/if}
		</div>

		<!-- Color choice -->

		<div class="  col-span-9 row-start-3">
			<input type="hidden" name="color" bind:value={$borderColor} />
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

	<button
		class="btn variant-ringed-error w-full"
		on:click={() => (visible = true)}
	>
		Delete this booking</button
	>
{/if}

<style>
</style>

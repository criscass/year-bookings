<script lang="ts">
	import type { CreateBookingSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { isEditable2, borderColor, formStatus } from '../stores/store';
	import IconClose from '~icons/mdi/close-box-outline';
	import IconTrash from '~icons/mdi/trash-can-outline';

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

<!-- /** *Delete message */ -->
{#if visible}
	<aside class="alert variant-filled-error flex-col items-center">
		<!-- Message -->
		<div class="alert-message flex justify-center items-center">
			<h3 class="h3">Are you sure you want to delete this booking?</h3>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<button
				type="button"
				class="btn variant-filled mr-4"
				on:click={() => (visible = false)}>No</button
			>
			<form action="?/deleteBooking" method="POST" use:enhance>
				<input
					type="hidden"
					name="delete_booking_id"
					bind:value={$formStatus.booking_id}
				/>
				<button type="submit" class="btn variant-filled">Yes!</button>
			</form>
		</div>
	</aside>
{/if}

<!-- /** *Editing drawer */ -->
{#if !visible}
	<div class="grid grid-cols-12 gap-2 relative">
		<form
			method="POST"
			action="?/updateBooking"
			class="col-span-12 md:col-span-11 grid grid-cols-10 gap-4 md:grid-cols-12 p-4 backdrop-blur-md max-w-screen"
			use:enhance
		>
			<input
				type="hidden"
				name="booking_id"
				bind:value={$formStatus.booking_id}
			/>
			<!-- Booking name -->
			<div class="col-span-7 md:col-span-4 md:order-1 2xl:col-span-2">
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

			<!-- Check in date -->
			<div
				class="col-span-4 order-2 md:order-4 md:col-span-4 2xl:order-2 2xl:col-span-2"
			>
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
			<div
				class="col-span-4 order-3 md:order-5 md:col-span-4 2xl:order-3 2xl:col-span-2"
			>
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

			<div
				class=" md:static md:col-span-8 lg:justify-self-end md:order-2 col-span-10 order-5 2xl:order-4 2xl:col-span-5 2xl:justify-self-start"
			>
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
				class="btn md:btn-md btn-sm order-4 px-4 py-2 md:px-8 w-full text-lg variant-filled col-span-2 self-center md:order-5 2xl:col-span-1"
				>save</button
			>
		</form>
		<div
			class="absolute right-2 top-6 md:static col-span-1 gap-4 grid grid-cols-2 md:grid-rows-2 md:grid-cols-1 2xl:grid-cols-2 2xl:grid-rows-1 justify-center items-center order-1"
		>
			<!-- delete booking button -->
			<button on:click={() => (visible = true)} class="2xl:col-span-1">
				<IconTrash
					class="text-3xl text-surface-900 hover:text-surface-700 dark:text-slate-400 hover:dark:text-slate-50"
				/></button
			>
			<!-- close button -->
			<button
				type="button"
				on:click={() => closeDrawer()}
				class="2xl:col-span-1 order-2"
				><IconClose
					class="text-slate-400 hover:text-slate-50 text-3xl"
				/></button
			>
		</div>
	</div>
{/if}

<style>
	aside {
		width: 100%;
		height: 200px;
	}
</style>

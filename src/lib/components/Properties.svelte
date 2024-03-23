<script lang="ts">
	import type { CreatePropertySchema } from '$lib/schemas';
	import PropertiesCreationInput from './PropertiesCreationInput.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { newPropertyInputOpen } from '../stores/store';

	export let data: SuperValidated<CreatePropertySchema>;
	export let bookings;
	// console.log('bookings', bookings);
	import IconProperties from '~icons/mdi/house-city-outline';
	import IconTrash from '~icons/mdi/trash-can-outline';
	import IconEdit from '~icons/mdi/edit-box-outline';
	import IconQuestion from '~icons/mdi/question-box-outline';
	import IconPlus from '~icons/mdi/plus-box-outline';

	import { onMount } from 'svelte';
	import PropertiesEditInput from './PropertiesEditInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let properties: CreatePropertySchema[];
	const { form, errors, enhance } = superForm(data, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				confirmDelete = false;
				return;
			} else {
				console.log('errors:', $errors);
			}
		}
	});

	/**
	 * Modal for property information
	 */
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type {
		ModalSettings,
		ModalComponent,
		ModalStore
	} from '@skeletonlabs/skeleton';

	function generateGuestHTML(bookings) {
		let htmlOutput = '';

		for (const guest of bookings) {
			const formattedStartDate = new Date(
				guest.start_on_day
			).toLocaleDateString();
			const formattedEndDate = new Date(guest.end_on_day).toLocaleDateString();

			htmlOutput += `
            <h3 class="text-xl font-bold mt-4">${guest.guest_name}</h3>
            <div class="flex flex-row gap-4">
              <p>from the ${formattedStartDate}</p>
              <p>to the ${formattedEndDate}</p>
            </div>
        `;
		}

		return htmlOutput;
	}

	const modalStore = getModalStore();

	let modal: ModalSettings = {
		type: 'alert',
		// Data
		title: '',
		body: ''
	};

	function handleModal(title: string, propertyId: number) {
		modal.title = `<h1 class="text-2xl font-bold">${title}</h1>`;
		const currentBookings = bookings.filter(
			(booking) => booking.property_id === propertyId
		);
		modal.body = generateGuestHTML(currentBookings);
		modalStore.trigger(modal);
	}

	/**
	 * Local Variables and functions
	 */
	$: beingEdited = NaN;
	let confirmDelete: boolean = false;
	let currentPropertyId: number;

	function handleEditButton(id) {
		beingEdited = id;
		$newPropertyInputOpen = false;
	}

	function handlePropertyCreationButton() {
		beingEdited = NaN;
		$newPropertyInputOpen = true;
	}

	function handleDeleteProperty(id: number) {
		confirmDelete = true;
		currentPropertyId = id;
	}
	// onMount(() => {
	// 	console.log('Properties: ', properties);
	// });
</script>

<!-- Confirm Delete Property -->
{#if confirmDelete}
	<aside class="alert variant-filled-error flex-col items-center">
		<!-- Message -->
		<div class="alert-message flex justify-center items-center">
			<h3 class="h3">
				If you delete this property you will loose all the bookings related to
				it. Are you sure you want to delete it?
			</h3>
		</div>

		<div class="alert-actions">
			<button
				type="button"
				class="btn variant-filled mr-4"
				on:click={() => (confirmDelete = false)}>No</button
			>
			<form action="?/deleteProperty" method="POST" use:enhance>
				<input type="hidden" name="id" value={currentPropertyId} />
				<button name="delete" type="submit" class="btn variant-filled"
					>Yes!</button
				>
			</form>
		</div>
	</aside>
{/if}

<section class="px-6 pt-6 flex flex-col gap-4">
	<div class="flex items-center font-semibold gap-8">
		<IconProperties style="font-size: 2rem;" />
		<span class="text-3xl font-bold">Properties</span>
	</div>

	<div class="grid grid-cols-10 gap-2 gap-y-4 justify-items-start items-end">
		{#each properties as property}
			{#if beingEdited === property.id}
				<div class="col-span-10 w-full">
					<PropertiesEditInput
						{data}
						property_id={property.id}
						property_name={property.property_name}
						{properties}
						bind:beingEdited
					/>
				</div>
			{:else}
				<div class="col-span-7 justify-self-start">
					<p class="text-xl ps-4">
						{property.property_name}
					</p>
				</div>

				<!-- Property Informations, Modal -->
				<button
					class="col-span-1"
					on:click={() => handleModal(property.property_name, property.id)}
				>
					<IconQuestion
						style="font-size: 1.5rem;"
						class=" text-surface-900 hover:text-surface-700 dark:text-slate-400 hover:dark:text-slate-50"
					/>
				</button>
				<button
					class="col-span-1"
					on:click={() => handleEditButton(property.id)}
				>
					<IconEdit
						style="font-size: 1.5rem;"
						class="text-surface-900 hover:text-surface-700 dark:text-slate-400 hover:dark:text-slate-50"
					/>
				</button>

				<button on:click={() => handleDeleteProperty(property.id)}>
					<IconTrash
						style="font-size: 1.5rem;"
						class="text-surface-900 hover:text-surface-700 dark:text-slate-400 hover:dark:text-slate-50"
					/>
				</button>
			{/if}
		{/each}
	</div>
	{#if $newPropertyInputOpen}
		<div class="grid grid-cols-10 gap-2 gap-y-4 justify-items-start items-end">
			<!-- New Property Creation -->
			<!-- FORM -->
		</div>
		<PropertiesCreationInput {data} {properties} />
	{:else}
		<div class="grid grid-cols-10 gap-2 gap-y-4 justify-items-start items-end">
			<button
				class="col-span-8 flex relative"
				on:click={() => handlePropertyCreationButton()}
				><IconPlus
					style="font-size: 1.5rem;"
					class="text-surface-900 hover:text-surface-700 dark:text-slate-400 hover:dark:text-slate-50"
				/><span class=" ml-3 self-center">Add a property</span>
				<!-- Red Triangle that shows where to add property -->
				<div class:arrow={properties.length === 0} class="z-10" /></button
			>
		</div>
	{/if}
</section>

<style>
	aside {
		position: absolute;
		z-index: 15;
		top: 30%;
		left: 0px;
		width: 100%;
		height: 35%;
	}

	.arrow {
		position: absolute;
		top: 35px;
		left: 0;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-bottom: 25px solid #ef4444;
	}

	@keyframes arrow-move {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(45px);
		}
	}

	.arrow {
		animation: arrow-move 1.5s ease-in-out infinite alternate;
	}
</style>

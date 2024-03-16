<script lang="ts">
	import type { CreatePropertySchema } from '$lib/schemas';
	import PropertiesCreationInput from './PropertiesCreationInput.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { newPropertyInputOpen } from '../stores/store';

	export let data: SuperValidated<CreatePropertySchema>;
	export let properties: CreatePropertySchema[];
	const { form, errors, enhance } = superForm(data);

	// const { form, errors, enhance } = superForm(data, {
	// 	resetForm: true,
	// 	onResult: ({ result }) => {
	// 		if (result.type === 'success') {
	// 			newPropertyInputOpen = false;
	// 			return;
	// 		} else {
	// 			console.log('errors:', $errors);
	// 		}
	// 	}
	// });

	import IconProperties from '~icons/mdi/house-city-outline';
	import IconTrash from '~icons/mdi/trash-can-outline';
	import IconEdit from '~icons/mdi/edit-box-outline';
	import IconQuestion from '~icons/mdi/question-box-outline';
	import IconPlus from '~icons/mdi/plus-box-outline';

	import { onMount } from 'svelte';
	import PropertiesEditInput from './PropertiesEditInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	$: beingEdited = NaN;

	function handleEditButton(id) {
		beingEdited = id;
		$newPropertyInputOpen = false;
	}

	function handlePropertyCreationButton() {
		beingEdited = NaN;
		$newPropertyInputOpen = true;
	}
	// onMount(() => {
	// 	console.log('Properties: ', properties);
	// });
</script>

<section class="px-6 pt-6 flex flex-col gap-8">
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
				<button class="col-span-1">
					<IconQuestion
						style="font-size: 1.5rem;"
						class="text-slate-400 hover:text-slate-50"
					/>
				</button>
				<button
					class="col-span-1"
					on:click={() => handleEditButton(property.id)}
				>
					<IconEdit
						style="font-size: 1.5rem;"
						class="text-slate-400 hover:text-slate-50"
					/>
				</button>
				<form
					method="POST"
					action="?/deleteProperty"
					class="col-span-1 flex"
					use:enhance
				>
					<input type="hidden" name="id" value={property.id} />
					<button type="submit" name="delete">
						<IconTrash
							style="font-size: 1.5rem;"
							class="text-slate-400 hover:text-slate-50"
						/>
					</button>
				</form>
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
				class="col-span-8 flex"
				on:click={() => handlePropertyCreationButton()}
				><IconPlus
					style="font-size: 1.5rem;"
					class="text-slate-400 hover:text-slate-50"
				/><span class=" ml-3 self-center">Add a property</span></button
			>
		</div>
	{/if}
</section>

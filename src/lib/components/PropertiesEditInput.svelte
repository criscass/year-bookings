<script lang="ts">
	import IconCheck from '~icons/mdi/checkbox-outline';
	import IconCancel from '~icons/mdi/cancel-box-outline';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { EditPropertySchema } from '$lib/schemas';
	export let data: SuperValidated<EditPropertySchema>;
	export let properties: EditPropertySchema[];
	export let beingEdited;

	export let property_name: string;
	export let property_id: number;

	const { form, errors, enhance } = superForm(data, {
		resetForm: true,
		validators: {
			property_name: (property_name) =>
				property_name.length < 3
					? 'Minimum 3 characters'
					: null ||
					  properties.some(
							(property) => property.property_name === property_name
					  )
					? 'The property name must be unique'
					: null
		},
		onResult: ({ result }) => {
			if (result.type === 'success') {
				beingEdited = NaN;
				return;
			} else {
				console.log('errors:', $errors);
			}
		}
	});

	$form.id = property_id;
	$form.property_name = property_name;
</script>

<form
	method="POST"
	action="?/editPropertyName"
	use:enhance
	class="grid grid-cols-10 gap-2 gap-y-4 justify-items-start items-center"
>
	<div class="col-span-7">
		<div class="flex flex-col">
			<input
				type="text"
				name="property_name"
				aria-label="Create a new property"
				bind:value={$form.property_name}
				class="input h-10 w-56"
			/>
			<input type="hidden" name="id" bind:value={$form.id} />

			{#if $errors.property_name}
				<span class=" text-error-600 dark:text-error-500"
					>{$errors.property_name}</span
				>
			{/if}
		</div>
	</div>

	<!-- Confirm new property creation-->
	<button class="col-start-8 col-span-2">
		<IconCheck
			type="submit"
			style="font-size: 1.5rem;"
			class="text-slate-400 hover:text-slate-50"
		/>
	</button>
	<!-- Cancel new property creation -->
	<button on:click={() => (beingEdited = NaN)} class="col-span-1">
		<IconCancel
			style="font-size: 1.5rem;"
			class="text-slate-400 hover:text-slate-50"
		/>
	</button>
</form>

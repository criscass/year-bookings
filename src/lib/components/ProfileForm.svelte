<script lang="ts">
	import type { ProfileSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { superForm } from 'sveltekit-superforms/client';

	import IconAccountDetails from '~icons/mdi/card-account-details-outline';
	export let data: SuperValidated<ProfileSchema>;
	const { form, errors, enhance } = superForm(data);
	console.log(data.data);
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<IconAccountDetails />
		<span class="ml-4">Personal Details</span>
	</div>
	<p class="mt-3 text-sm">
		Change the personal details associated with your account
	</p>
	<!-- Personal Details Form -->
	<form method="POST" action="?/updateProfile" use:enhance class="mt-8">
		<label for="full_name" class="space-y-2">
			<span>Name</span>
			<input type="text" name="full_name" bind:value={$form.full_name} />
			{#if $errors.full_name}
				<span class="block text-red-600 dark:text-red-500"
					>{$errors.full_name}</span
				>
			{/if}
		</label>
		<button class="btn btn-variant-filled" type="submit">Submit</button>
	</form>
</section>

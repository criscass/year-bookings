<script lang="ts">
	import type { ProfileSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { superForm } from 'sveltekit-superforms/client';

	import IconAccountDetails from '~icons/mdi/card-account-details-outline';
	export let data: SuperValidated<ProfileSchema>;
	const { form, errors, enhance } = superForm(data);

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	function toastMessage() {
		const t: ToastSettings = {
			message: 'You have succesfully changed the username.'
		};
		toastStore.trigger(t);
	}
</script>

<section class="px-6 pt-6 flex flex-col gap-8">
	<div>
		<div class="flex items-center font-semibold">
			<IconAccountDetails style="font-size: 2rem;" />
			<span class="ml-4">User Name</span>
		</div>
		<p class="text-sm mb-6">
			Change the user name associated with your account
		</p>
	</div>
	<!-- Personal Details Form -->
	<form
		method="POST"
		action="?/updateProfile"
		on:submit={toastMessage}
		use:enhance
	>
		<input
			type="text"
			name="full_name"
			class="input"
			aria-label="Change your username"
			bind:value={$form.full_name}
		/>
		{#if $errors.full_name}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.full_name}</span
			>
		{/if}

		<button class="btn variant-filled-primary mt-6" type="submit">Submit</button
		>
	</form>
</section>

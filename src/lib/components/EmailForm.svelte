<script lang="ts">
	import type { ProfileSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { superForm } from 'sveltekit-superforms/client';

	import IconEmailDetails from '~icons/ic/baseline-alternate-email';
	export let data: SuperValidated<ProfileSchema>;
	const { form, errors, enhance } = superForm(data);
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<IconEmailDetails style="font-size: 2rem;" />
		<span class="ml-4">Email</span>
	</div>
	<p class="text-sm mb-6">Change the email associated with your account</p>
	<!-- Personal Details Form -->
	<form method="POST" action="?/updateEmail" use:enhance>
		<input
			type="email"
			name="email"
			class="input"
			aria-label="Change your email"
			bind:value={$form.email}
		/>
		{#if $errors.email}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.email}</span
			>
		{/if}

		<button class="btn variant-filled-primary mt-4" type="submit">Submit</button
		>
	</form>
</section>

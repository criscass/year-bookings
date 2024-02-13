<script lang="ts">
	import type { ProfileSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';

	import { superForm } from 'sveltekit-superforms/client';

	import IconPasswordDetails from '~icons/wpf/password1';
	export let data: SuperValidated<ProfileSchema>;
	const { form, errors, enhance } = superForm(data, { resetForm: true });
</script>

<section class="px-6 pt-16">
	<div class="flex items-center font-semibold">
		<IconPasswordDetails style="font-size: 2rem;" />
		<span class="ml-4">Password</span>
	</div>
	<p class="text-sm mb-6">Change the password to login to your account</p>
	<!-- Personal Details Form -->
	<form method="POST" action="?/updatePassword" use:enhance>
		<input
			type="password"
			name="password"
			class="input"
			placeholder="new password"
			aria-label="Change your password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.password}</span
			>
		{/if}
		<input
			type="password"
			name="password_confirm"
			class="input mt-8"
			placeholder="confirm password"
			aria-label="Confirm password"
			bind:value={$form.password_confirm}
		/>
		{#if $errors.password_confirm}
			<span class="block text-error-600 dark:text-error-500"
				>{$errors.password_confirm}</span
			>
		{/if}

		<button class="btn variant-filled-primary mt-4" type="submit">Submit</button
		>
	</form>
</section>

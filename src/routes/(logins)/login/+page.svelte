<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true
	});
</script>

<!-- <SuperDebug data={form} /> -->
<div class="w-full flex flex-col items-center">
	<h3 class="text-center mt-3">Login to your account</h3>
	<form
		method="POST"
		class="w-11/12 max-w-screen-md card px-8 sm:px-10 py-16 mt-5 text-token space-y-8"
		use:enhance
	>
		<label class="label">
			<span>Email</span>
			<input
				class="input"
				type="email"
				name="email"
				placeholder="email"
				bind:value={$form.email}
				data-testid="email"
			/>
			{#if $errors.email}
				<span class="block text-error-600 dark:text-error-500"
					>{$errors.email}</span
				>
			{/if}
		</label>

		<label class="label">
			<span>Password</span>
			<input
				class="input"
				type="password"
				name="password"
				placeholder="password"
				bind:value={$form.password}
				data-testid="password"
			/>
			{#if $errors.password}
				<span class="block text-error-600 dark:text-error-500"
					>{$errors.password}</span
				>
			{/if}
		</label>

		<div class="flex justify-center">
			<button type="submit" class="btn variant-filled-primary mt-8"
				>Login</button
			>
		</div>
	</form>
</div>

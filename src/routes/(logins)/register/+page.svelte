<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;
	const { form, errors, enhance } = superForm(
		data.form,
		{
			resetForm: true
		}
		// {
		// 	resetForm: true,
		// 	onResult: ({ result }) => {
		// 		switch (result.type) {
		// 			case 'success':
		// 				toast.success('Success! Confirm your email to login.');
		// 				break;
		// 			case 'error':
		// 				toast.error('Error creating your account!');
		// 				break;
		// 			case 'failure':
		// 				toast.error('Check your details and try again!');
		// 				break;
		// 			default:
		// 				return;
		// 		}
		// 		return;
		// 	}
		// }
	);
</script>

<h3>Register a new account</h3>
<!-- <SuperDebug data={form} /> -->
<form method="POST" use:enhance>
	<div class="card p-4 mt-5 w-full text-token space-y-4">
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				name="full_name"
				placeholder="name"
				bind:value={$form.full_name}
				data-testid="full_name"
			/>
			{#if $errors.full_name}
				<span class="block text-error-600 dark:text-error-500"
					>{$errors.full_name}</span
				>
			{/if}
		</label>
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
		<label class="label">
			<span>Confirm password</span>
			<input
				class="input"
				type="password"
				name="password_confirm"
				placeholder="confirm password"
				bind:value={$form.password_confirm}
				data-testid="password_confirm"
			/>
			{#if $errors.password_confirm}
				<span class="block text-error-600 dark:text-error-500"
					>{$errors.password_confirm}</span
				>
			{/if}
		</label>
		<div class="flex justify-center">
			<button type="submit" class="btn variant-filled-primary">Register</button>
		</div>
	</div>
</form>

<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	export let data: PageData;
	const { form, errors, enhance } = superForm(
		data.form
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

<form method="POST" use:enhance>
	<div class="card p-4 mt-5 w-full text-token space-y-4">
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				name="full_name"
				placeholder="Name"
				bind:value={$form.full_name}
				data-testid="full_name"
			/>
			{#if $errors.full_name}
				<span class="block text-red-600 dark:text-red-500"
					>{$errors.full_name}</span
				>
			{/if}
		</label>
	</div>
</form>

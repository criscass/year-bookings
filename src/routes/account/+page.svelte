<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import type { PageData } from '../$types';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	// import EmailForm from '$lib/components/EmailForm.svelte';
	// import PasswordForm from '$lib/components/PasswordForm.svelte';
	// import { user_name } from '$lib/stores/store';
	import IconBackArrow from '~icons/tabler/arrow-back-up';
	import Properties from '$lib/components/Properties.svelte';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { createPropertySchema } from '$lib/schemas';
	import type { CreatePropertySchema } from '$lib/schemas';

	export let data: PageData;

	$: properties = data.properties;

	// onMount(() => {
	// 	console.log(properties);
	// });

	// $user_name = data.profileForm.
</script>

<div class="mt-8 grid grid-cols-2 justify-items-start px-8">
	<a href="/calendar" class="col-span-1">
		<IconBackArrow class="icon-back-arrow" />
	</a>
	<LightSwitch class="col-span-1 justify-self-end" width="w-16" height="h-8" />
</div>
<div class="py-20">
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-20 text-center">
		<!-- Account header -->
		<div class="flex flex-col mb-8">
			<hr />
		</div>

		<div class="grid grid-cols-1">
			<Properties data={data.propertiesForm} {properties} />
			<hr class="my-24" />
			<!-- Change Profile name form -->
			<span class="text-3xl font-bold">Account Settings</span>
			<ProfileForm data={data.profileForm} />
			<!-- Change Email form -->
			<!-- <EmailForm data={data.emailForm} /> -->
			<!-- Change password form -->
			<!-- <PasswordForm data={data.passwordForm} /> -->
			<hr class="my-8" />
			<section class="px-6">
				<div class="py-4">
					<form action="/logout" method="POST">
						<p class="text-lg mb-6">Logout user</p>
						<button type="submit" class="text-2xl hover:opacity-50"
							>Logout</button
						>
					</form>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	:global(.icon-back-arrow) {
		font-size: 2rem;
	}
	a {
		color: inherit;
	}
</style>

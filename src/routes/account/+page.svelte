<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import type { PageData } from '../$types';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import EmailForm from '$lib/components/EmailForm.svelte';
	import PasswordForm from '$lib/components/PasswordForm.svelte';

	import IconBackArrow from '~icons/tabler/arrow-back-up';
	export let data: PageData;
</script>

<a href="/calendar">
	<IconBackArrow class="icon-back-arrow" />
</a>
<div class="py-20">
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-20 text-center">
		<!-- Account header -->
		<div class="grid grid-cols-12 gap-4 mb-8">
			<span class="col-span-10 mt-2 text-3xl font-bold">Account Settings</span>
			<LightSwitch class="col-span-2 mt-2" />
		</div>

		<div class="grid grid-cols-1 divide-y gap-8">
			<!-- Change Profile name form -->
			<ProfileForm data={data.profileForm} />
			<!-- Change Email form -->
			<EmailForm data={data.emailForm} />
			<!-- Change password form -->
			<PasswordForm data={data.passwordForm} />
			<section class="px-6">
				<div class="py-4">
					<form action="/logout" method="POST">
						<p class="text-sm mb-6">Logout user</p>
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
		margin-top: 1rem;
		margin-left: 1rem;
	}
	a {
		color: inherit;
	}
</style>

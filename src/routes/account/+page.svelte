<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import type { PageData } from '../$types';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	export let data: PageData;
</script>

<div class="py-20">
	<div class="mx-auto flex max-w-2xl flex-col items-center pb-20 text-center">
		<!-- Account header -->
		<div class="grid grid-cols-12 gap-4 mb-8">
			<span class="col-span-10 mt-2 text-3xl font-bold">Account Settings</span>
			<LightSwitch class="col-span-2 mt-2" />
		</div>

		<div class="grid grid-cols-1 divide-y gap-4">
			<ProfileForm data={data.profileForm} />
			<section class="px-6">
				<div class="py-4">Change your password</div>
			</section>
			<section class="px-6">
				<div class="py-4">
					<form action="/logout" method="POST">
						<button type="submit">Logout</button>
					</form>
				</div>
			</section>
		</div>
	</div>
</div>

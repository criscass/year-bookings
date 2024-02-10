<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../../app.postcss';
	import { page } from '$app/stores';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<button
					class="btn btn-sm"
					class:variant-filled={$page.url.pathname === '/login'}
					><a href="/login">Login</a></button
				>

				<button
					class="btn btn-sm"
					class:variant-filled={$page.url.pathname === '/register'}
					><a href="/register">Register</a></button
				>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch width="w-12" height="h-6" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>

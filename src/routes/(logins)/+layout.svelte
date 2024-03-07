<script lang="ts">
	import '../../app.postcss';
	import { page } from '$app/stores';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
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

			<svelte:fragment slot="trail" />
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<slot />
</AppShell>

<script lang="ts">
	import '../../app.postcss';
	import { page } from '$app/stores';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			slotDefault="place-self-center col-start-2"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="default">
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
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

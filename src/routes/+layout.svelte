<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { page } from '$app/stores';

	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';

	//Rather use stripe then this client side supabase client
	export let data: LayoutData;
	$: ({ session, supabase } = data);
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});
</script>

<!-- App Shell -->

<AppShell>
	<svelte:fragment slot="header">
		{#if session == null}
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
			</AppBar>
		{/if}
	</svelte:fragment>

	<slot />
</AppShell>

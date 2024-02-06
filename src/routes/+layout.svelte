<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';

	// Supports weights 400-700
	import '@fontsource-variable/caveat';

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
	<!-- Page Route Content -->

	<slot />
</AppShell>

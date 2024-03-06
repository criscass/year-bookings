<script lang="ts">
	import '../app.pcss';

	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
	import { Toast } from '@skeletonlabs/skeleton';
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

<Toast position="t" />
<AppShell>
	<slot />
</AppShell>

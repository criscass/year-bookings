<script lang="ts">
	import {
		year,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		borderColor,
		formStatus
	} from '../../lib/stores/store';
	import type { PageData } from '../../routes/$types';

	export let data: PageData;

	$: bookings = data.bookings;
</script>

<div class="p-12">
	<h1 class="unstyled">Store</h1>

	<h3 class="mt-4">Year:<span class="text-red-600 mx-4">{$year}</span></h3>
	<h3 class="mt-4">
		isEditable:<span class="text-red-600 mx-4">{$isEditable}</span>
	</h3>
	<h3 class="mt-4">
		checkInInputIsOnFocus:<span class="text-red-600 mx-4"
			>{$checkInInputIsOnFocus}</span
		>
	</h3>
	<h3 class="mt-4">
		checkOutInputIsOnFocus:<span class="text-red-600 mx-4"
			>{$checkOutInputIsOnFocus}</span
		>
	</h3>
	<h3 class="mt-4">
		borderColor:<span class="text-red-600 mx-4">{$borderColor}</span>
	</h3>
	<div class="p-4 mt-8">
		<h2>formStatus</h2>
		<div class="ml-4">
			<h3 class="mt-4">
				formStatus.name:<span class="text-red-600 mx-4">{$formStatus.name}</span
				>
			</h3>
			<h3 class="mt-4">
				formStatus.startOnDay:<span class="text-red-600 mx-4"
					>{$formStatus.startOnDay}</span
				>
			</h3>
			<h3 class="mt-4">
				formStatus.endOnDay:<span class="text-red-600 mx-4"
					>{$formStatus.endOnDay}</span
				>
			</h3>
			<h3 class="mt-4">
				formStatus.color:<span class="text-red-600 mx-4"
					>{$formStatus.color}</span
				>
			</h3>
		</div>
	</div>
</div>
<div>
	<pre>
  {JSON.stringify(bookings, null, 4)}
</pre>
</div>

<style>
	h1 {
		font-size: 3rem;
	}
</style>

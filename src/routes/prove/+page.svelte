<script lang="ts">
	import {
		year,
		isEditable,
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		formStatus
	} from '../../lib/stores/store';
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
</div>

<style>
	h1 {
		font-size: 3rem;
	}
</style>

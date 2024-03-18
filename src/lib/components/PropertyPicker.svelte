<script lang="ts">
	import type { PageData } from '../../routes/$types';

	import { onMount } from 'svelte';

	import { storePropertyId } from '../stores/store';

	export let data: PageData;

	interface Property {
		id: number;
		property_name: string;
		user_id: number;
	}

	const properties: Property[] = data.properties;

	if ($storePropertyId === '') {
		$storePropertyId = properties[0].id;
	}
	let currentValue: number;

	function propertyChoiceHandler(currentValue: number) {
		$storePropertyId = currentValue;
	}
</script>

<select
	bind:value={currentValue}
	on:change={() => propertyChoiceHandler(currentValue)}
	class="select w-32"
>
	{#each properties as property}
		<option value={property.id} selected={property.id == $storePropertyId}
			>{property.property_name}
		</option>
	{/each}
</select>

import { writable, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const year = writable(new Date().getFullYear());

export let isEditable: Writable<Boolean> = writable(false);
export let isEditable2: Writable<Boolean> = writable(false);

export let checkInInputIsOnFocus = writable(false);
export let checkOutInputIsOnFocus = writable(false);

export let borderColor = writable<string>('');

export let user_name = writable<string>('');

export let newPropertyInputOpen = writable<boolean>(false);

export let formStatus = writable({
	name: '',
	start_on_day: '',
	end_on_day: '',
	booking_id: 0
});

export let storePropertyId: Writable<number | string> = localStorageStore(
	'property_id',
	''
);

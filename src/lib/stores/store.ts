import { writable, type Writable } from 'svelte/store';

export const year = writable(2023);

export let isEditable = writable(false);

export let checkInInputIsOnFocus = writable(false);
export let checkOutInputIsOnFocus = writable(false);

export let borderColor = writable('');

export let formStatus: Writable<FormStatus> = writable({
	name: '',
	startOnDay: '',
	endOnDay: '',
	color: ''
});

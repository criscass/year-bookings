import { writable, type Writable } from 'svelte/store';

export const year = writable(new Date().getFullYear());

export let isEditable: Writable<Boolean> = writable(false);

export let checkInInputIsOnFocus = writable(false);
export let checkOutInputIsOnFocus = writable(false);

export let border_color = writable('');

export let formStatus = writable({
	name: '',
	start_on_day: '',
	end_on_day: '',
	color: ''
});

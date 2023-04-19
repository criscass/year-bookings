import { writable } from 'svelte/store';

export const year = writable(2023);

export let isEditable = writable(false);

export let checkInInputIsOnFocus = writable(false);
export let checkOutInputIsOnFocus = writable(false);

export let pickedCheckInDate = writable('');
export let pickedCheckOutDate = writable('');

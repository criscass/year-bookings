import { writable } from 'svelte/store';

export const year = writable(2023);

export const bookings = writable<booking[]>([]);

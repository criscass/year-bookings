import { writable } from 'svelte/store';

export const year = writable(2023);

export const bookings = writable<booking[]>([
	{
		name: 'Mr White',
		startOnDay: new Date(2023, 2, 21),
		endOnDay: new Date(2023, 2, 29),
		color: 'border-b-4 border-red-600'
	},
	{
		name: 'Mr Green',
		startOnDay: new Date(2023, 3, 10),
		endOnDay: new Date(2023, 3, 17),
		color: 'border-b-4 border-green-600'
	}
]);

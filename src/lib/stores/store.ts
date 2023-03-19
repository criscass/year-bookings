import { writable } from 'svelte/store';

export const year = writable(2023);

export const bookings: booking[] = [
	{
		name: 'Mr White',
		year: 2023,
		month: 3,
		startOnDay: 21,
		endOnDay: 29,
		color: 'red'
	},
	{
		name: 'Mr Green',
		year: 2023,
		month: 4,
		startOnDay: 5,
		endOnDay: 17,
		color: 'green'
	}
];

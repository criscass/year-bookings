// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface booking {
	name: string;
	year: number;
	month: number;
	startOnDay: number;
	endOnDay: number;
	color: string;
}

interface Day {
	dayNumber: number;
	color: string;
	isBooked: boolean;
}

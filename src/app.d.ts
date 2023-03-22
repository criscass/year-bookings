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
	startOnDay: Date;
	endOnDay: Date;
	color: string;
}

interface Day {
	dayNumber: number;
	color1: string;
	color2: string;
	isBooked: boolean;
}

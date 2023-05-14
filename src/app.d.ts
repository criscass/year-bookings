// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Day {
	dayNumber: number;
	color1?: string;
	color2?: string;
	name1?: string;
	name2?: string;
	isBooked: boolean;
	startOnDay?: Date;
	endOnDay?: Date;
}

interface Booking {
	id: string;
	name: string;
	startOnDay: Date;
	endOnDay: Date;
	color: string;
}

interface BorderColor {
	primary: string;
	primaryToken: string;
	secondary: string;
	secondaryToken: string;
	tertiary: string;
	success: string;
	warning: string;
	error: string;
	surface: string;
}

interface FormStatus {
	name: string | undefined;
	startOnDay: string | undefined;
	endOnDay: string | undefined;
	color: string | undefined;
}

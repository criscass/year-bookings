import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			screens: {
				'2xl': '1450px'
				// => @media (min-width: 1450px) { ... }
			}
		},
		fontFamily: {
			quicksand: ['Quicksand', 'sans-serif']
		}
	},
	plugins: [
		forms,
		skeleton({
			themes: { preset: ['modern', 'skeleton'] }
		})
	],
	future: {
		hoverOnlyWhenSupported: true
	}
} satisfies Config;

export default config;

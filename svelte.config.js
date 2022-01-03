import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$layout: resolve('./src/components/layout'),
					$ui: resolve('./src/components/ui'),
					$stores: resolve('./src/stores'),
					$actions: resolve('./src/actions'),
					$assets: resolve('./src/assets'),
					$application: resolve('./src/application'),
					$components: resolve('./src/components')
				}
			}
		}
	}
};

export default config;

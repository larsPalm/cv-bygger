import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { relative, sep } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'docs',       // build output folder in main branch
			assets: 'docs',
			fallback: 'index.html'
		}),
		paths: {
			base: '/cv-bygger'
		},
		prerender: {
			entries: ['*']
		}
	}
};

export default config;

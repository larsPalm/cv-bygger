import { writable } from 'svelte/store';

export const name = writable<string>('');
export const phone = writable<string>('');
export const email = writable<string>('');
export const linkedIn = writable<string>('');
export const webpage = writable<string>(''); 
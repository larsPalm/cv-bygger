import { writable } from 'svelte/store';
import type { Card } from '../types/Card';

export const schools = writable<Card[]>([]); // starter tomt
export const education = writable<Card[]>([]); // starter tomt
export const work = writable<Card[]>([]); // starter tomt
export const vulentarely = writable<Card[]>([]); // starter tomt
export const other = writable<Card[]>([]); // starter tomt
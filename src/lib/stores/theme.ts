import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

function readStoredTheme(): Theme {
	if (!browser) return 'dark';
	return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

function persistTheme(value: Theme) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, value);
}

function createThemeStore() {
	const { subscribe, set: setStore, update: updateStore } = writable<Theme>(readStoredTheme());

	return {
		subscribe,
		set(value: Theme) {
			setStore(value);
			persistTheme(value);
		},
		update(updater: (value: Theme) => Theme) {
			updateStore((current) => {
				const next = updater(current);
				persistTheme(next);
				return next;
			});
		},
		toggle() {
			updateStore((current) => {
				const next = current === 'dark' ? 'light' : 'dark';
				persistTheme(next);
				return next;
			});
		}
	};
}

export const theme = createThemeStore();

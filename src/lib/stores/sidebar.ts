import { writable } from "svelte/store";
import { browser } from "$app/environment";

function createSidebar() {
	const initial = browser ? window.innerWidth >= 768 : true;
	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((v) => !v),
	};
}

export const sidebar = createSidebar();

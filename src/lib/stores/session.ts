import { derived, readable } from 'svelte/store';

function formatHms(totalSeconds: number): string {
	const h = Math.floor(totalSeconds / 3600);
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;
	return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const seconds = readable(0, (set) => {
	let n = 0;
	set(0);
	const id = setInterval(() => {
		n += 1;
		set(n);
	}, 1000);
	return () => clearInterval(id);
});

export const sessionSeconds = seconds;
export const sessionFormatted = derived(seconds, formatHms);

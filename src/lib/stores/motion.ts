import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export const prefersReducedMotion = readable<boolean>(false, (set) => {
	if (!browser) {
		set(false);
		return;
	}
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	set(mq.matches);
	const onChange = () => set(mq.matches);
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
});

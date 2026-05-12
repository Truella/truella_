import type { Action } from 'svelte/action';

export type InviewParams = {
	threshold?: number;
	onInview?: () => void;
};

export const inview: Action<HTMLElement, InviewParams | undefined> = (node, params) => {
	let threshold = params?.threshold ?? 0.2;
	let onInview = params?.onInview;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dispatchEvent(new CustomEvent('inview', { bubbles: true }));
					onInview?.();
					observer.disconnect();
					break;
				}
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		update(newParams: InviewParams | undefined) {
			threshold = newParams?.threshold ?? 0.2;
			onInview = newParams?.onInview;
		},
		destroy() {
			observer.disconnect();
		}
	};
};

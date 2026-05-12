import { projects } from '$lib/data';

export const prerender = true;

export function entries() {
	return projects.map((p) => ({ slug: p.slug }));
}

import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from '$lib/data';

export const prerender = true;

export function entries() {
	return projects.map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) {
		throw redirect(307, '/projects');
	}
	return { project };
};

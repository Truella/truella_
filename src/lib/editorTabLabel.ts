import { projects } from '$lib/data';

export function editorTabLabel(pathname: string, hash = ''): string {
	const p =
		pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	if (p === '' || p === '/') {
		if (hash === '#package-json') return 'package.json';
		if (hash === '#changelog') return 'CHANGELOG.md';
		return 'README.md';
	}
	if (p === '/contact') return 'Terminal';
	if (p === '/projects') return 'projects';
	const m = /^\/projects\/([^/]+)$/.exec(p);
	if (m) {
		const proj = projects.find((x) => x.slug === m[1]);
		return proj?.title ?? m[1];
	}
	return p;
}

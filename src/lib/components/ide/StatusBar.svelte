<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data';

	function openPath(pathname: string): string {
		if (!pathname || pathname === '/') return '/';
		return pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
	}

	function statusCenter(pathname: string): string {
		const path = openPath(pathname);
		const m = /^\/projects\/([^/]+)$/.exec(path);
		if (m) {
			const proj = projects.find((x) => x.slug === m[1]);
			if (proj) return `projects / ${proj.title}`;
		}
		return path;
	}
</script>

<footer
	class="statusbar flex h-6 shrink-0 items-center justify-between gap-4 border-t px-2 text-[11px] tabular-nums"
	style="background-color: var(--color-statusbar-bg); color: var(--color-statusbar-fg); border-color: var(--color-border);"
>
	<div class="flex min-w-0 items-center gap-2">
		<span class="inline-flex items-center gap-1" style="color: var(--color-accent)" aria-hidden="true">
			<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="M12 2C7 2 3 6 3 11c0 4.4 3.6 8 8 8h1v3l4-3c3-1 6-4 6-8 0-5-4-9-9-9Zm0 2a7 7 0 0 1 7 7c0 2.8-2.2 5.2-5 6l-.5.2-.5-.5v-2H12a6 6 0 1 1 0-12Z"
				/>
			</svg>
			main
		</span>
	</div>
	<div class="min-w-0 flex-1 truncate text-center" style="color: var(--color-muted)">
		{statusCenter($page.url.pathname)}
	</div>
	<div class="flex shrink-0 flex-wrap items-center justify-end gap-x-3 gap-y-0.5" style="color: var(--color-muted)">
		<span class="hidden sm:inline font-mono text-[10px] opacity-90" title="Toggle terminal"
			>{'Ctrl+` Terminal'}</span
		>
		<span>Ln 1, Col 1</span>
		<span class="hidden sm:inline">UTF-8</span>
		<span>JetBrains Mono</span>
	</div>
</footer>

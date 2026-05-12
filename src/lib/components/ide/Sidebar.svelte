<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data';

	function readmeActive(path: string, hash: string) {
		return path === '/' && hash !== '#package-json' && hash !== '#changelog';
	}
</script>

<nav
	class="sidebar flex w-[240px] shrink-0 flex-col border-r text-xs leading-relaxed"
	style="background-color: var(--color-sidebar-bg); border-color: var(--color-border); color: var(--color-muted);"
	aria-label="File explorer"
>
	<div
		class="sidebar-header shrink-0 px-3 py-2 font-semibold uppercase tracking-wide"
		style="color: var(--color-muted); border-bottom: 1px solid var(--color-border);"
	>
		Explorer
	</div>
	<div class="min-h-0 flex-1 overflow-auto px-2 py-2">
		<div class="mb-2 pl-1" style="color: var(--color-accent)">OPEN EDITORS</div>
		<a
			href="/"
			class="sidebar-link mb-3 block pl-3"
			class:sidebar-link--active={readmeActive($page.url.pathname, $page.url.hash)}
		>
			README.md
		</a>

		<div class="mb-1 pl-1" style="color: var(--color-accent)">portfolio</div>
		<div class="pl-2">
			<a
				href="/projects"
				class="sidebar-link flex items-start gap-1"
				class:sidebar-link--active={$page.url.pathname === '/projects' ||
					$page.url.pathname.startsWith('/projects/')}
			>
				<span class="pointer-events-none select-none" style="color: var(--color-muted)">▾</span>
				<span>projects</span>
			</a>
			<div class="pl-4">
				{#each projects as p (p.slug)}
					<a
						href="/projects/{p.slug}"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === `/projects/${p.slug}`}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>{p.slug}</span>
					</a>
				{/each}
			</div>
		</div>

		<div class="mt-3 pl-2">
			<div class="flex items-start gap-1">
				<span class="select-none" style="color: var(--color-muted)">▾</span>
				<span style="color: var(--color-muted)">skills</span>
			</div>
			<div class="pl-4">
				<a
					href="/#package-json"
					class="sidebar-link flex items-start gap-1"
					class:sidebar-link--active={$page.url.pathname === '/' && $page.url.hash === '#package-json'}
				>
					<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
					<span>package.json</span>
				</a>
			</div>
		</div>

		<div class="mt-3 pl-2">
			<a
				href="/#changelog"
				class="sidebar-link flex items-start gap-1"
				class:sidebar-link--active={$page.url.pathname === '/' && $page.url.hash === '#changelog'}
			>
				<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
				<span>CHANGELOG.md</span>
			</a>
		</div>

		<div class="mt-3 pl-2">
			<a
				href="/contact"
				class="sidebar-link flex items-start gap-1"
				class:sidebar-link--active={$page.url.pathname === '/contact'}
			>
				<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
				<span>Terminal</span>
			</a>
		</div>
	</div>
</nav>

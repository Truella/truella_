<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data';

	function readmeActive(path: string, hash: string) {
		return path === '/' && hash !== '#package-json' && hash !== '#changelog';
	}

	let projectsOpen = $state(true);
	let skillsOpen = $state(true);
	let experienceOpen = $state(true);
	let contactOpen = $state(true);

	$effect(() => {
		const path = $page.url.pathname;
		if (path === '/projects' || path.startsWith('/projects/')) {
			projectsOpen = true;
		}
	});
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
			<button
				type="button"
				class="sidebar-folder mb-0.5 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				style="color: var(--color-muted);"
				onclick={() => (projectsOpen = !projectsOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{projectsOpen ? '▾' : '▸'}</span>
				<span class="min-w-0" style="color: var(--color-muted)">projects/</span>
			</button>
			{#if projectsOpen}
				<div class="mb-2 pl-4">
					<a
						href="/projects"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/projects'}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>+page.svelte</span>
					</a>
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
			{/if}

			<button
				type="button"
				class="sidebar-folder mb-0.5 mt-2 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				style="color: var(--color-muted);"
				onclick={() => (skillsOpen = !skillsOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{skillsOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">skills</span>
			</button>
			{#if skillsOpen}
				<div class="mb-2 pl-4">
					<a
						href="/#package-json"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/' && $page.url.hash === '#package-json'}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>package.json</span>
					</a>
					<span class="mt-1 block pl-6 opacity-60">tsconfig.json</span>
				</div>
			{/if}

			<button
				type="button"
				class="sidebar-folder mb-0.5 mt-2 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				style="color: var(--color-muted);"
				onclick={() => (experienceOpen = !experienceOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{experienceOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">experience</span>
			</button>
			{#if experienceOpen}
				<div class="mb-2 pl-4">
					<a
						href="/#changelog"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/' && $page.url.hash === '#changelog'}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>CHANGELOG.md</span>
					</a>
					<span class="mt-1 block pl-6 opacity-60">release-notes.md</span>
				</div>
			{/if}

			<button
				type="button"
				class="sidebar-folder mb-0.5 mt-2 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				style="color: var(--color-muted);"
				onclick={() => (contactOpen = !contactOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{contactOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">contact</span>
			</button>
			{#if contactOpen}
				<div class="pl-4">
					<a
						href="/contact"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/contact'}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>Terminal</span>
					</a>
					<span class="mt-1 block pl-6 opacity-60">.env.example</span>
				</div>
			{/if}
		</div>
	</div>
</nav>

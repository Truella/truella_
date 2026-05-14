<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { tick } from 'svelte';
	import { projects } from '$lib/data';
	import { activeSection } from '$lib/stores/activeSection';

	const SECTION_IDS = ['readme-section', 'package-section', 'changelog-section'] as const;

	function isPackageHash(hash: string) {
		return hash === '#package-section' || hash === '#package-json';
	}

	function isChangelogHash(hash: string) {
		return hash === '#changelog-section' || hash === '#changelog';
	}

	function readmeSidebarActive(path: string, hash: string, section: string) {
		if (path !== '/') return false;
		if (section === 'readme-section') return true;
		if (section === 'package-section' || section === 'changelog-section') return false;
		return !isPackageHash(hash) && !isChangelogHash(hash);
	}

	function packageJsonSidebarActive(path: string, hash: string, section: string) {
		if (path !== '/') return false;
		if (section === 'package-section') return true;
		if (section === '') return isPackageHash(hash);
		return false;
	}

	function changelogSidebarActive(path: string, hash: string, section: string) {
		if (path !== '/') return false;
		if (section === 'changelog-section') return true;
		if (section === '') return isChangelogHash(hash);
		return false;
	}

	let projectsOpen = $state(true);
	let skillsOpen = $state(true);
	let experienceOpen = $state(true);
	let contactOpen = $state(true);
	let funOpen = $state(true);

	$effect(() => {
		const path = $page.url.pathname;
		if (path === '/projects' || path.startsWith('/projects/')) {
			projectsOpen = true;
		}
	});

	$effect(() => {
		if (!browser) return;
		const path = $page.url.pathname;

		if (path !== '/') {
			activeSection.set('');
			return;
		}

		const ratios = new Map<string, number>(SECTION_IDS.map((id) => [id, 0]));
		let obs: IntersectionObserver | null = null;
		let cancelled = false;

		void tick().then(() => {
			if (cancelled) return;

			obs = new IntersectionObserver(
				(entries) => {
					for (const e of entries) {
						const id = (e.target as HTMLElement).id;
						if (SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) {
							ratios.set(id, e.intersectionRatio);
						}
					}
					let best: (typeof SECTION_IDS)[number] = 'readme-section';
					let bestR = -1;
					for (const id of SECTION_IDS) {
						const r = ratios.get(id) ?? 0;
						if (r > bestR) {
							bestR = r;
							best = id;
						}
					}
					if (bestR > 0) {
						activeSection.set(best);
					}
				},
				{ threshold: [0, 0.3, 0.5, 0.75, 1] }
			);

			for (const id of SECTION_IDS) {
				const el = document.getElementById(id);
				if (el) obs.observe(el);
			}
		});

		return () => {
			cancelled = true;
			obs?.disconnect();
		};
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
			class="sidebar-link mb-4 block pl-3"
			class:sidebar-link--active={readmeSidebarActive(
				$page.url.pathname,
				$page.url.hash,
				$activeSection
			)}
			aria-current={readmeSidebarActive($page.url.pathname, $page.url.hash, $activeSection)
				? 'page'
				: undefined}
		>
			README.md
		</a>

		<div class="mb-1 pl-1" style="color: var(--color-accent)">portfolio</div>
		<div class="pl-2">
			<button
				type="button"
				class="sidebar-folder mb-0.5 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				style="color: var(--color-muted);"
				aria-expanded={projectsOpen}
				aria-controls="sidebar-folder-projects"
				onclick={() => (projectsOpen = !projectsOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{projectsOpen ? '▾' : '▸'}</span>
				<span class="min-w-0" style="color: var(--color-muted)">projects/</span>
			</button>
			{#if projectsOpen}
				<div id="sidebar-folder-projects" class="mb-2 flex flex-col gap-1.5 pl-4">
					<a
						href="/projects"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/projects'}
						aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>+page.svelte</span>
					</a>
					{#each projects as p (p.slug)}
						<a
							href="/projects/{p.slug}"
							class="sidebar-link flex items-start gap-1"
							class:sidebar-link--active={$page.url.pathname === `/projects/${p.slug}`}
							aria-current={$page.url.pathname === `/projects/${p.slug}` ? 'page' : undefined}
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
				aria-expanded={skillsOpen}
				aria-controls="sidebar-folder-skills"
				onclick={() => (skillsOpen = !skillsOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{skillsOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">skills</span>
			</button>
			{#if skillsOpen}
				<div id="sidebar-folder-skills" class="mb-2 flex flex-col gap-1.5 pl-4">
					<a
						href="/#package-section"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={packageJsonSidebarActive(
							$page.url.pathname,
							$page.url.hash,
							$activeSection
						)}
						aria-current={packageJsonSidebarActive(
							$page.url.pathname,
							$page.url.hash,
							$activeSection
						)
							? 'page'
							: undefined}
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
				aria-expanded={experienceOpen}
				aria-controls="sidebar-folder-experience"
				onclick={() => (experienceOpen = !experienceOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{experienceOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">experience</span>
			</button>
			{#if experienceOpen}
				<div id="sidebar-folder-experience" class="mb-2 flex flex-col gap-1.5 pl-4">
					<a
						href="/#changelog-section"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={changelogSidebarActive(
							$page.url.pathname,
							$page.url.hash,
							$activeSection
						)}
						aria-current={changelogSidebarActive(
							$page.url.pathname,
							$page.url.hash,
							$activeSection
						)
							? 'page'
							: undefined}
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
				aria-expanded={contactOpen}
				aria-controls="sidebar-folder-contact"
				onclick={() => (contactOpen = !contactOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{contactOpen ? '▾' : '▸'}</span>
				<span class="min-w-0">contact</span>
			</button>
			{#if contactOpen}
				<div id="sidebar-folder-contact" class="flex flex-col gap-1.5 pl-4">
					<a
						href="/contact"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/contact'}
						aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}
					>
						<span class="pointer-events-none select-none" style="color: var(--color-muted)">▸</span>
						<span>Terminal</span>
					</a>
					<span class="mt-1 block pl-6 opacity-60">.env.example</span>
				</div>
			{/if}

			<button
				type="button"
				class="sidebar-folder sidebar-folder--fun mb-0.5 mt-2 flex w-full items-start gap-1 rounded px-0.5 py-0.5 text-left"
				aria-expanded={funOpen}
				aria-controls="sidebar-folder-fun"
				onclick={() => (funOpen = !funOpen)}
			>
				<span class="w-3 shrink-0 select-none" aria-hidden="true">{funOpen ? '▾' : '▸'}</span>
				<span class="min-w-0 sidebar-folder-fun-label">fun/</span>
			</button>
			{#if funOpen}
				<div id="sidebar-folder-fun" class="flex flex-col gap-1.5 pl-4">
					<a
						href="/play"
						class="sidebar-link flex items-start gap-1"
						class:sidebar-link--active={$page.url.pathname === '/play'}
						aria-current={$page.url.pathname === '/play' ? 'page' : undefined}
					>
						<span class="pointer-events-none select-none" aria-hidden="true">🐛</span>
						<span>debug.ts</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	.sidebar-folder-fun-label {
		color: #f59e0b;
	}
</style>

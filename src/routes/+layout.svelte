<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import '../app.css';
	import { editorTabLabel } from '$lib/editorTabLabel';
	import TitleBar from '$lib/components/ide/TitleBar.svelte';
	import Sidebar from '$lib/components/ide/Sidebar.svelte';
	import StatusBar from '$lib/components/ide/StatusBar.svelte';
	import Terminal from '$lib/components/sections/Terminal.svelte';
	import MaybeFly from '$lib/components/ui/MaybeFly.svelte';
	import CursorFollower from '$lib/components/ui/CursorFollower.svelte';
	import { terminal } from '$lib/stores/terminal';
	import { theme } from '$lib/stores/theme';
	import { sidebar } from '$lib/stores/sidebar';
	import { fly } from 'svelte/transition';

	let { children } = $props();

	$effect(() => {
		if (!browser) return;
		const unsub = theme.subscribe((value) => {
			document.documentElement.setAttribute('data-theme', value);
		});
		return unsub;
	});

	// Close sidebar on route change on mobile
	$effect(() => {
		const path = $page.url.pathname;
		if (browser && window.innerWidth < 768) {
			sidebar.close();
		}
	});

	function onGlobalKeydown(e: KeyboardEvent) {
		if (!browser || e.repeat) return;
		if (!e.ctrlKey || e.metaKey || e.altKey) return;
		if (e.code !== 'Backquote' && e.key !== '`') return;
		e.preventDefault();
		terminal.toggle();
	}
</script>

<svelte:window onkeydown={onGlobalKeydown} />

<svelte:head>
	<title>portfolio.dev</title>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<CursorFollower />

<div class="ide-frame">
	<div
		class="ide-root flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden"
		style="background-color: var(--color-bg); color: var(--color-muted);"
	>
		<TitleBar />
		<div class="flex min-h-0 flex-1 overflow-hidden">

			<!-- Mobile backdrop -->
			{#if $sidebar}
				<div
					class="fixed inset-0 z-20 md:hidden"
					style="background: rgba(0,0,0,0.5);"
					role="presentation"
					onclick={() => sidebar.close()}
				></div>
			{/if}

			<!-- Sidebar: drawer on mobile, fixed column on desktop -->
			<div
				class="fixed inset-y-0 left-0 z-30 md:relative md:z-auto md:block"
				class:hidden={!$sidebar}
			>
				{#if $sidebar}
					<div
						class="h-full"
						in:fly={{ x: -280, duration: 200 }}
					>
						<Sidebar />
					</div>
				{/if}
			</div>

			<main
				id="main-content"
				class="ide-editor flex min-w-0 flex-1 flex-col"
				style="background-color: var(--color-editor-bg);"
				tabindex="-1"
			>
				<div
					class="editor-tab-row flex h-9 shrink-0 items-end gap-px border-b px-1 pt-1"
					style="background-color: var(--color-tab-bar); border-color: var(--color-border);"
				>
					<div
						class="flex h-8 max-w-[220px] items-center gap-2 rounded-t border border-b-0 px-3 text-xs"
						style="background-color: var(--color-tab-active); border-color: var(--color-border); color: var(--color-accent);"
					>
						<span class="opacity-80" aria-hidden="true">⌘</span>
						<span class="truncate font-medium">{editorTabLabel($page.url.pathname, $page.url.hash)}</span>
					</div>
					<div
						class="h-8 flex-1 cursor-default border-b"
						style="border-color: var(--color-border);"
					></div>
				</div>
				<div class="editor-surface min-h-0 flex-1 overflow-auto p-6">
					{#key $page.url.pathname}
						<MaybeFly class="min-h-0 w-full" y={8} duration={200}>
							{@render children()}
						</MaybeFly>
					{/key}
				</div>
				<Terminal forceOpen={$page.url.pathname === '/contact'} />
			</main>
		</div>
		<StatusBar />
	</div>
</div>
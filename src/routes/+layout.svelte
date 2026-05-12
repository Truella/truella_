<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import { editorTabLabel } from '$lib/editorTabLabel';
	import TitleBar from '$lib/components/ide/TitleBar.svelte';
	import Sidebar from '$lib/components/ide/Sidebar.svelte';
	import StatusBar from '$lib/components/ide/StatusBar.svelte';
	import { prefersReducedMotion } from '$lib/stores/motion';
	import { theme } from '$lib/stores/theme';

	let { children } = $props();

	$effect(() => {
		if (!browser) return;
		const unsub = theme.subscribe((value) => {
			document.documentElement.setAttribute('data-theme', value);
		});
		return unsub;
	});
</script>

<svelte:head>
	<title>portfolio.dev</title>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div
	class="ide-root flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden"
	style="background-color: var(--color-bg); color: var(--color-muted);"
>
	<TitleBar />
	<div class="flex min-h-0 flex-1">
		<Sidebar />
		<main
			class="ide-editor flex min-w-0 flex-1 flex-col"
			style="background-color: var(--color-editor-bg);"
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
					{#if !$prefersReducedMotion}
						<div in:fly={{ y: 8, duration: 200 }}>
							{@render children()}
						</div>
					{:else}
						{@render children()}
					{/if}
				{/key}
			</div>
		</main>
	</div>
	<StatusBar />
</div>

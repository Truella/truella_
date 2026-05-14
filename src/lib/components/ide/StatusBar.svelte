<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { projects } from '$lib/data';
	import { sessionFormatted } from '$lib/stores/session';

	let mobileTipOpen = $state(false);
	let mobileDismissTimer: ReturnType<typeof setTimeout> | null = null;

	function clearMobileDismiss() {
		if (mobileDismissTimer) {
			clearTimeout(mobileDismissTimer);
			mobileDismissTimer = null;
		}
	}

	function onSessionTimerClick() {
		if (!browser) return;
		if (!window.matchMedia('(hover: none)').matches) return;
		mobileTipOpen = !mobileTipOpen;
		clearMobileDismiss();
		if (mobileTipOpen) {
			mobileDismissTimer = setTimeout(() => {
				mobileTipOpen = false;
				mobileDismissTimer = null;
			}, 3000);
		}
	}

	onDestroy(() => {
		clearMobileDismiss();
	});

	function openPath(pathname: string): string {
		if (!pathname || pathname === '/') return '/';
		return pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
	}

	function statusCenter(pathname: string): string {
		const path = openPath(pathname);
		if (path === '/play') return 'fun / debug.ts';
		const m = /^\/projects\/([^/]+)$/.exec(path);
		if (m) {
			const proj = projects.find((x) => x.slug === m[1]);
			if (proj) return `projects / ${proj.title}`;
		}
		return path;
	}
</script>

<div class="statusbar-stack shrink-0">
	<footer
		class="statusbar flex h-6 items-center justify-between gap-4 border-t px-2 text-[11px] tabular-nums"
		style="background-color: var(--color-statusbar-bg); color: var(--color-statusbar-fg); border-color: var(--color-border);"
	>
		<div class="flex min-w-0 items-center gap-2">
			{#if $page.url.pathname === '/play'}
				<span class="status-game-mode font-mono text-[10px] font-semibold tracking-wide">GAME MODE</span>
			{:else}
				<span class="inline-flex items-center gap-1" style="color: var(--color-accent)" aria-hidden="true">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path
							d="M12 2C7 2 3 6 3 11c0 4.4 3.6 8 8 8h1v3l4-3c3-1 6-4 6-8 0-5-4-9-9-9Zm0 2a7 7 0 0 1 7 7c0 2.8-2.2 5.2-5 6l-.5.2-.5-.5v-2H12a6 6 0 1 1 0-12Z"
						/>
					</svg>
					main
				</span>
			{/if}
		</div>
		<div class="min-w-0 flex-1 truncate text-center" style="color: var(--color-muted)">
			{statusCenter($page.url.pathname)}
		</div>
		<div
			class="flex shrink-0 flex-wrap items-center justify-end gap-x-3 gap-y-0.5"
			style="color: var(--color-muted);"
		>
			<span class="hidden sm:inline font-mono text-[10px] opacity-90" title="Toggle terminal"
				>{'Ctrl+` Terminal'}</span
			>
			<span>Ln 1, Col 1</span>
			<span class="hidden sm:inline">UTF-8</span>
			<span>JetBrains Mono</span>
			<div class="session-timer-host">
				<button
					type="button"
					class="session-timer-btn"
					style="pointer-events: auto;"
					aria-label="Session timer — tap to learn more"
					aria-describedby="session-timer-tooltip"
					onclick={onSessionTimerClick}
				>
					<span class="session-timer-accent" aria-hidden="true">⏱</span>
					<span class="session-timer-mono">{$sessionFormatted}</span>
				</button>
				<div
					id="session-timer-tooltip"
					role="tooltip"
					class="session-tooltip"
					class:session-tooltip--mobile-open={mobileTipOpen}
				>
					⏱ time spent in this session
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	.statusbar-stack {
		position: relative;
	}

	.status-game-mode {
		color: #f59e0b;
	}

	.session-timer-host {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.session-timer-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		margin: 0;
		padding: 0 0.15rem;
		border: none;
		background: transparent;
		font: inherit;
		color: inherit;
		cursor: default;
	}

	.session-timer-accent {
		color: var(--color-accent);
	}

	.session-timer-mono {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 0.6875rem;
	}

	/* Fixed + inset from layout edge so ide-root overflow:hidden does not clip the tooltip */
	.session-tooltip {
		position: fixed;
		z-index: 100;
		padding: 0.3rem 0.6rem;
		font-size: 0.7rem;
		color: #a0a0a0;
		background-color: #141414;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		text-align: center;
		white-space: normal;
		max-width: min(22rem, calc(100vw - 1rem));
		width: max-content;
		box-sizing: border-box;
		opacity: 0;
		transition: opacity 150ms ease;
		pointer-events: none;
	}

	@media (hover: hover) {
		.session-tooltip {
			bottom: calc(1.5rem + 6px);
			/* Match .ide-frame > .ide-root max-width: 1400px centering */
			right: max(
				0.5rem,
				calc((100vw - min(100vw, 1400px)) / 2 + 0.5rem),
				env(safe-area-inset-right, 0px)
			);
			left: auto;
		}

		.session-timer-host:hover .session-tooltip,
		.session-timer-host:focus-within .session-tooltip {
			opacity: 1;
		}
	}

	@media (hover: none) {
		.session-tooltip {
			bottom: 1.5rem;
			left: max(0.5rem, env(safe-area-inset-left, 0px));
			right: max(0.5rem, env(safe-area-inset-right, 0px));
			width: auto;
			max-width: none;
		}

		.session-tooltip--mobile-open {
			opacity: 1;
		}

		.session-timer-host:hover .session-tooltip:not(.session-tooltip--mobile-open) {
			opacity: 0;
		}
	}
</style>

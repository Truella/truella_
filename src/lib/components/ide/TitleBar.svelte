<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { sidebar } from '$lib/stores/sidebar';
</script>

<header
	class="titlebar flex h-9 shrink-0 items-center justify-between border-b px-3"
	style="background-color: var(--color-chrome); border-color: var(--color-border);"
>
	<!-- Left: hamburger (mobile) + window dots + app name -->
	<div class="flex items-center gap-3">
		<!-- Hamburger: mobile only -->
		<button
			type="button"
			class="flex h-7 w-7 items-center justify-center rounded md:hidden"
			style="color: var(--color-muted);"
			aria-label="Toggle file explorer"
			aria-expanded={$sidebar}
			onclick={() => sidebar.toggle()}
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</button>

		<!-- Window dots: desktop only -->
		<div class="hidden items-center gap-1.5 md:flex" aria-hidden="true">
			<span class="h-3 w-3 rounded-full" style="background: #ff5f57"></span>
			<span class="h-3 w-3 rounded-full" style="background: #febc2e"></span>
			<span class="h-3 w-3 rounded-full" style="background: #28c840"></span>
		</div>

		<span class="text-xs" aria-hidden="true">
			<span style="color: var(--color-accent)">portfolio.dev</span>
			<span class="opacity-60"> — </span>
			<span style="color: var(--color-muted)">Developer</span>
		</span>
	</div>

	<!-- Right: theme toggle -->
	<button
		type="button"
		class="flex h-7 w-7 items-center justify-center rounded transition-opacity hover:opacity-90"
		style="color: var(--color-accent);"
		aria-label={$theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		onclick={() => theme.toggle()}
	>
		{#if $theme === 'dark'}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
				<path
					d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		{:else}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M21 14.5A7.5 7.5 0 0 1 9.5 3a7.5 7.5 0 1 0 11.5 11.5Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	</button>
</header>
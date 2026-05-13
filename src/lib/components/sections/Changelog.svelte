<script lang="ts">
	import { experience } from '$lib/data';
	import ChangelogBlock from './ChangelogBlock.svelte';
</script>

<div id="changelog" class="chg-root">
	<div class="chg-tab">
		<svg class="chg-tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M6 3v18M6 8c2.2 0 4-1.8 4-4M6 8c0 2.2 1.8 4 4 4M14 21V3M14 16c2.2 0 4 1.8 4 4M14 16c0-2.2 1.8-4 4-4"
				stroke="currentColor"
				stroke-width="1.65"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<circle cx="6" cy="8" r="2" fill="currentColor" />
			<circle cx="14" cy="16" r="2" fill="currentColor" />
		</svg>
		<span class="chg-tab-label">CHANGELOG.md</span>
	</div>

	<div class="chg-panel">
		<div class="chg-doc" aria-label="Experience as changelog">
			{#each experience as exp, i (exp.company + exp.period)}
				<ChangelogBlock exp={exp} index={i} last={i === experience.length - 1} />
			{/each}
		</div>
	</div>
</div>

<style>
	.chg-root {
		margin: 0 -1.5rem;
		scroll-margin-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.chg-tab {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.5rem 1.5rem;
		border-bottom: 1px solid var(--color-border);
		background-color: var(--color-tab-bar);
		color: var(--color-accent);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.chg-tab-icon {
		flex-shrink: 0;
		opacity: 0.9;
	}

	.chg-tab-label {
		font-family: inherit;
	}

	.chg-panel {
		padding: 1.25rem 1.5rem 2.5rem;
		background-color: var(--color-editor-bg);
	}

	.chg-doc {
		font-family: inherit;
		max-width: 52rem;
	}
</style>

<script lang="ts">
	import type { Experience } from '$lib/types';
	import { inview } from '$lib/actions/inview';
	import MaybeFly from '$lib/components/ui/MaybeFly.svelte';

	let { exp, index, last = false }: { exp: Experience; index: number; last?: boolean } = $props();

	let shown = $state(false);
</script>

<div
	class="chg-block-observe"
	use:inview={{ threshold: 0.2, onInview: () => (shown = true) }}
>
	{#if shown}
		<MaybeFly class="chg-block" y={16} duration={200} delay={index * 100}>
			{#snippet children()}
				<div class="chg-row-title">
					<h2 class="chg-h2">
						<span class="chg-hash">##</span>
						<span class="chg-version">{exp.version}</span>
						<span class="chg-dash"> — </span>
						<span class="chg-company">{exp.company}</span>
					</h2>
					<span class="chg-period">{exp.period}</span>
				</div>
				<h3 class="chg-h3">### {exp.role}</h3>
				<ul class="chg-ul">
					{#each exp.highlights as line (line)}
						<li class="chg-li"><span class="chg-md-dash">- </span>{line}</li>
					{/each}
				</ul>
				{#if !last}
					<hr class="chg-rule" />
				{/if}
			{/snippet}
		</MaybeFly>
	{/if}
</div>

<style>
	.chg-block-observe {
		min-height: 2rem;
	}

	:global(.chg-block) {
		padding-bottom: 0.25rem;
	}

	.chg-row-title {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.35rem;
	}

	.chg-h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.35;
		flex: 1;
		min-width: 0;
		font-family: inherit;
	}

	.chg-hash {
		margin-right: 0.35rem;
		color: var(--color-muted);
		opacity: 0.75;
		font-weight: 600;
	}

	.chg-version {
		color: var(--color-accent);
		font-weight: 600;
	}

	.chg-dash {
		color: var(--color-muted);
		font-weight: 600;
	}

	.chg-company {
		color: var(--color-muted);
		font-weight: 600;
	}

	.chg-period {
		flex-shrink: 0;
		text-align: right;
		font-size: 0.8125rem;
		line-height: 1.45;
		color: var(--color-muted);
		opacity: 0.9;
		padding-top: 0.15rem;
	}

	.chg-h3 {
		margin: 0 0 0.65rem;
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--color-muted);
		opacity: 0.88;
		font-family: inherit;
	}

	.chg-ul {
		margin: 0 0 1rem;
		padding: 0;
		list-style: none;
	}

	.chg-li {
		margin: 0 0 0.35rem;
		padding-left: 0;
		font-size: 0.8125rem;
		line-height: 1.55;
		color: var(--color-muted);
	}

	.chg-md-dash {
		color: var(--color-muted);
		opacity: 0.65;
	}

	.chg-rule {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: 1rem 0 1.25rem;
		opacity: 0.85;
	}
</style>

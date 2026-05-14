<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import { skills } from '$lib/data';
	import MaybeFade from '$lib/components/ui/MaybeFade.svelte';

	let revealed = $state(false);

	const depEntries = Object.entries(skills.dependencies);
	const devEntries = Object.entries(skills.devDependencies);
	const scriptEntries = Object.entries(skills.scripts);
</script>

<div
	id="package-section"
	class="pkg-root"
	use:inview={{ threshold: 0.2, onInview: () => (revealed = true) }}
>
	<div class="pkg-tab">
		<svg class="pkg-tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M9 5h6v2H9V5zm0 4h6v2H9V9zm0 4h10v2H9v-2z"
				fill="currentColor"
				opacity="0.35"
			/>
			<path
				d="M6 4h2v16H6V4zm10 0h2v16h-2V4z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>
		</svg>
		<span class="pkg-tab-label">package.json</span>
	</div>

	<div class="pkg-panel">
		{#if revealed}
			<div class="pkg-json" aria-label="Skills as package.json">
				<div class="pkg-line"><span class="pkg-punct">{`{`}</span></div>

				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-key">"dependencies"</span><span class="pkg-punct">: {`{`}</span>
				</div>
				{#each depEntries as [key, value], i (key)}
					<MaybeFade delay={i * 60} class="pkg-line">
						{#snippet children()}
							<span class="pkg-indent2"></span>
							<span class="pkg-key">{JSON.stringify(key)}</span><span class="pkg-punct">: </span><span
								class="pkg-str">{JSON.stringify(value)}</span
							><span class="pkg-punct">{i < depEntries.length - 1 ? ',' : ''}</span>
						{/snippet}
					</MaybeFade>
				{/each}
				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-punct">{`},`}</span>
				</div>

				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-key">"devDependencies"</span><span class="pkg-punct">: {`{`}</span>
				</div>
				{#each devEntries as [key, value], i (key)}
					<MaybeFade delay={depEntries.length * 60 + i * 60} class="pkg-line">
						{#snippet children()}
							<span class="pkg-indent2"></span>
							<span class="pkg-key">{JSON.stringify(key)}</span><span class="pkg-punct">: </span><span
								class="pkg-str">{JSON.stringify(value)}</span
							><span class="pkg-punct">{i < devEntries.length - 1 ? ',' : ''}</span>
						{/snippet}
					</MaybeFade>
				{/each}
				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-punct">{`},`}</span>
				</div>

				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-key">"scripts"</span><span class="pkg-punct">: {`{`}</span>
				</div>
				{#each scriptEntries as [key, value], i (key)}
					<MaybeFade
						delay={depEntries.length * 60 + devEntries.length * 60 + i * 60}
						class="pkg-line"
					>
						{#snippet children()}
							<span class="pkg-indent2"></span>
							<span class="pkg-key">{JSON.stringify(key)}</span><span class="pkg-punct">: </span><span
								class="pkg-str">{JSON.stringify(value)}</span
							><span class="pkg-punct">{i < scriptEntries.length - 1 ? ',' : ''}</span>
						{/snippet}
					</MaybeFade>
				{/each}
				<div class="pkg-line">
					<span class="pkg-indent"></span>
					<span class="pkg-punct">{`}`}</span>
				</div>

				<div class="pkg-line"><span class="pkg-punct">{`}`}</span></div>
			</div>
		{/if}
	</div>
</div>

<style>
	.pkg-root {
		margin: 0 -1.5rem;
		scroll-margin-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.pkg-tab {
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

	.pkg-tab-icon {
		flex-shrink: 0;
		opacity: 0.9;
	}

	.pkg-tab-label {
		font-family: inherit;
	}

	.pkg-panel {
		padding: 1.25rem 1.5rem 2.5rem;
		background-color: var(--color-editor-bg);
		min-height: 8rem;
	}

	.pkg-json {
		font-family: inherit;
		font-size: 0.8125rem;
		line-height: 1.65;
		white-space: pre-wrap;
		word-break: break-word;
	}

	:global(.pkg-line) {
		display: block;
	}

	.pkg-indent {
		display: inline-block;
		width: 2ch;
	}

	.pkg-indent2 {
		display: inline-block;
		width: 4ch;
	}

	.pkg-key {
		color: #4ade80;
	}

	.pkg-str {
		color: #f59e0b;
	}

	.pkg-punct {
		color: var(--color-muted);
		opacity: 0.85;
	}
</style>

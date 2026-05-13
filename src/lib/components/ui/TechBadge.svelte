<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<span class="tech-badge">{label}</span>

<style>
	.tech-badge {
		display: inline-block;
		margin: 0 0.35rem 0.35rem 0;
		padding: 0.12rem 0.45rem;
		font-family: inherit;
		font-size: 0.6875rem;
		font-weight: 500;
		line-height: 1.3;
		color: var(--color-muted);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: transparent;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.tech-badge:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>

<script lang="ts">
	import type { Project } from '$lib/types';
	import TechBadge from '$lib/components/ui/TechBadge.svelte';

	let { project }: { project: Project } = $props();

	const excerpt = $derived(
		project.description.length <= 100
			? project.description
			: `${project.description.slice(0, 97)}...`
	);
</script>

<article class="project-card">
	<a href="/projects/{project.slug}" class="project-card-link">
		<h2 class="project-card-title">{project.title}</h2>
		<p class="project-card-desc">{excerpt}</p>
		<div class="project-card-thumb-wrap">
			<img
				class="project-card-thumb"
				src={project.screenshot}
				alt={`${project.title} project screenshot`}
				width="1200"
				height="675"
				loading="lazy"
				decoding="async"
			/>
		</div>
		<div class="project-card-stack">
			{#each project.stack as tech (tech)}
				<TechBadge label={tech} />
			{/each}
		</div>
	</a>
	<div class="project-card-actions">
		{#if project.liveUrl}
			<a
				class="project-card-icon"
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`View ${project.title} live site in a new tab`}
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path
						d="M14 3h7v7M10 14L21 3M21 3v7h-7M10 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		{/if}
		<a
			class="project-card-icon"
			href={project.githubUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`View ${project.title} on GitHub`}
		>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.69.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.52 2.35 1.08 2.93.83.09-.65.35-1.08.64-1.33-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
				/>
			</svg>
		</a>
	</div>
</article>

<style>
	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background-color: color-mix(in srgb, var(--color-chrome) 35%, var(--color-editor-bg));
		transition:
			border-color 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.project-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}

	.project-card-link {
		display: block;
		padding: 1rem 1rem 0.5rem;
		text-decoration: none;
		color: inherit;
		flex: 1;
		min-width: 0;
	}

	.project-card-title {
		margin: 0 0 0.5rem;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--color-muted);
	}

	.project-card-desc {
		margin: 0 0 0.75rem;
		font-family: inherit;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: color-mix(in srgb, var(--color-muted) 88%, var(--color-bg));
	}

	.project-card-thumb-wrap {
		margin: 0 0 0.75rem;
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		background-color: color-mix(in srgb, var(--color-chrome) 40%, var(--color-editor-bg));
		aspect-ratio: 16 / 9;
	}

	.project-card-thumb {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.project-card-stack {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 0;
		margin-bottom: 0.25rem;
	}

	.project-card-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.35rem;
		padding: 0 0.75rem 0.75rem;
	}

	.project-card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.35rem;
		border-radius: 4px;
		color: var(--color-muted);
		transition:
			color 0.15s ease,
			background-color 0.15s ease;
	}

	.project-card-icon:hover {
		color: var(--color-accent);
		background-color: color-mix(in srgb, var(--color-accent) 10%, transparent);
	}
</style>

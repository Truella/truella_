<script lang="ts">
	import { projects } from '$lib/data';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
</script>

<div class="projects-page">
	<p class="projects-file-comment">
		{'/* projects/ — '}{projects.length}{' items */'}
	</p>
	<div class="projects-grid">
		{#each projects as project (project.slug)}
			<ProjectCard {project} />
		{/each}
	</div>
</div>

<style>
	.projects-page {
		max-width: 72rem;
	}

	.projects-file-comment {
		margin: 0 0 1.25rem;
		font-family: inherit;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: color-mix(in srgb, var(--color-muted) 65%, transparent);
		white-space: pre-wrap;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}
	}
</style>

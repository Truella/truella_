<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
</script>

<article class="project-detail" aria-label={project.title}>
	<pre class="proj-file-header">{`/**
 * ${project.title}
 * ${project.description}
 */`}</pre>

	<div class="proj-code-block">
		<p class="proj-line">
			<span class="proj-kw">import</span> <span class="proj-punct">{'{'}</span>
		</p>
		{#each project.stack as tech, i (tech)}
			<p class="proj-line proj-line-indent">
				<span class="proj-tech">{tech}</span>{#if i < project.stack.length - 1}<span class="proj-punct">,</span>{/if}
			</p>
		{/each}
		<p class="proj-line">
			<span class="proj-punct">{'}'}</span> <span class="proj-kw">from</span><span class="proj-str"
				>{' \'dependencies\''}</span
			><span class="proj-punct">;</span>
		</p>
	</div>

	<div class="proj-exports">
		{#if project.liveUrl}
			<p class="proj-line">
				<span class="proj-kw">export</span><span class="proj-punct"> </span><span class="proj-kw">const</span
				><span class="proj-punct"> </span>				<span class="proj-ident">liveUrl</span><span class="proj-punct"> = </span><a
					class="proj-link-str"
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer">'{project.liveUrl}'</a
				><span class="proj-punct">;</span>
			</p>
		{/if}
		<p class="proj-line">
			<span class="proj-kw">export</span><span class="proj-punct"> </span><span class="proj-kw">const</span
			><span class="proj-punct"> </span>			<span class="proj-ident">githubUrl</span><span class="proj-punct"> = </span><a
				class="proj-link-str"
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer">'{project.githubUrl}'</a
			><span class="proj-punct">;</span>
		</p>
	</div>

	<div class="proj-shot-wrap">
		<img
			class="proj-shot"
			src={project.screenshot}
			alt={`${project.title} project screenshot`}
			width="1200"
			height="675"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<p class="proj-back">
		<a class="proj-back-link" href="/projects"><span class="proj-back-prompt">$ </span>cd ../</a>
	</p>
</article>

<style>
	.project-detail {
		max-width: 52rem;
		font-family: inherit;
		font-size: 0.8125rem;
		line-height: 1.6;
		color: var(--color-muted);
	}

	.proj-file-header {
		margin: 0 0 1.5rem;
		padding: 0;
		font-family: inherit;
		font-size: 0.8125rem;
		line-height: 1.55;
		white-space: pre-wrap;
		word-break: break-word;
		color: color-mix(in srgb, var(--color-muted) 75%, var(--color-bg));
	}

	.proj-code-block {
		margin: 0 0 1.25rem;
	}

	.proj-exports {
		margin: 0 0 1.5rem;
	}

	.proj-line {
		margin: 0;
		padding: 0;
		font-family: inherit;
	}

	.proj-line-indent {
		padding-left: 1.5ch;
	}

	.proj-kw {
		color: var(--color-accent);
		font-weight: 600;
	}

	.proj-tech {
		color: #f59e0b;
	}

	.proj-ident {
		color: var(--color-muted);
	}

	.proj-punct {
		color: color-mix(in srgb, var(--color-muted) 85%, transparent);
	}

	.proj-str {
		color: #f59e0b;
	}

	.proj-link-str {
		color: #f59e0b;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.proj-link-str:hover {
		color: var(--color-accent);
	}

	.proj-shot-wrap {
		margin: 0 0 1.75rem;
		width: 100%;
	}

	.proj-shot {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1200 / 675;
		border-radius: 8px;
		border: 1px solid color-mix(in srgb, var(--color-muted) 28%, var(--color-border));
		background-color: color-mix(in srgb, var(--color-chrome) 40%, var(--color-editor-bg));
		object-fit: cover;
	}

	.proj-back {
		margin: 0;
		font-family: inherit;
		font-size: 0.8125rem;
	}

	.proj-back-link {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 500;
		font-family: inherit;
	}

	.proj-back-prompt {
		color: color-mix(in srgb, var(--color-muted) 75%, var(--color-accent));
		font-weight: 600;
	}

	.proj-back-link:hover {
		text-decoration: underline;
	}
</style>

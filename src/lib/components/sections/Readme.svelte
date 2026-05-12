<script lang="ts">
	import { fade } from 'svelte/transition';
	import Typewriter from '$lib/components/ui/Typewriter.svelte';

	let secondaryVisible = $state(false);
</script>

<div class="readme-root">
	<div class="readme-toolbar">
		<button type="button" class="readme-toolbar-btn">Download CV</button>
	</div>
	<div class="readme-body">
		<h1 class="readme-h1">
			<span class="readme-hash">#</span>
			<Typewriter text="Your Name" on:done={() => (secondaryVisible = true)} />
		</h1>

		{#if secondaryVisible}
			<div class="readme-secondary" in:fade={{ duration: 300 }}>
				<blockquote class="readme-bq">
					<p>Frontend Engineer · Lagos</p>
				</blockquote>

				<pre class="readme-fence"><code class="readme-code"><span class="readme-code-inner">/*
 * I ship responsive interfaces with strong TypeScript boundaries
 * and care about perceived performance, accessibility, and maintainability.
 */</span></code></pre>

				<p class="readme-links">
					<a class="readme-badge" href="https://github.com/alexrivera">GitHub</a>
					<a class="readme-badge" href="https://www.linkedin.com/in/alexrivera-dev">LinkedIn</a>
				</p>
			</div>
		{/if}
	</div>
</div>

<script lang="ts">
	import MaybeFade from '$lib/components/ui/MaybeFade.svelte';
	import Typewriter from '$lib/components/ui/Typewriter.svelte';
	import { profile } from '$lib/data';

	let secondaryVisible = $state(false);
</script>

<div id="readme-section" class="readme-root">
	<div class="readme-toolbar">
<a
			href={profile.cv}
			class="readme-toolbar-btn"
			aria-label="Download CV"
			download
		>
			Download CV
		</a>
	</div>
	<div class="readme-body">
		<h1 class="readme-h1">
			<span class="readme-hash">#</span>
			<Typewriter text={profile.name} on:done={() => (secondaryVisible = true)} />
		</h1>

		{#if secondaryVisible}
			<MaybeFade duration={300} class="readme-secondary">
				{#snippet children()}
					<blockquote class="readme-bq">
						<p>{profile.title} · {profile.location}</p>
					</blockquote>

					<pre class="readme-fence"><code class="readme-code">/*{profile.bio.map(l => `\n${l}`).join('')}\n */</code></pre>

					<p class="readme-links">
						<a class="readme-badge" href={profile.github} target="_blank" rel="noopener noreferrer">[GitHub]</a>
						<a class="readme-badge" href={profile.linkedin} target="_blank" rel="noopener noreferrer">[LinkedIn]</a>
					</p>
				{/snippet}
			</MaybeFade>
		{/if}
	</div>
</div>
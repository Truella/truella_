<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/stores/motion';

	type Props = {
		class?: string;
		role?: string;
		'aria-label'?: string;
		children: Snippet;
	};

	let { class: className = '', role, 'aria-label': ariaLabel, children }: Props = $props();
</script>

{#if !$prefersReducedMotion}
	<div class={className} {role} aria-label={ariaLabel} in:slide={{ duration: 250, axis: 'y' }}>
		{@render children()}
	</div>
{:else}
	<div class={className} {role} aria-label={ariaLabel}>{@render children()}</div>
{/if}

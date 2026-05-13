<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/stores/motion';

	let {
		y = 0,
		delay = 0,
		duration = 200,
		class: className = '',
		children
	}: {
		y?: number;
		delay?: number;
		duration?: number;
		class?: string;
		children: Snippet;
	} = $props();
</script>

{#if !$prefersReducedMotion}
	<div class={className} in:fly={{ y, delay, duration }}>{@render children()}</div>
{:else}
	<div class={className}>{@render children()}</div>
{/if}

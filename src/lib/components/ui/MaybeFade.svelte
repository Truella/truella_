<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/stores/motion';

	let {
		delay = 0,
		duration = 150,
		class: className = '',
		children
	}: {
		delay?: number;
		duration?: number;
		class?: string;
		children: Snippet;
	} = $props();
</script>

{#if !$prefersReducedMotion}
	<div class={className} in:fade={{ delay, duration }}>{@render children()}</div>
{:else}
	<div class={className}>{@render children()}</div>
{/if}

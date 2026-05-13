<script lang="ts">
	import { onMount } from 'svelte';
	import Terminal from '$lib/components/sections/Terminal.svelte';
	import { terminal } from '$lib/stores/terminal';

	onMount(() => {
		terminal.setOpen(true);
	});
</script>

<Terminal forceOpen />

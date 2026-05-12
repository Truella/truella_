<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	type Props = {
		text: string;
		speed?: number;
		onDone?: () => void;
	};

	let { text, speed = 40, onDone }: Props = $props();

	const dispatch = createEventDispatcher<{ done: void }>();

	let displayed = $state('');

	function finish() {
		onDone?.();
		dispatch('done');
	}

	onMount(() => {
		if (text.length === 0) {
			finish();
			return;
		}
		let i = 0;
		const id = setInterval(() => {
			i += 1;
			displayed = text.slice(0, i);
			if (i >= text.length) {
				clearInterval(id);
				finish();
			}
		}, speed);
		return () => clearInterval(id);
	});
</script>

<span class="typewriter-wrap">
	{displayed}<span class="typewriter-cursor" aria-hidden="true"></span>
</span>

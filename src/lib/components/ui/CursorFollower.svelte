<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!browser) return;

		const accent = 'var(--color-accent)';

		const styleEl = document.createElement('style');
		styleEl.textContent = `@media (hover: none) {
			.cursor-follower-dot,
			.cursor-follower-ring {
				display: none;
			}
		}`;
		document.head.appendChild(styleEl);

		const dot = document.createElement('div');
		dot.className = 'cursor-follower-dot';
		dot.setAttribute('aria-hidden', 'true');
		Object.assign(dot.style, {
			position: 'fixed',
			width: '4px',
			height: '4px',
			borderRadius: '50%',
			backgroundColor: accent,
			pointerEvents: 'none',
			zIndex: '9999',
			willChange: 'transform',
			left: '0',
			top: '0'
		} as Partial<CSSStyleDeclaration>);

		const ring = document.createElement('div');
		ring.className = 'cursor-follower-ring';
		ring.setAttribute('aria-hidden', 'true');
		Object.assign(ring.style, {
			position: 'fixed',
			width: '24px',
			height: '24px',
			boxSizing: 'border-box',
			border: `1.5px solid ${accent}`,
			borderRadius: '50%',
			background: 'transparent',
			pointerEvents: 'none',
			zIndex: '9999',
			willChange: 'transform',
			left: '0',
			top: '0'
		} as Partial<CSSStyleDeclaration>);

		document.body.appendChild(dot);
		document.body.appendChild(ring);

		let mx = window.innerWidth / 2;
		let my = window.innerHeight / 2;
		let ringX = mx;
		let ringY = my;

		dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
		ring.style.transform = `translate(${ringX - 12}px, ${ringY - 12}px)`;

		function onMove(e: MouseEvent) {
			mx = e.clientX;
			my = e.clientY;
			dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
		}

		let raf = 0;
		function loop() {
			ringX += (mx - ringX) * 0.12;
			ringY += (my - ringY) * 0.12;
			ring.style.transform = `translate(${ringX - 12}px, ${ringY - 12}px)`;
			raf = requestAnimationFrame(loop);
		}

		window.addEventListener('mousemove', onMove);
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			styleEl.remove();
			dot.remove();
			ring.remove();
		};
	});
</script>

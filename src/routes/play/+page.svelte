<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly, slide, fade } from 'svelte/transition';
	import { ROUNDS } from '$lib/data/game';
	import { highlightTsLine } from '$lib/game/highlight';
	import { game, displayScore, type GameState } from '$lib/stores/game';
	import { prefersReducedMotion } from '$lib/stores/motion';

	type ResultKind = 'idle' | 'correct' | 'wrong' | 'revealed';

	let flashCorrect = $state(false);
	let flashWrong = $state(false);
	let lastResult = $state<ResultKind>('idle');

	$effect(() => {
		const r = $game.result;
		if (r === 'idle') {
			lastResult = 'idle';
			return;
		}
		if (r === 'correct' && lastResult !== 'correct') {
			flashCorrect = true;
			const id = setTimeout(() => {
				flashCorrect = false;
			}, 600);
			lastResult = r;
			return () => clearTimeout(id);
		}
		if (r === 'wrong' && lastResult !== 'wrong') {
			flashWrong = true;
			const id = setTimeout(() => {
				flashWrong = false;
			}, 600);
			lastResult = r;
			return () => clearTimeout(id);
		}
		if (r === 'revealed') lastResult = r;
	});

	function round() {
		return ROUNDS[$game.currentRound];
	}

	function bugLine() {
		return round().lines.find((l) => l.isBug);
	}

	function netScore(s: GameState) {
		return displayScore(s);
	}

	function finishedBody(s: GameState) {
		const x = netScore(s);
		let mid: string;
		if (x >= 3) {
			mid = '✓ All bugs squashed. You saved production. Hire this person.';
		} else if (x === 2) {
			mid = '⚠ Close enough. One bug made it to staging.';
		} else {
			mid = '// TODO: fix later — assigned to: you';
		}
		return { mid, x };
	}

	const flyOpts = { y: 12, duration: 180 } as const;
	const slideOpts = { duration: 200 } as const;
	const fadeOpts = { duration: 300 } as const;

	onMount(() => {
		game.restart();
	});
</script>

<div class="play-root font-mono text-xs">
	{#if $game.finished}
		<div class="play-finished" in:fade={$prefersReducedMotion ? { duration: 0 } : fadeOpts}>
			<pre class="play-terminal" aria-label="Game results">{`$ git log --author="you" --since="5 minutes ago"

Found 3 bugs.
Score: ${finishedBody($game).x}/3

${finishedBody($game).mid}

$ _`}<span class="play-cursor" aria-hidden="true">█</span></pre>
			<div class="play-finished-actions">
				<button type="button" class="play-btn play-btn--ghost" onclick={() => game.restart()}>Play again</button>
				<button type="button" class="play-btn play-btn--accent" onclick={() => goto('/')}>Back to portfolio</button>
			</div>
		</div>
	{:else}
		<div class="play-header">
			<div class="play-tab">
				<span aria-hidden="true">🐛</span>
				debug.ts
			</div>
			<div class="play-badge">ROUND {$game.currentRound + 1}/{ROUNDS.length}</div>
			<div class="play-score" style="color: var(--color-accent)">✓ {netScore($game)}</div>
		</div>

		<div class="play-issue">
			<span class="play-issue-tag">[BUG]</span>
			<p class="play-issue-text">{round().description}</p>
			<button
				type="button"
				class="play-hint"
				disabled={$game.hintUsedThisRound || $game.result !== 'idle'}
				onclick={() => game.useHint()}
			>
				Hint
			</button>
		</div>
		{#if $game.hintText}
			<p class="play-hint-reveal">{$game.hintText}</p>
		{/if}

		{#key $game.currentRound}
			<div
				class="play-code-wrap"
				in:fly={$prefersReducedMotion ? { duration: 0, y: 0 } : flyOpts}
			>
				<div class="play-code">
					{#each round().lines as line (line.lineNumber)}
						{@const isSel = $game.selectedLine === line.lineNumber}
						{@const isBug = line.isBug}
						{@const showSuccess = $game.result === 'correct' && isBug}
						{@const showWrongFlash = $game.result === 'wrong' && isSel && flashWrong}
						{@const showGreenFlash = showSuccess && flashCorrect}
						<button
							type="button"
							class="play-row"
							class:play-row--sel={isSel && $game.result === 'idle'}
							class:play-row--success={showSuccess && !flashCorrect}
							class:play-row--success-flash={showGreenFlash}
							class:play-row--wrong-flash={showWrongFlash}
							class:play-row--revealed={$game.result === 'revealed' && isBug}
							onclick={() => game.selectLine(line.lineNumber)}
						>
							<span class="play-blame" title={line.commitMessage}>
								{line.commitHash} · {line.author} · {line.date}
							</span>
							<span class="play-ln">{line.lineNumber}</span>
							<span class="play-code-txt">
								{#each highlightTsLine(line.code) as tok, i (line.lineNumber + '-' + i)}
									<span
										class="tok tok--{tok.kind}"
										style:color={tok.kind === 'str' ? '#F59E0B' : undefined}
										style:font-style={tok.kind === 'comment' ? 'italic' : undefined}
										>{tok.text}</span
									>
								{/each}
							</span>
						</button>
					{/each}
				</div>
			</div>
		{/key}

		<button
			type="button"
			class="play-blame-btn"
			disabled={$game.selectedLine === null || $game.result !== 'idle'}
			onclick={() => game.submitGuess()}
		>
			Blame this commit
		</button>

		{#if $game.result === 'correct' && bugLine()}
			<div class="play-result" in:slide={$prefersReducedMotion ? { duration: 0 } : slideOpts}>
				<p class="play-gitlog">
					commit {bugLine()!.commitHash} · Author: {bugLine()!.author} · "{bugLine()!.commitMessage}"
				</p>
				<p class="play-success-msg" style="color: var(--color-accent)">{round().successMessage}</p>
				<button type="button" class="play-next" onclick={() => game.advanceAfterCorrect()}>
					{$game.currentRound >= ROUNDS.length - 1 ? 'See score →' : 'Next round →'}
				</button>
			</div>
		{/if}

		{#if $game.result === 'wrong'}
			<div class="play-result play-result--wrong" in:slide={$prefersReducedMotion ? { duration: 0 } : slideOpts}>
				<p class="play-wrong-label">// wrong commit</p>
				<p class="play-fail-msg">{round().failMessage}</p>
				<div class="play-wrong-actions">
					<button type="button" class="play-next" onclick={() => game.tryAgain()}>Try again</button>
					{#if $game.wrongGuessesThisRound >= 2}
						<button type="button" class="play-next play-next--muted" onclick={() => game.revealAnswer()}
							>Reveal answer</button
						>
					{/if}
				</div>
			</div>
		{/if}

		{#if $game.result === 'revealed' && bugLine()}
			<div class="play-result" in:slide={$prefersReducedMotion ? { duration: 0 } : slideOpts}>
				<p class="play-gitlog">
					commit {bugLine()!.commitHash} · Author: {bugLine()!.author} · "{bugLine()!.commitMessage}"
				</p>
				<p class="play-muted">The buggy line was highlighted. No points for this round.</p>
				<button type="button" class="play-next" onclick={() => game.continueAfterReveal()}>Continue →</button>
			</div>
		{/if}
	{/if}
</div>

<style>
	.play-root {
		max-width: 56rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: min(70vh, 36rem);
	}

	.play-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding: 0.25rem 0.35rem 0.5rem;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-tab-bar);
	}

	.play-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.2rem 0.65rem;
		border: 1px solid var(--color-border);
		border-bottom: none;
		border-radius: 4px 4px 0 0;
		background: var(--color-tab-active);
		color: var(--color-accent);
		font-size: 0.75rem;
	}

	.play-badge {
		margin-left: auto;
		padding: 0.1rem 0.45rem;
		border-radius: 3px;
		background: color-mix(in srgb, #f59e0b 18%, transparent);
		color: #f59e0b;
		font-weight: 600;
		font-size: 0.65rem;
		letter-spacing: 0.04em;
	}

	.play-score {
		font-weight: 600;
		font-size: 0.75rem;
	}

	.play-issue {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.65rem 0.75rem;
		align-items: start;
		padding: 0.65rem 0.75rem;
		border: 1px solid #ef4444;
		border-radius: 6px;
		background: color-mix(in srgb, #ef4444 6%, transparent);
	}

	.play-issue-tag {
		color: #ef4444;
		font-weight: 700;
		font-size: 0.65rem;
		letter-spacing: 0.06em;
	}

	.play-issue-text {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.45;
		font-family: inherit;
		font-size: 0.75rem;
	}

	.play-hint {
		font: inherit;
		font-size: 0.65rem;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		border: 1px solid var(--color-border);
		background: var(--color-editor-bg);
		color: var(--color-muted);
		cursor: pointer;
	}

	.play-hint:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.play-hint-reveal {
		margin: 0;
		font-size: 0.7rem;
		color: #f59e0b;
	}

	.play-code-wrap {
		flex: 1;
		min-height: 0;
	}

	.play-code {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		overflow: hidden;
		background: var(--color-editor-bg);
	}

	.play-row {
		display: flex;
		align-items: stretch;
		width: 100%;
		text-align: left;
		border: none;
		border-bottom: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 0;
	}

	.play-row:last-child {
		border-bottom: none;
	}

	.play-row--sel {
		background: color-mix(in srgb, #f59e0b 12%, transparent);
		box-shadow: inset 3px 0 0 #f59e0b;
	}

	.play-row--success-flash {
		animation: play-flash-green 600ms ease;
	}

	.play-row--success,
	.play-row--revealed {
		background: color-mix(in srgb, #22c55e 14%, transparent);
		box-shadow: inset 3px 0 0 #22c55e;
	}

	.play-row--wrong-flash {
		animation: play-flash-red 600ms ease;
	}

	@keyframes play-flash-green {
		0%,
		100% {
			background: color-mix(in srgb, #22c55e 22%, transparent);
		}
		50% {
			background: color-mix(in srgb, #22c55e 40%, transparent);
		}
	}

	@keyframes play-flash-red {
		0%,
		100% {
			background: color-mix(in srgb, #ef4444 18%, transparent);
		}
		50% {
			background: color-mix(in srgb, #ef4444 35%, transparent);
		}
	}

	.play-blame {
		flex: 0 0 220px;
		width: 220px;
		padding: 0.35rem 0.5rem;
		font-size: 0.7rem;
		color: var(--color-muted);
		user-select: none;
		border-right: 1px solid var(--color-border);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.play-ln {
		flex: 0 0 32px;
		width: 32px;
		padding: 0.35rem 0.25rem;
		text-align: right;
		color: var(--color-muted);
		opacity: 0.85;
		border-right: 1px solid var(--color-border);
	}

	.play-code-txt {
		flex: 1;
		min-width: 0;
		padding: 0.35rem 0.5rem;
		white-space: pre-wrap;
		word-break: break-word;
		text-align: left;
	}

	:global(.tok--kw) {
		color: var(--color-accent);
	}

	:global(.tok--comment) {
		color: var(--color-muted);
		font-style: italic;
	}

	.play-blame-btn {
		width: 100%;
		margin-top: 0.25rem;
		padding: 0.45rem 0.75rem;
		font: inherit;
		font-size: 0.75rem;
		font-weight: 600;
		border: none;
		border-radius: 4px;
		background: color-mix(in srgb, #f59e0b 35%, var(--color-border));
		color: #1a1a1a;
		cursor: not-allowed;
		opacity: 0.5;
	}

	.play-blame-btn:not(:disabled) {
		background: #f59e0b;
		cursor: pointer;
		opacity: 1;
	}

	.play-result {
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-chrome);
	}

	.play-result--wrong {
		border-color: color-mix(in srgb, #ef4444 45%, var(--color-border));
	}

	.play-gitlog {
		margin: 0 0 0.35rem;
		font-size: 0.7rem;
		color: var(--color-muted);
	}

	.play-success-msg {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
	}

	.play-wrong-label {
		margin: 0 0 0.25rem;
		color: #ef4444;
		font-weight: 600;
	}

	.play-fail-msg {
		margin: 0 0 0.5rem;
		color: var(--color-muted);
		font-size: 0.75rem;
	}

	.play-muted {
		margin: 0 0 0.5rem;
		font-size: 0.7rem;
		color: var(--color-muted);
	}

	.play-wrong-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.play-next {
		font: inherit;
		font-size: 0.7rem;
		padding: 0.3rem 0.65rem;
		border-radius: 4px;
		border: 1px solid var(--color-border);
		background: var(--color-editor-bg);
		color: var(--color-accent);
		cursor: pointer;
	}

	.play-next--muted {
		color: var(--color-muted);
	}

	.play-finished {
		padding: 1rem 0;
	}

	.play-terminal {
		margin: 0;
		padding: 1rem;
		border-radius: 4px;
		border: 1px solid var(--color-border);
		background: #141414;
		color: #d4d4d4;
		font-size: 0.75rem;
		line-height: 1.55;
		white-space: pre-wrap;
	}

	:global([data-theme='light']) .play-terminal {
		background: #f3f3f3;
		color: #1a1a1a;
	}

	.play-cursor {
		display: inline-block;
		animation: play-blink 1s step-end infinite;
		color: var(--color-accent);
		font-weight: 400;
	}

	@keyframes play-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.play-finished-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.play-btn {
		font: inherit;
		font-size: 0.75rem;
		padding: 0.4rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
		border: 1px solid var(--color-border);
	}

	.play-btn--ghost {
		background: var(--color-editor-bg);
		color: var(--color-muted);
	}

	.play-btn--accent {
		background: var(--color-accent);
		color: var(--color-bg);
		border-color: transparent;
	}
</style>

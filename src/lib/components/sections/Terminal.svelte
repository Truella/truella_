<script lang="ts">
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { tick } from 'svelte';
	import MaybeSlide from '$lib/components/ui/MaybeSlide.svelte';
	import { terminal } from '$lib/stores/terminal';

	type Props = {
		forceOpen?: boolean;
	};

	let { forceOpen = false }: Props = $props();

	let inputEl: HTMLInputElement | null = $state(null);
	let logEl: HTMLDivElement | null = $state(null);
	let line = $state('');

	const PROMPT = 'visitor@portfolio:~$';

	const OWNER_NAME = 'Your Name';
	const OWNER_ROLE = 'Frontend Engineer';
	const CONTACT_EMAIL = 'hello@yourname.dev';
	const LINKEDIN_URL = 'https://www.linkedin.com/in/yourname';

	const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

	$effect(() => {
		const unsub = terminal.subscribe(() => {
			if (!browser || !logEl) return;
			void tick().then(() => {
				if (logEl) logEl.scrollTop = logEl.scrollHeight;
			});
		});
		return unsub;
	});

	$effect(() => {
		const unsub = terminal.subscribe((v) => {
			if (!browser || !(forceOpen || v.isOpen)) return;
			void tick().then(() => inputEl?.focus());
		});
		return unsub;
	});

	function closePanel() {
		if (forceOpen) return;
		terminal.setOpen(false);
	}

	function runCommand(raw: string) {
		const cmd = raw.trim();
		if (!cmd) return;

		if (get(terminal).hireStep !== 'idle') {
			handleHireInput(cmd);
			line = '';
			return;
		}

		terminal.pushInputEcho(cmd);
		terminal.recordCommand(cmd);

		const lower = cmd.toLowerCase();
		if (lower === 'clear') {
			terminal.clearScreen();
			terminal.resetHire();
			line = '';
			return;
		}

		if (lower === 'help') {
			terminal.pushOutput(
				'Commands: help, whoami, email, linkedin, hire, clear — type a command and press Enter.'
			);
			line = '';
			return;
		}

		if (lower === 'whoami') {
			terminal.pushOutput(`${OWNER_NAME} — ${OWNER_ROLE}`);
			line = '';
			return;
		}

		if (lower === 'email') {
			terminal.pushOutput(`mailto:${CONTACT_EMAIL}`);
			line = '';
			return;
		}

		if (lower === 'linkedin') {
			terminal.pushOutput(LINKEDIN_URL);
			line = '';
			return;
		}

		if (lower === 'hire') {
			terminal.pushOutput(
				'I build fast, accessible interfaces and ship with strong TypeScript and modern tooling.'
			);
			terminal.pushOutput('Tell me how to reach you — follow the prompts below.');
			terminal.setHireStep('name');
			terminal.pushOutput('Enter your name:');
			line = '';
			return;
		}

		terminal.pushOutput(`command not found: ${cmd}`);
		line = '';
	}

	function handleHireInput(value: string) {
		const v = value.trim();
		if (!v) return;

		if (get(terminal).hireStep === 'name') {
			terminal.setHireDraft({ name: v });
			terminal.pushOutput(`Name: ${v}`);
			terminal.setHireStep('email');
			terminal.pushOutput('Enter your email:');
			return;
		}
		if (get(terminal).hireStep === 'email') {
			terminal.setHireDraft({ email: v });
			terminal.pushOutput(`Email: ${v}`);
			terminal.setHireStep('message');
			terminal.pushOutput('Enter your message:');
			return;
		}
		if (get(terminal).hireStep === 'message') {
			const name = get(terminal).hireDraft.name;
			const email = get(terminal).hireDraft.email;
			terminal.setHireDraft({ message: v });
			terminal.pushOutput(`Message: ${v}`);
			void submitHireForm(name, email, v);
		}
	}

	async function submitHireForm(name: string, email: string, message: string) {
		const body = new FormData();
		body.append('name', name);
		body.append('email', email);
		body.append('message', message);

		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: 'POST',
				body,
				headers: { Accept: 'application/json' }
			});
			if (res.ok) {
				terminal.pushOutput("✓ Message sent. I'll get back to you soon.");
				terminal.resetHire();
			} else {
				let msg = `Request failed (${res.status})`;
				try {
					const data = await res.json();
					if (data?.error) msg = String(data.error);
					else if (data?.message) msg = String(data.message);
				} catch {
					/* ignore */
				}
				terminal.pushOutput(`__ERR__${msg}`);
				terminal.resetHire();
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : 'Network error';
			terminal.pushOutput(`__ERR__${msg}`);
			terminal.resetHire();
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (get(terminal).hireStep !== 'idle') {
			if (e.key === 'Escape') {
				terminal.pushOutput('(hire flow cancelled)');
				terminal.resetHire();
				line = '';
				e.preventDefault();
			}
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			const hist = get(terminal).commandHistory;
			if (hist.length === 0) return;
			let next = get(terminal).historyIndex;
			if (next === -1) next = hist.length - 1;
			else next = Math.max(0, next - 1);
			terminal.setHistoryIndex(next);
			line = hist[next] ?? '';
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			const hist = get(terminal).commandHistory;
			let next = get(terminal).historyIndex;
			if (next === -1) return;
			if (next >= hist.length - 1) {
				terminal.setHistoryIndex(-1);
				line = '';
			} else {
				next += 1;
				terminal.setHistoryIndex(next);
				line = hist[next] ?? '';
			}
		}
	}

	function onSubmit(e: Event) {
		e.preventDefault();
		runCommand(line);
		line = '';
	}

	function isMailto(text: string) {
		return text.startsWith('mailto:');
	}

	function isHttp(text: string) {
		return text.startsWith('http://') || text.startsWith('https://');
	}

	function isErr(text: string) {
		return text.startsWith('__ERR__');
	}

	function isOk(text: string) {
		return text.startsWith('✓');
	}
</script>

{#if forceOpen || $terminal.isOpen}
	<MaybeSlide class="terminal-dock" role="complementary" aria-label="Contact terminal">
		{#snippet children()}
			<div class="terminal-panel">
			<div class="terminal-header">
				<span class="terminal-tab">terminal</span>
				{#if !forceOpen}
					<button
						type="button"
						class="terminal-close"
						aria-label="Close terminal"
						onclick={closePanel}
					>
						×
					</button>
				{/if}
			</div>
			<div
				class="terminal-log"
				bind:this={logEl}
				role="log"
				aria-live="polite"
				aria-relevant="additions"
			>
				{#each $terminal.history as item (item.id)}
					{#if item.type === 'input'}
						<div class="terminal-line terminal-line--in">
							<span class="terminal-prompt">{PROMPT}</span>
							<span class="terminal-in-text">{item.text}</span>
						</div>
					{:else if isErr(item.text)}
						<div class="terminal-line terminal-line--out terminal-line--err">
							{item.text.slice(7)}
						</div>
					{:else if isOk(item.text)}
						<div class="terminal-line terminal-line--out terminal-line--ok">{item.text}</div>
					{:else if isMailto(item.text)}
						<div class="terminal-line terminal-line--out">
							<a class="terminal-link" href={item.text} aria-label={`Send email to ${item.text.replace(/^mailto:/, '')}`}
								>{item.text.replace(/^mailto:/, '')}</a
							>
						</div>
					{:else if isHttp(item.text)}
						<div class="terminal-line terminal-line--out">
							<a
								class="terminal-link"
								href={item.text}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open link ${item.text} in a new tab`}
								>{item.text}</a
							>
						</div>
					{:else}
						<div class="terminal-line terminal-line--out">{item.text}</div>
					{/if}
				{/each}
			</div>
			<form class="terminal-input-row" onsubmit={onSubmit}>
				<span class="terminal-prompt" aria-hidden="true">{PROMPT}</span>
				<input
					bind:this={inputEl}
					bind:value={line}
					class="terminal-field"
					type="text"
					autocomplete="off"
					spellcheck="false"
					aria-label="Terminal input"
					onkeydown={onKeydown}
				/>
			</form>
		</div>
		{/snippet}
	</MaybeSlide>
{/if}

<style>
	:global(.terminal-dock) {
		flex-shrink: 0;
		border-top: 1px solid var(--color-border);
		background-color: #1e1e1e;
		color: #f5f5f5;
		max-height: min(40vh, 320px);
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	:global([data-theme='light'] .terminal-dock) {
		background-color: #f3f3f3;
		color: #1a1a1a;
	}

	.terminal-panel {
		display: flex;
		flex-direction: column;
		min-height: 0;
		flex: 1;
		font-family: inherit;
		font-size: 0.75rem;
		line-height: 1.45;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.2rem 0.5rem 0.25rem;
		background-color: #252526;
		border-bottom: 1px solid #3c3c3c;
	}

	:global([data-theme='light']) .terminal-header {
		background-color: #e8e8e8;
		border-bottom-color: #ccc;
	}

	.terminal-tab {
		font-variant: all-small-caps;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
		font-size: 0.6875rem;
		color: #cccccc;
	}

	:global([data-theme='light']) .terminal-tab {
		color: #333;
	}

	.terminal-close {
		font: inherit;
		font-size: 1.1rem;
		line-height: 1;
		padding: 0.1rem 0.35rem;
		border: none;
		background: transparent;
		color: #cccccc;
		border-radius: 2px;
		cursor: pointer;
	}

	.terminal-close:hover {
		color: #fff;
		background-color: rgba(255, 255, 255, 0.08);
	}

	.terminal-log {
		flex: 1;
		min-height: 0;
		overflow: auto;
		padding: 0.5rem 0.65rem;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.terminal-line {
		margin-bottom: 0.15rem;
	}

	.terminal-line--in {
		color: #f5f5f5;
	}

	.terminal-line--out {
		color: #d4d4d4;
	}

	:global([data-theme='light']) .terminal-line--out {
		color: #333;
	}

	.terminal-line--ok {
		color: var(--color-accent);
		font-weight: 600;
	}

	.terminal-line--err {
		color: #f87171;
	}

	.terminal-prompt {
		color: var(--color-accent);
		font-weight: 600;
		margin-right: 0.35rem;
		user-select: none;
	}

	.terminal-in-text {
		color: #f5f5f5;
	}

	:global([data-theme='light']) .terminal-line--in,
	:global([data-theme='light']) .terminal-in-text {
		color: #1a1a1a;
	}

	.terminal-link {
		color: #4ade80;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:global([data-theme='light']) .terminal-link {
		color: #166534;
	}

	.terminal-input-row {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		padding: 0.35rem 0.65rem 0.5rem;
		border-top: 1px solid #3c3c3c;
		background-color: #1e1e1e;
	}

	:global([data-theme='light']) .terminal-input-row {
		border-top-color: #ccc;
		background-color: #f3f3f3;
	}

	.terminal-field {
		flex: 1;
		min-width: 0;
		font: inherit;
		font-size: 0.75rem;
		color: #f5f5f5;
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 0;
	}

	:global([data-theme='light']) .terminal-field {
		color: #1a1a1a;
	}
</style>

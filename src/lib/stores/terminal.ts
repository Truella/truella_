import { get, writable } from 'svelte/store';

export type HistoryLine = { id: string; type: 'input' | 'output'; text: string; muted?: boolean };

export type HireStep = 'idle' | 'name' | 'email' | 'message';

export type TerminalState = {
	history: HistoryLine[];
	commandHistory: string[];
	historyIndex: number;
	isOpen: boolean;
	hireStep: HireStep;
	hireDraft: { name: string; email: string; message: string };
};

const initialState = (): TerminalState => ({
	history: [],
	commandHistory: [],
	historyIndex: -1,
	isOpen: false,
	hireStep: 'idle',
	hireDraft: { name: '', email: '', message: '' }
});

function createTerminalStore() {
	let lineId = 0;
	const nextId = () => `ln-${++lineId}`;

	const { subscribe, set, update } = writable<TerminalState>(initialState());

	const TYPE_MS = 18;

	let welcomeSeq = 0;

	function typeMutedOutput(fullText: string, onDone: () => void, guard: number) {
		const id = nextId();
		update((s) => ({
			...s,
			history: [...s.history, { id, type: 'output', text: '', muted: true }]
		}));
		let i = 0;
		const timer = setInterval(() => {
			if (guard !== welcomeSeq) {
				clearInterval(timer);
				return;
			}
			i += 1;
			const text = fullText.slice(0, i);
			update((s) => ({
				...s,
				history: s.history.map((h) => (h.id === id ? { ...h, text } : h))
			}));
			if (i >= fullText.length) {
				clearInterval(timer);
				onDone();
			}
		}, TYPE_MS);
	}

	function queueWelcome(guard: number) {
		typeMutedOutput(
			'Welcome to portfolio.dev',
			() => {
				if (guard !== welcomeSeq) return;
				setTimeout(() => {
					if (guard !== welcomeSeq) return;
					typeMutedOutput("Type 'help' to see available commands.", () => {}, guard);
				}, 300);
			},
			guard
		);
	}

	return {
		subscribe,
		init() {
			if (get({ subscribe }).history.length > 0) return;
			welcomeSeq += 1;
			queueWelcome(welcomeSeq);
		},
		replayWelcome() {
			welcomeSeq += 1;
			update((s) => ({ ...s, history: [] }));
			queueWelcome(welcomeSeq);
		},
		toggle() {
			update((s) => ({ ...s, isOpen: !s.isOpen }));
		},
		setOpen(open: boolean) {
			update((s) => ({ ...s, isOpen: open }));
		},
		resetHire() {
			update((s) => ({
				...s,
				hireStep: 'idle',
				hireDraft: { name: '', email: '', message: '' }
			}));
		},
		setHireStep(step: HireStep) {
			update((s) => ({ ...s, hireStep: step }));
		},
		setHireDraft(partial: Partial<TerminalState['hireDraft']>) {
			update((s) => ({
				...s,
				hireDraft: { ...s.hireDraft, ...partial }
			}));
		},
		pushLine(line: Omit<HistoryLine, 'id'>) {
			const id = nextId();
			update((s) => ({
				...s,
				history: [...s.history, { ...line, id }]
			}));
		},
		pushOutput(text: string) {
			const id = nextId();
			update((s) => ({
				...s,
				history: [...s.history, { id, type: 'output', text }]
			}));
		},
		pushInputEcho(cmd: string) {
			const id = nextId();
			update((s) => ({
				...s,
				history: [...s.history, { id, type: 'input', text: cmd }]
			}));
		},
		recordCommand(cmd: string) {
			update((s) => {
				const trimmed = cmd.trim();
				if (!trimmed) return s;
				const next = [...s.commandHistory, trimmed];
				return { ...s, commandHistory: next, historyIndex: -1 };
			});
		},
		setHistoryIndex(i: number) {
			update((s) => ({ ...s, historyIndex: i }));
		},
		clearScreen() {
			update((s) => ({ ...s, history: [] }));
		},
		clearAll() {
			set(initialState());
		}
	};
}

export const terminal = createTerminalStore();

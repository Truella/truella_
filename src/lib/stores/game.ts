import { writable } from 'svelte/store';
import { ROUNDS } from '$lib/data/game';

export type GameResult = 'idle' | 'correct' | 'wrong' | 'revealed';

export interface GameState {
	currentRound: number;
	score: number;
	selectedLine: number | null;
	result: GameResult;
	hintsUsed: number;
	finished: boolean;
	wrongGuessesThisRound: number;
	hintUsedThisRound: boolean;
	hintText: string | null;
}

const initial = (): GameState => ({
	currentRound: 0,
	score: 0,
	selectedLine: null,
	result: 'idle',
	hintsUsed: 0,
	finished: false,
	wrongGuessesThisRound: 0,
	hintUsedThisRound: false,
	hintText: null
});

function bugLineNumber(roundIndex: number): number {
	const bug = ROUNDS[roundIndex]?.lines.find((l) => l.isBug);
	return bug?.lineNumber ?? -1;
}

function hintRangeForRound(roundIndex: number): string {
	const lines = ROUNDS[roundIndex]?.lines ?? [];
	const bug = lines.find((l) => l.isBug);
	if (!bug || lines.length === 0) return 'The bug is in here somewhere.';
	const lastNum = lines[lines.length - 1]!.lineNumber;
	const lo = Math.max(1, bug.lineNumber - 2);
	const hi = Math.min(lastNum, bug.lineNumber + 1);
	return `The bug is in lines ${lo}–${hi}.`;
}

function createGameStore() {
	const { subscribe, update, set } = writable<GameState>(initial());

	return {
		subscribe,
		selectLine(n: number) {
			update((s) => {
				if (s.finished) return s;
				if (s.result === 'correct' || s.result === 'wrong' || s.result === 'revealed') return s;
				const next = s.selectedLine === n ? null : n;
				return { ...s, selectedLine: next };
			});
		},
		submitGuess() {
			update((s) => {
				if (s.finished || s.selectedLine === null) return s;
				if (s.result !== 'idle') return s;
				const bug = bugLineNumber(s.currentRound);
				if (s.selectedLine === bug) {
					return { ...s, result: 'correct' };
				}
				return {
					...s,
					result: 'wrong',
					wrongGuessesThisRound: s.wrongGuessesThisRound + 1
				};
			});
		},
		/** After a correct guess: +1 score, next round or finished */
		advanceAfterCorrect() {
			update((s) => {
				const newScore = s.score + 1;
				if (s.currentRound >= ROUNDS.length - 1) {
					return { ...s, score: newScore, finished: true, result: 'idle', selectedLine: null };
				}
				return {
					...s,
					score: newScore,
					currentRound: s.currentRound + 1,
					selectedLine: null,
					result: 'idle',
					wrongGuessesThisRound: 0,
					hintUsedThisRound: false,
					hintText: null
				};
			});
		},
		useHint() {
			update((s) => {
				if (s.finished || s.hintUsedThisRound || s.result !== 'idle') return s;
				return {
					...s,
					hintsUsed: s.hintsUsed + 1,
					hintUsedThisRound: true,
					hintText: hintRangeForRound(s.currentRound)
				};
			});
		},
		tryAgain() {
			update((s) => ({
				...s,
				selectedLine: null,
				result: 'idle'
			}));
		},
		revealAnswer() {
			update((s) => ({
				...s,
				result: 'revealed',
				selectedLine: bugLineNumber(s.currentRound)
			}));
		},
		/** After reveal: advance without increasing score */
		continueAfterReveal() {
			update((s) => {
				if (s.currentRound >= ROUNDS.length - 1) {
					return { ...s, finished: true, result: 'idle', selectedLine: null };
				}
				return {
					...s,
					currentRound: s.currentRound + 1,
					selectedLine: null,
					result: 'idle',
					wrongGuessesThisRound: 0,
					hintUsedThisRound: false,
					hintText: null
				};
			});
		},
		restart() {
			set(initial());
		}
	};
}

export const game = createGameStore();

export function displayScore(state: GameState): number {
	return Math.max(0, state.score - state.hintsUsed);
}

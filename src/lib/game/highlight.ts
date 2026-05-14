const KW = new Set([
	'const',
	'let',
	'var',
	'function',
	'return',
	'await',
	'for',
	'async',
	'export',
	'if',
	'else',
	'true',
	'false',
	'null',
	'typeof',
	'new',
	'throw',
	'try',
	'catch',
	'of',
	'in'
]);

export type TokenKind = 'kw' | 'str' | 'comment' | 'plain';

export function highlightTsLine(line: string): { kind: TokenKind; text: string }[] {
	const ci = line.indexOf('//');
	if (ci !== -1) {
		return [...tokenizeCode(line.slice(0, ci)), { kind: 'comment', text: line.slice(ci) }];
	}
	return tokenizeCode(line);
}

function tokenizeCode(s: string): { kind: TokenKind; text: string }[] {
	const parts: { kind: TokenKind; text: string }[] = [];
	let i = 0;
	while (i < s.length) {
		if (/\s/.test(s[i]!)) {
			let j = i + 1;
			while (j < s.length && /\s/.test(s[j]!)) j++;
			parts.push({ kind: 'plain', text: s.slice(i, j) });
			i = j;
			continue;
		}
		const ch = s[i]!;
		if (ch === '"' || ch === "'" || ch === '`') {
			let j = i + 1;
			while (j < s.length) {
				if (s[j] === '\\') {
					j += 2;
					continue;
				}
				if (s[j] === ch) {
					j++;
					break;
				}
				j++;
			}
			parts.push({ kind: 'str', text: s.slice(i, j) });
			i = j;
			continue;
		}
		let j = i + 1;
		while (j < s.length && /[\w$]/.test(s[j]!)) j++;
		const w = s.slice(i, j);
		parts.push({ kind: KW.has(w) ? 'kw' : 'plain', text: w });
		i = j;
	}
	return parts;
}

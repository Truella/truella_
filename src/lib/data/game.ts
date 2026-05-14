export interface BlameLine {
	lineNumber: number;
	code: string;
	commitHash: string;
	author: string;
	date: string;
	isBug: boolean;
	commitMessage: string;
}

export interface Round {
	filename: string;
	description: string;
	lines: BlameLine[];
	successMessage: string;
	failMessage: string;
}

const line = (
	n: number,
	code: string,
	hash: string,
	author: string,
	date: string,
	isBug: boolean,
	msg: string
): BlameLine => ({
	lineNumber: n,
	code,
	commitHash: hash,
	author,
	date,
	isBug,
	commitMessage: msg
});

export const ROUNDS: Round[] = [
	{
		filename: 'src/lib/shipping.ts',
		description:
			'Prod crash: checkout throws "Infinity" as shipping cost for international orders. Customer charged $NaN. Suspect bad math in the rate helper.',
		successMessage: 'Nice catch — dividing by zero is always "free shipping" until finance calls.',
		failMessage: 'Not this line. The math is suspiciously… infinite somewhere.',
		lines: [
			line(1, '// Flat-rate helper — DO NOT TOUCH without QA', 'b1e4d9a', 'dev-1', '2 weeks ago', false, 'docs: warn about shipping module'),
			line(2, 'export function computeShipping(weightKg: number, zone: string) {', 'c8a21f0', 'j.smith', '9 days ago', false, 'feat: add zone-aware pricing'),
			line(3, '  const baseRate = zone === "intl" ? 24.99 : 5.99;', 'd0f3aa7', 'truella', '6 days ago', false, 'chore: tweak intl base rate'),
			line(4, '  const handlingFee = 2.5;', 'e9c1102', 'unknown', '5 days ago', false, 'fix: handling fee constant'),
			line(5, '  // legacy: intl divisor was 1, then "optimized"', 'f2a8841', 'dev-1', '4 days ago', false, 'refactor: clarify divisor comment'),
			line(6, '  const divisor = zone === "intl" ? 0 : 1; // "quirk"', 'a3f9c12', 'j.smith', '3 days ago', true, 'fix: definitely not breaking anything'),
			line(7, '  return baseRate / divisor + handlingFee;', '7b4de33', 'truella', '3 days ago', false, 'style: format return'),
			line(8, '}', '1c0ffee', 'unknown', '1 day ago', false, 'chore: closing brace')
		]
	},
	{
		filename: 'src/routes/cart/+server.ts',
		description:
			'Cart page never updates after deploy. Network tab is clean — no failing requests — but the UI still shows stale items. Feels like the refresh path never actually hits the API.',
		successMessage: 'You awaited a string. The fetch was on vacation; the bug was not.',
		failMessage: 'Still cold. Follow where the "promise" actually goes.',
		lines: [
			line(1, '// Refresh cart snapshot for SSR', 'aa11bb2', 'truella', '8 days ago', false, 'docs: explain cart refresh'),
			line(2, 'export async function loadCartSnapshot() {', 'cc33dd4', 'j.smith', '7 days ago', false, 'feat: cart snapshot loader'),
			line(3, '  const endpoint = "/api/cart";', 'ee55ff6', 'dev-1', '5 days ago', false, 'chore: extract endpoint const'),
			line(4, '  // TODO: add retry + timeout', '0099aa1', 'unknown', '4 days ago', false, 'chore: todo comment'),
			line(5, '  const res = await endpoint;', 'badc0de', 'dev-1', '2 days ago', true, 'perf: skip redundant fetch wrapper'),
			line(6, '  return res.json(); // trust me bro', 'feedfac', 'j.smith', '2 days ago', false, 'fix: parse json'),
			line(7, '  // stale closure nobody asked for', 'deadbea7', 'unknown', '1 day ago', false, 'chore: trailing comment'),
			line(8, '}', 'c0ffee0', 'truella', '1 day ago', false, 'style: brace')
		]
	},
	{
		filename: 'src/lib/inventory/applyTags.ts',
		description:
			'Support ticket: bulk tag tool skipped the last SKU in every import. Marketing is one shortcake emoji away from mutiny.',
		successMessage: 'Classic off-by-one. The last item sends regards.',
		failMessage: 'Nope. Count your iterations, not your blessings.',
		lines: [
			line(1, '// Apply promotional tags across SKU list', '111aaa1', 'j.smith', '10 days ago', false, 'feat: bulk tagger'),
			line(2, 'export function applyTags(skus: string[], tag: string) {', '222bbb2', 'truella', '9 days ago', false, 'refactor: export helper'),
			line(3, '  const tagged: string[] = [];', '333ccc3', 'dev-1', '8 days ago', false, 'chore: init array'),
			line(4, '  for (let i = 0; i < skus.length - 1; i++) {', 'offby1!', 'unknown', '3 days ago', true, 'fix: stop one short of disaster (jk)'),
			line(5, '    tagged.push(`${skus[i]}:${tag}`);', '444ddd4', 'j.smith', '3 days ago', false, 'feat: push tagged sku'),
			line(6, '  }', '555eee5', 'truella', '2 days ago', false, 'style: close loop'),
			line(7, '  return tagged;', '666fff6', 'dev-1', '2 days ago', false, 'fix: return array'),
			line(8, '}', '7770007', 'unknown', '1 day ago', false, 'chore: closing brace')
		]
	}
];

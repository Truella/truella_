import type { Experience, Project, Skills } from './types';

export const projects: Project[] = [
	{
		slug: 'fleetpulse',
		title: 'FleetPulse',
		description:
			'Operations dashboard for regional logistics: live vehicle status, route delays, and SLA alerts with role-based views for dispatch and fleet managers.',
		stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'MapLibre GL'],
		liveUrl: 'https://fleetpulse.example.com',
		githubUrl: 'https://github.com/alexrivera/fleetpulse-dashboard',
		screenshot: '/projects/fleetpulse.webp',
		category: 'web',
		featured: true
	},
	{
		slug: 'schema-guard',
		title: 'Schema Guard',
		description:
			'CLI that validates OpenAPI specs and JSON Schema files in CI, with readable diffs and exit codes suited for GitHub Actions.',
		stack: ['Node.js', 'TypeScript', 'Zod', 'Commander'],
		githubUrl: 'https://github.com/alexrivera/schema-guard',
		screenshot: '/projects/schema-guard.webp',
		category: 'tool',
		featured: true
	},
	{
		slug: 'react-query-kit',
		title: 'React Query Kit',
		description:
			'Lightweight helpers for TanStack Query: typed query keys, optimistic updates for forms, and shared error mapping.',
		stack: ['React', 'TypeScript', 'TanStack Query', 'Vitest'],
		liveUrl: 'https://react-query-kit.example.dev',
		githubUrl: 'https://github.com/alexrivera/react-query-kit',
		screenshot: '/projects/react-query-kit.webp',
		category: 'open-source',
		featured: false
	},
	{
		slug: 'ledger-lite',
		title: 'Ledger Lite',
		description:
			'Small-business expense tracker: recurring rules, CSV import, and monthly summaries with export to CSV for accountants.',
		stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM'],
		liveUrl: 'https://ledger-lite.example.com',
		githubUrl: 'https://github.com/alexrivera/ledger-lite',
		screenshot: '/projects/ledger-lite.webp',
		category: 'web',
		featured: false
	}
];

export const experience: Experience[] = [
	{
		company: 'Northwind Logistics',
		role: 'Senior Frontend Engineer',
		period: '2023 — present',
		version: 'v2.0.0',
		highlights: [
			'Led migration of the dispatch console from a legacy jQuery stack to SvelteKit with static-first hosting.',
			'Cut median time-to-interactive on the dashboard by introducing route-level code splitting and image sizing discipline.'
		]
	},
	{
		company: 'Harbor Digital Labs',
		role: 'Frontend Engineer',
		period: '2020 — 2023',
		version: 'v1.0.0',
		highlights: [
			'Built design-system primitives in React and Storybook, adopted across three customer-facing products.',
			'Partnered with backend engineers on GraphQL schema design and resilient loading states for slow networks.'
		]
	}
];

export const skills: Skills = {
	dependencies: {
		react: '^18.3.1',
		svelte: '^5.55.0',
		typescript: '^5.9.0',
		tailwindcss: '^4.2.0',
		'@tanstack/query': '^5.90.0',
		'next.js': '^15.1.0'
	},
	devDependencies: {
		vite: '^6.0.0',
		vitest: '^3.0.0',
		playwright: '^1.49.0',
		eslint: '^9.0.0',
		prettier: '^3.4.0',
		storybook: '^8.4.0'
	},
	scripts: {
		build: 'ship accessible, production-grade UIs with stable performance budgets',
		test: 'maintain unit and e2e coverage for critical flows',
		lint: 'keep TypeScript strict and consistent formatting in CI',
		deploy: 'release static and edge-friendly bundles with observable rollouts'
	}
};

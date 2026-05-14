import type { Experience, Project, Skills } from "./types";

export const profile = {
	name: "Truella",
	title: "Frontend Developer",
	location: "Lagos, Nigeria",
	bio: [
		" * I build interfaces that hold up — responsive, accessible, and",
		" * fast across devices. React and Next.js by default,",
		" * whatever the project needs in practice.",
	],
	github: "https://github.com/Truella",
	linkedin: "https://linkedin.com/in/suleimanolayemimistura",
	cv: "/cv.pdf",
};

export const projects: Project[] = [
	{
		slug: "truella-me",
		title: "Personal Portfolio",
		description:
			"My main portfolio site — designed and built from scratch. Focused on motion quality and typographic detail without sacrificing load time.",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
		liveUrl: "https://truella.me",
		githubUrl: "https://github.com/Truella",
		screenshot: "/projects/portfolio.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "prep",
		title: "Prep",
		description:
			"Quiz builder with two creation modes: CSV import for bulk questions and a manual form builder for step-by-step entry. Generates shareable links and shows per-question scores and answer review after submission.",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
		liveUrl: "https://prep-snowy.vercel.app",
		githubUrl: "https://github.com/Truella",
		screenshot: "/projects/prep.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "okunryn",
		title: "Okunryn",
		description:
			"End-to-end encrypted chat application. Messages are encrypted client-side before transmission — the server never sees plaintext. Built with real-time delivery and a minimal interface that stays out of the way.",
		stack: ["Next.js", "TypeScript", "Web Socket", "Tailwind CSS"],
		liveUrl: "https://okunryn.vercel.app",
		githubUrl: "https://github.com/Truella/Okunryn",
		screenshot: "/projects/okunryn.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "page-summarizer",
		title: "Page Summarizer",
		description:
			"Browser extension that summarizes any article on the page using the Grok API. One click — no copy-pasting, no tab switching. Built with vanilla HTML, CSS, and JavaScript; no framework overhead.",
		stack: ["JavaScript", "HTML", "CSS", "Grok API"],
		githubUrl: "https://github.com/Truella/Page-summarizer",
		screenshot: "/projects/summary.webp",
		category: "tool",
		featured: false,
	},
];

export const experience: Experience[] = [
	{
		company: "HNG Internship",
		role: "Frontend Developer Intern",
		period: "2025 · 3 months",
		version: "v3.0.0",
		highlights: [
			"Completed an intensive frontend internship, building and iterating on real-world tasks under production-like conditions.",
			"Developed responsive, accessible UI components as part of a large distributed team with fast feedback cycles.",
		],
	},
	{
		company: "Young People in Tech",
		role: "Frontend Developer (Volunteer)",
		period: "May 2025 — present",
		version: "v2.0.0",
		highlights: [
			"Improved responsiveness and structural markup of the community website in a collaborative remote team.",
			"Tested layout adjustments across multiple screen sizes and browsers to ensure consistent rendering.",
		],
	},
	{
		company: "Enover Lab — JobNest",
		role: "Frontend Developer",
		period: "Jan 2024 — Mar 2024",
		version: "v1.0.0",
		highlights: [
			"Built and styled responsive UI components for a local job board platform using React and Tailwind CSS, working from a product requirement document.",
			"Implemented job filtering and application flows, contributing to a cross-browser compatible interface across mobile and desktop.",
			"Collaborated with developers and designers to ship a product aimed at improving local hiring through cleaner front-end UX.",
		],
	},
];

export const skills: Skills = {
	dependencies: {
		react: "^18.3.1",
		"next.js": "^15.1.0",
		typescript: "^5.9.0",
		tailwindcss: "^4.2.0",
		svelte: "^5.55.0",
		sveltekit: "^2.x",
		"framer-motion": "^11.0.0",
		firebase: "^11.0.0",
	},
	devDependencies: {
		git: "always",
		github: "daily",
		python: "when needed",
		django: "backend",
		sqlite: "local db",
		netlify: "deploy",
		vercel: "deploy",
		notion: "planning",
		"rest-apis": "integration",
	},
	scripts: {
		build:
			"ship responsive, accessible interfaces that work across every device",
		design: "translate Figma concepts into production-ready components",
		collaborate:
			"work across design, backend, and product without losing context",
		ship: "take a feature from PRD to deployed in a single sprint",
	},
};

import type { Experience, Project, Skills } from "./types";

export const profile = {
	name: "Suleiman Mistura",
	title: "Frontend Engineer",
	location: "Lagos, Nigeria",
	bio: [
		" * I ship responsive interfaces with strong TypeScript boundaries",
		" * and care about perceived performance, accessibility, and maintainability.",
	],
	github: "https://github.com/Truella/",
	linkedin: "https://linkedin.com/in/suleimanolayemimistura",
	cv: "/Suleiman_Olayemi_Mistura_Resume.pdf",
};

export const projects: Project[] = [
	{
		slug: "freelanceready",
		title: "FreelanceReady",
		description:
			"AI-powered toolkit built for African freelancers: rate calculator, portfolio analyzer, and contract explainer — powered by Claude API with a focus on the local market context.",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Anthropic SDK"],
		liveUrl: "https://freelanceready.vercel.app",
		githubUrl: "https://github.com/Truella/freelanceready",
		screenshot: "/projects/portfolio.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "prep",
		title: "Prep",
		description:
			"Quiz application with a Visual Quiz Builder, optional timer, AI-powered performance review via Groq API, and a public quiz bank. Built as a hackathon submission with a dark glassmorphism UI.",
		stack: [
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Supabase",
			"Vite",
			"Groq API",
		],
		liveUrl: "https://prep-snowy.vercel.app/",
		githubUrl: "https://github.com/Truella/prep",
		screenshot: "/projects/prep.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "cosa-dashboard",
		title: "COSA Student Dashboard",
		description:
			"Student portal for Lagos State University's Faculty of Management Sciences — featuring stats, library access, events table, and settings with Clerk-sourced profile fields and persistent academic data.",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Framer Motion"],
		liveUrl: "https://cosa-dashboard.vercel.app",
		githubUrl: "https://github.com/Truella/cosa-dashboard",
		screenshot: "/projects/okunryn.webp",
		category: "web",
		featured: true,
	},
	{
		slug: "smart-utility-toolkit",
		title: "Smart Utility Toolkit",
		description:
			"Cross-platform mobile app covering unit conversion, calculators, text tools, time tools, and a persistent task manager — built with Expo and React Native for Android.",
		stack: [
			"Expo",
			"React Native",
			"TypeScript",
			"React Navigation",
			"AsyncStorage",
		],
		githubUrl: "https://github.com/Truella/smart-utility-toolkit",
		screenshot: "/projects/summary.webp",
		category: "tool",
		featured: false,
	},
	{
		slug: "invoice-app",
		title: "Invoice App",
		description:
			"Full-featured invoice manager with responsive create and edit flows, localStorage persistence, and a shared form component handling both modes — built mobile-first with Tailwind breakpoint discipline.",
		stack: [
			"React",
			"TypeScript",
			"Tailwind CSS",
			"React Router",
			"Context API",
		],
		githubUrl: "https://github.com/Truella/invoice-app",
		screenshot: "/projects/invoice-app.webp",
		category: "web",
		featured: false,
	},
];

export const experience: Experience[] = [
	{
		company: "Emerj",
		role: "Frontend Developer",
		period: "2026",
		version: "v2.0.0",
		highlights: [
			"Collaborated with cross-functional teams to design and ship product features from concept to production.",
			"Worked alongside designers and backend engineers to maintain consistent UI patterns and reliable API integration.",
		],
	},
	{
		company: "HNG Internship",
		role: "Frontend Developer Intern",
		period: "2025 · 3 months",
		version: "v1.0.0",
		highlights: [
			"Completed an intensive frontend internship, building and iterating on real-world tasks under production-like conditions.",
			"Developed responsive, accessible UI components as part of a large distributed team with fast feedback cycles.",
		],
	},
];

export const skills: Skills = {
	dependencies: {
		react: "^18.3.1",
		"next.js": "^15.1.0",
		typescript: "^5.9.0",
		tailwindcss: "^4.2.0",
		supabase: "^2.0.0",
		"framer-motion": "^11.0.0",
	},
	devDependencies: {
		vite: "^6.0.0",
		vitest: "^3.0.0",
		eslint: "^9.0.0",
		prettier: "^3.4.0",
		expo: "^52.0.0",
		clerk: "^6.0.0",
	},
	scripts: {
		build: "ship responsive, accessible UIs with strong TypeScript boundaries",
		test: "maintain component and integration coverage for critical user flows",
		lint: "keep TypeScript strict and consistent formatting across the codebase",
		deploy:
			"release performant, mobile-first interfaces with clean production builds",
	},
};


export interface Project {
	slug: string;
	title: string;
	description: string;
	stack: string[];
	liveUrl?: string;
	githubUrl: string;
	screenshot: string;
	category: 'web' | 'tool' | 'open-source';
	featured: boolean;
}

export interface Experience {
	company: string;
	role: string;
	period: string;
	version: string;
	highlights: string[];
}

export interface Skill {
	name: string;
	version: string;
}

export interface Skills {
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	scripts: Record<string, string>;
}

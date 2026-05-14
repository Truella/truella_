# Suleiman Mistura — Developer Portfolio

Live: [truella-eight.vercel.app](https://truella-eight.vercel.app)  
Repo: [github.com/Truella/truella_](https://github.com/Truella/truella_)

---

## Setup

```bash
npm install
npm run dev       # development server at localhost:5173
npm run build     # static production build
npm run preview   # preview production build locally
```

Requires Node.js 18+. No environment variables needed — all data is static.

---

## Architecture

The portfolio is built with **SvelteKit** using the static adapter. Every route prerendered at build time — no server, no runtime dependencies, just static files on Vercel's CDN.

The UI is modelled after a code editor. The SvelteKit layout (`+layout.svelte`) renders the persistent IDE chrome — title bar, sidebar file explorer, editor tab row, and status bar. Each route renders its content into the editor area as if opening a file. The metaphor is consistent throughout:

| Route | "File" |
|---|---|
| `/` | `README.md` — hero, bio, links |
| `/#package-json` | `package.json` — skills |
| `/#changelog` | `CHANGELOG.md` — experience |
| `/projects` | `projects/` — project listing |
| `/projects/[slug]` | individual source file |
| `/contact` | integrated terminal |

**Data layer:** All portfolio content lives in `src/lib/data.ts` — a single source of truth exporting `profile`, `projects`, `experience`, and `skills`. No CMS, no API. Updating the portfolio means editing one file.

**Component structure:**
```
src/lib/components/
├── ide/          — TitleBar, Sidebar, StatusBar (persistent chrome)
├── sections/     — Readme, PackageJson, Changelog, Terminal (page content)
└── ui/           — Typewriter, MaybeFly, MaybeFade, ProjectCard, TechBadge
```

**Stores:**
- `theme.ts` — dark/light preference, persisted to localStorage
- `terminal.ts` — terminal history, command history, open state
- `sidebar.ts` — mobile drawer open/closed state
- `motion.ts` — reads `prefers-reduced-motion` media query

---

## Animation decisions

All animations use **Svelte's built-in transition API** — no GSAP, no Motion One, no external animation library. This was a deliberate choice for two reasons: it keeps the bundle small, and it demonstrates Svelte-specific competence rather than reaching for a framework-agnostic tool.

Transitions used:
- `fly({ y: 8, duration: 200 })` — page transitions on route change, keyed on pathname
- `fade({ duration: 300 })` — hero secondary content after typewriter completes
- `fly({ x: -280, duration: 200 })` — mobile sidebar drawer
- `slide({ duration: 250 })` — terminal panel open/close
- Staggered `fade` with `delay: i * 60` — skills items on scroll entry via IntersectionObserver
- Staggered `fly` with per-block delay — changelog entries on scroll entry

The typewriter effect on the hero name uses a `setInterval` that appends one character at a time, emitting a `done` event on completion to trigger the fade-in of the secondary content.

**Reduced motion:** A `prefersReducedMotion` store wraps `window.matchMedia('(prefers-reduced-motion: reduce)')`. Every transition in the app is conditionally applied through `MaybeFly` and `MaybeFade` wrapper components that render the content unwrapped when reduced motion is preferred.

---

## Performance optimisation

**Lighthouse scores (desktop, live URL):**
- Performance: 86
- Accessibility: 91
- Best Practices: 100
- SEO: 91

Key decisions:

- **Static adapter** — SvelteKit prerenders every route at build time. No JavaScript execution on the server, no hydration overhead beyond interactivity.
- **Self-hosted fonts** — JetBrains Mono is served from `/static/fonts/` as woff2, not loaded from Google Fonts. This eliminates the third-party DNS lookup and render-blocking request.
- **`font-display: swap`** — text is immediately visible in a fallback font while JetBrains Mono loads, preventing invisible text flashes.
- **Lazy image loading** — all project screenshots use `loading="lazy"` with explicit `width` and `height` attributes to prevent layout shift.
- **No animation libraries** — Svelte's transition directives compile to minimal vanilla JS. No runtime animation engine in the bundle.
- **Route-level code splitting** — automatic with SvelteKit. Each route's JS is only loaded when navigated to.

The CLS score of 0.202 is caused by the self-hosted font swap on initial load. This is a known trade-off against the third-party request cost of Google Fonts. Preloading the woff2 file in `app.html` would reduce this further — documented as a next step.

---

## Accessibility

- **Skip link** — visually hidden `<a href="#main-content">` appears on focus as the first focusable element, allowing keyboard users to bypass the sidebar
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<footer>` used for all landmark regions
- **`aria-label`** on every icon-only button (theme toggle, hamburger, terminal close)
- **`aria-expanded`** on all sidebar folder toggle buttons, bound to their open/closed state
- **`aria-current="page"`** on active sidebar links
- **`role="log"` + `aria-live="polite"`** on terminal output area — screen readers announce new output without interrupting
- **Focus styles** — `:focus-visible` shows a 2px accent-coloured outline on all interactive elements; mouse clicks do not trigger the outline via `:focus:not(:focus-visible)`
- **Reduced motion** — all transitions disabled when `prefers-reduced-motion: reduce` is set
- **Tap targets** — all interactive elements meet the 44px minimum on mobile
- **Alt text** — all project screenshots have descriptive `alt` attributes from the data layer

---

## Trade-offs

**No Three.js / WebGL** — a 3D scene was considered for the hero background. Ruled out on two grounds: bundle size (Three.js adds ~600kb minified) and implementation risk under deadline. The dot-grid CSS background achieves a similar sense of depth at zero JS cost.

**Mock data only** — all portfolio content is static. A headless CMS (Contentful, Sanity) would make content updates possible without a code deploy. Not warranted for a personal portfolio at this scale.

**Formspree for contact** — the terminal `hire` command submits to Formspree's free tier rather than a custom API endpoint. No secrets are exposed; the form ID is public by design (Formspree's model). A serverless function on Vercel would be the next step if volume or spam became a concern.

**Mono-font only** — JetBrains Mono is used for everything, not just code. This reinforces the IDE aesthetic but means the portfolio reads slower than a variable-weight sans-serif for long prose. Acceptable for a developer audience; the sections are intentionally short.

**No Web Worker** — all JS runs on the main thread. Given that the portfolio is content-light with no heavy computation, this is not a performance concern in practice.

---

## Stack

```
sveltekit          — framework + routing
typescript         — strict mode throughout
@sveltejs/adapter-static — prerendered static output
tailwindcss        — utility classes for layout and spacing
zod                — contact form input validation (terminal)
```
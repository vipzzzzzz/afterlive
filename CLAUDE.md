# AfterLive - Project Guide

## Overview
AfterLive is a static website for a techno afterparty livestream brand (LivingRoom). Migrated from WordPress/jQuery to Astro 5 + vanilla TypeScript.

**Live URL:** https://afterlive.net

## Tech Stack
- **Framework:** Astro 5 (static output, zero runtime JS frameworks)
- **Language:** TypeScript (strict mode)
- **Styling:** Single global CSS file with custom properties (no Tailwind, no CSS modules)
- **Fonts:** Google Fonts — Open Sans (body) + Six Caps (credits)
- **Deployment:** Docker multi-stage (Node 20 → Nginx Alpine) on port 8091, behind Cloudflare tunnel

## Commands
```bash
npm run dev      # Dev server on localhost:4321
npm run build    # Static build → dist/
npm run preview  # Preview production build
```

## Project Structure
```
src/
├── data/site.ts           # Centralized config (nav, social, credits, galleries)
├── styles/global.css      # All styling (~879 lines)
├── layouts/BaseLayout.astro  # Root layout (header, sidebar, footer, background)
├── components/            # 8 Astro components (no framework components)
├── content/posts/         # Markdown blog posts (frontmatter: title, date, youtubeId)
└── pages/                 # File-based routing (5 pages)
```

## Key Conventions

### Centralized Data
All reusable data lives in `src/data/site.ts` — nav items, social links, credits, gallery photos, slideshow images. Update there for global changes.

### CSS Architecture
- Single `global.css` with CSS custom properties (`--color-bg`, `--z-content`, etc.)
- Z-index layers: bg(0) → overlay(1) → content(10) → logo(50) → audio/social(90) → sidebar(100) → hamburger(110) → video-overlay(200)
- Breakpoints: 900px (tablet), 700px (mobile), 540px (small), 400px (tiny)

### Component Patterns
- All components are `.astro` files — no React/Vue/Svelte
- Interactive components reinitialize on page transitions via `astro:after-swap` event
- Cleanup timers/intervals on `astro:before-swap`
- Keyboard support: Escape closes modals/drawers, arrow keys for gallery

### Content
- Blog posts are markdown in `src/content/posts/` with Zod-validated frontmatter
- Adding a post: create `.md` with `title`, `date`, `youtubeId`, optional `description`
- Posts auto-generate pages via `pages/posts/[slug].astro`

### Media Overlays
- Pattern: `.video-overlay` (fixed, dark bg, centered iframe)
- Close via: close button, Escape key, or click outside
- Uses `youtube-nocookie.com` for privacy

### TypeScript
- Path alias: `@/*` → `src/*`
- Vanilla DOM APIs (querySelector, classList, addEventListener)
- Web Audio API for the audio player

## Deployment
- `docker compose up -d --build` rebuilds and deploys
- Nginx serves static files with clean URLs, gzip, security headers
- Asset caching: `/_assets/` → 1 year immutable; media → 30 days
- Cloudflare tunnel managed separately (not in docker-compose)

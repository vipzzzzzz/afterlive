# AfterLive

**afterlive.net** — a techno afterparty livestream brand by LivingRoom.

Modern static site rebuilt from the original WordPress/Vysual theme. Serves from Docker + Nginx behind Cloudflare Zero Trust.

## What Changed (WordPress → Astro)

| Original (WordPress + Vysual) | New (Astro Static Site) |
|-------------------------------|------------------------|
| WordPress + MySQL + PHP | Astro 5 static site, zero backend |
| jQuery (~800 lines) | Vanilla TypeScript (~200 lines) |
| AJAX page loading + pushState | Astro View Transitions |
| jQuery `.animate()` | CSS transitions + Web Audio API |
| Font Awesome 4.3 (full library) | 4 inline SVG icons |
| Google Fonts CDN | Google Fonts (preconnect) |
| jQuery `waitForImages` plugin | Native `loading="lazy"` |
| Spin.js loading spinner | CSS animation |
| Vendor-prefixed CSS | Modern CSS (grid, custom properties, `aspect-ratio`, `scroll-snap`) |
| WP admin, comments, search, plugins | Dropped — pure static content |
| Plesk hosting | Docker (Nginx Alpine) + cloudflared tunnel |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — looped background video (Out_B_Loop.mp4), play button opens Teaser on YouTube in overlay, "LiveStream" nav opens Awakenings livestream |
| `/about` | About page — LivingRoom / AfterLive story, click outside text to return home |
| `/afterafterlive` | Horizontal-scroll video cards, click to play YouTube inline in overlay |
| `/photos` | Full-screen photo gallery with arrow key + click navigation (24 photos) |

## Blog Posts (5 YouTube videos)

| Post | YouTube ID |
|------|-----------|
| Afterlive: Teaser | `zUnV7zG6jsM` |
| AfterLive: Still Awake?! | `-k0fZLHQ1_0` |
| AfterLive: Awakenings Weekender | `l3kSprnpfHg` |
| De Zolder: Odette and Reece 202 | `CgFwd7a9G88` |
| Final SoundCheck with Karl Alexander | `8qOOPb0XtK0` |

## Components

- **BackgroundSlideshow** — 6-image crossfade, 4s interval
- **Video Background** — looped Out_B_Loop.mp4 on homepage
- **Video Overlay** — fullscreen YouTube embed with autoplay, close via ✕ / Escape / click-outside
- **Sidebar** — slide-out nav, Escape key closes
- **AudioPlayer** — click-to-play with 8-bar CSS equalizer animation, Web Audio API volume fade, shows "Monoloc — Trysome" track name
- **SocialIcons** — inline SVGs (Facebook, Twitter, YouTube, Instagram)
- **Credits** — movie-credit-style footer parsed from bracket notation
- **PhotoGallery** — keyboard + click navigation with counter
- **VideoCard** — thumbnail card with play button, opens overlay

## Project Structure

```
afterlive2/
├── astro.config.mjs          # Astro config (static output)
├── package.json
├── tsconfig.json
├── Dockerfile                 # Multi-stage: Node 20 build → Nginx Alpine
├── nginx.conf                 # Clean URLs, caching, gzip, security headers
├── docker-compose.yml         # Web (port 8091) + cloudflared tunnel
├── public/
│   ├── audio/monoloc-trysome.mp3
│   ├── video/Out_B_Loop.mp4
│   ├── images/
│   │   ├── logo.png, logo@2x.png
│   │   ├── photos/           # 24 gallery originals
│   │   └── thumbs/           # 5 YouTube thumbnails (local)
│   └── slideshow/            # 6 background images
├── src/
│   ├── data/site.ts          # Site config (social, nav, credits, etc.)
│   ├── styles/global.css     # All styles (CSS custom properties)
│   ├── layouts/BaseLayout.astro
│   ├── components/           # 8 Astro components
│   ├── content/posts/        # 5 markdown files (frontmatter only)
│   ├── content.config.ts     # Content collection schema
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── afterafterlive.astro
│       ├── photos.astro
│       └── posts/[slug].astro
```

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Static output in dist/
npm run preview    # Preview production build
```

## Deploy

```bash
# Build and run
docker compose up -d --build

# Site available at http://localhost:8091
# For cloudflared tunnel, set TUNNEL_TOKEN in .env
```

## Source

Migrated from a Plesk WordPress backup of afterlive.net. Original theme: [Vysual](https://themeforest.net/item/vysual-responsive-film-campaign-wordpress-theme/) by TheMolitor. All media assets (photos, audio, video) extracted from the backup archive.

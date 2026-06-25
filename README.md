# Ahmed Constructions — Animated Brand Site

A freelance project for Ahmed — an animated construction company website built with [Astro](https://astro.build). Features scroll-driven animations, a video hero, and interactive galleries using GSAP.

## ✨ Features

- **Full-viewport video hero** with YouTube background, dark overlay, and animated title/subtitle
- **GSAP-powered animations** — character-split text reveals, fade-in, slide-up, and scroll-triggered effects
- **Horizontally scrollable testimonial gallery** with pinned panels and scroll-driven video playback
- **Interactive project galleries** with FancyApps UI lightbox
- **Services & Projects** detail pages with dynamic content (powered by Astro content collections)
- **Stats counter section** with animated number counting
- **Infinite logo ticker** for client/brand logos
- **Custom cursor** for a polished, modern feel
- **Fully responsive** — Tailwind CSS v4 throughout

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| [Astro v6](https://astro.build/) | Static site framework & routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [GSAP v3](https://gsap.com/) | Scroll-triggered & entrance animations |
| [FancyApps UI v6](https://fancyapps.com/) | Image/video lightbox gallery |
| [Tabler Icons](https://tabler.io/icons) | SVG icon library |

## 🧞 Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
npm run astro     # Run Astro CLI (add, check, etc.)
```

## 📁 Project Structure

```
/
├── public/                 # Static assets (favicons)
├── src/
│   ├── assets/             # Importable images & SVGs
│   ├── components/         # Astro components
│   │   ├── AnimatedTitle.astro    # Character-split text animations
│   │   ├── CustomCursor.astro     # Custom mouse cursor
│   │   ├── Footer.astro           # Site footer
│   │   ├── HeroCover.astro        # Full-viewport video hero
│   │   ├── HorizontalGallery.astro# Scroll-driven horizontal gallery
│   │   ├── LogoTicker.astro       # Infinite logo slider
│   │   ├── NavBar.astro           # Navigation bar
│   │   ├── ProjectCard.astro      # Project preview card
│   │   ├── ProjectGallery.astro   # Gallery with lightbox
│   │   ├── ServicesSection.astro  # Services grid section
│   │   ├── StatsSection.astro     # Animated stats counters
│   │   ├── TestimonialVideo.astro # Testimonial video slider
│   │   └── Welcome.astro          # Vite-generated starter
│   ├── layouts/
│   │   └── Layout.astro           # HTML shell + Tailwind global styles
│   └── pages/
│       ├── index.astro            # Homepage
│       ├── projects/[...slug].astro  # Project detail pages
│       └── services/[...slug].astro  # Service detail pages
└── package.json
```

## 🎨 Design Decisions

- **No JS framework** — pure Astro `.astro` components (no React/Vue/Svelte)
- **Animations** are self-contained per component (GSAP imported in `<script>` blocks)
- **Tailwind v4** is imported via `@import "tailwindcss"` in the global `<style is:global>` block of `Layout.astro`
- **Typography**: Google Fonts — `Barlow` for body, `Barlow Condensed` for headings
- **Dynamic routes** use Astro's content collections / `[...slug]` pattern for projects and services

## 🛠️ Development

Requires Node.js >= 22.12.0.

```sh
npm install
npm run dev
```

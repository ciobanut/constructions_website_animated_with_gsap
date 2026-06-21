# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A freelance Astro website for a client named Ahmed — an animated construction company site. Bootstrapped from the Astro 6 "basics" starter template.

**Stack:** Astro v6, TypeScript, Node.js >=22.12.0, npm

**Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — imported via `@import "tailwindcss"` in the global `<style is:global>` block of `Layout.astro`. Tailwind utility classes should be used directly in HTML/component templates. No custom CSS is needed; any per-component overrides can use Tailwind's `@apply` or `@theme` directives.

**Animations:** [GSAP v3](https://gsap.com/) — used for scroll-triggered and entrance animations (e.g., character stagger, fade-in, slide-up). Import via `import { gsap } from 'gsap'` in `<script>` blocks. Animation helpers should be placed in `src/components/` as standalone `.astro` components with embedded `<script>` blocks.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI helpers (`astro add`, `astro check`, etc.) |

## Architecture

Standard Astro project layout:

```
public/              — Static assets served as-is (favicons)
src/
  assets/            — Importable assets (images, SVGs)
  components/        — Reusable Astro components (.astro), including animated components (e.g., AnimatedTitle)
  layouts/           — Page layout wrappers with <slot /> (Tailwind global styles live here)
  pages/             — File-based routing (index.astro → /)
dist/                — Build output (gitignored)
```

### Key Conventions

- **File-based routing**: `src/pages/` mirrors URL paths. Adding `about.astro` creates `/about`.
- **Layouts wrap pages**: `Layout.astro` provides the HTML shell (`<html>`, `<head>`, `<body>`, `<slot />`).
- **Components are reusable**: Place shared UI in `src/components/`.
- **Assets are importable**: Images in `src/assets/` are processed by Astro's asset pipeline (use `asset.src` for URLs).
- **No JS framework**: Pure Astro `.astro` components (no React/Vue/Svelte integration added yet).
- **Tailwind for styling**: Use Tailwind utility classes in templates. The global `@import "tailwindcss"` in `Layout.astro` enables it project-wide.
- **GSAP for animations**: Import `gsap` in `<script>` blocks for entrance animations, text reveals, scroll-triggered effects, etc. Wrap animation logic inside components that own the animated elements.
- **Typography**: Uses Google Fonts — `Barlow` for body text, `Barlow Condensed` for headings/accents (preconnected in `Layout.astro`).

### VSCode

The `.vscode/extensions.json` recommends the official `astro-build.astro-vscode` extension. The `.vscode/launch.json` provides a "Development server" launch config that runs `astro dev`.

## Current State

The homepage at `src/pages/index.astro` features a full-viewport hero section with a YouTube video background, dark overlay, and animated title/subtitle. `AnimatedTitle.astro` handles character-split text animations with GSAP stagger. Styling is done via Tailwind v4 (imported globally in `Layout.astro`). No tests, no CI/CD, no custom domain configuration yet.

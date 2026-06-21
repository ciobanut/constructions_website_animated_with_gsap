# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A freelance Astro website for a client named Ahmed — an animated construction company site. Currently bootstrapped from the Astro 6 "basics" starter template.

**Stack:** Astro v6, TypeScript, Node.js >=22.12.0, npm

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
  components/        — Reusable Astro components (.astro)
  layouts/           — Page layout wrappers with <slot />
  pages/             — File-based routing (index.astro → /)
dist/                — Build output (gitignored)
```

### Key Conventions

- **File-based routing**: `src/pages/` mirrors URL paths. Adding `about.astro` creates `/about`.
- **Layouts wrap pages**: `Layout.astro` provides the HTML shell (`<html>`, `<head>`, `<body>`, `<slot />`).
- **Components are reusable**: Place shared UI in `src/components/`.
- **Assets are importable**: Images in `src/assets/` are processed by Astro's asset pipeline (use `asset.src` for URLs).
- **No framework**: Pure Astro `.astro` components (no React/Vue/Svelte integration added yet).

### VSCode

The `.vscode/extensions.json` recommends the official `astro-build.astro-vscode` extension. The `.vscode/launch.json` provides a "Development server" launch config that runs `astro dev`.

## Current State

This is a fresh starter with a single page at `src/pages/index.astro` rendering a `Welcome` component inside `Layout`. No tests, no CI/CD, no custom domain configuration yet.

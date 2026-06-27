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

### Language

- **Chat responses**: Answer in the same language the user wrote in (English, Romanian, etc.)
- **Code comments**: Write all comments, documentation, and JSDoc in English only — regardless of the chat language

## Key Conventions

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


# Website Content & Configuration Guidelines for Prominent

* **Primary Objective:** Populate the newly created website with the following exact company data, ensuring high-end professional presentation.

---

## 🏢 1. Company Information
* [cite_start]**Official Company Name:** Prominent For Design & Construction [cite: 26, 32]
* [cite_start]**Established:** 2009 [cite: 27, 33]
* [cite_start]**Legal/Trade Name:** DESIGN & CONSTRUCTION [cite: 28, 34]
* [cite_start]**Short Slogan:** Inspiring spaces [cite: 29, 35]
* [cite_start]**Main Slogan / Header:** We add value to buildings, we add trust to projects. [cite: 259, 260]
* [cite_start]**Main Activity:** Turnkey construction projects and subcontracting for residential, commercial, and institutional structures. [cite: 30, 36]
* [cite_start]**Short Company Introduction:** Prominent is a professional construction company offering turnkey construction projects and subcontracting services for large-scale structures[cite: 37]. [cite_start]Operating with principles of quality, trust, and on-time delivery, our company produces high-standard solutions in every project with its experienced team[cite: 38]. [cite_start]With architectural excellence and superior craftsmanship, we add value to living spaces and prestige projects[cite: 39].

## 🎨 2. Brand Identity & Design Preferences
* [cite_start]**Logo Assets:** High-resolution available in PNG, JPG, and PDF formats[cite: 42, 43, 45, 51]. 
* [cite_start]**Official Brand Colors:** Gray, Red, White[cite: 47, 48].
* [cite_start]**Desired Vibe/Feeling:** Trust, Professionalism, Construction strength, Modern design[cite: 80, 81, 82, 83, 86, 87].
* [cite_start]**Preferred Website Style:** Modern minimal, Dark premium style[cite: 337, 341, 344].
* [cite_start]**Design Reference:** `https://senyuva.com/`[cite: 329, 331].

## 🎯 3. Strategy & Target Audience
* [cite_start]**Website Goals:** Showcase company profile, present project portfolio, showcase services, and acquire new customers[cite: 63, 64, 66, 67, 69, 70].
* [cite_start]**Target Audience:** Private villas, residential projects, commercial buildings, hotels, and public projects[cite: 93, 94, 96, 99, 100, 103, 104].
* [cite_start]**Supported Languages:** English (Main default language), Kurdish, Arabic, Turkish[cite: 285, 287, 289, 292, 293].

## 🛠 4. Services Overview
**Core Services List to Display:**
* [cite_start]Architectural design [cite: 110, 111]
* [cite_start]Construction works [cite: 114]
* [cite_start]Finishing works [cite: 115, 116]
* [cite_start]Mechanical works [cite: 122, 123]
* [cite_start]Electrical works [cite: 124]
* [cite_start]Civil / Construction works [cite: 125, 126]
* [cite_start]Project management [cite: 127, 128]

**Service Categories / Sectors:**
* [cite_start]Villas and private residences [cite: 131, 132]
* [cite_start]Commercial projects [cite: 133, 134]
* [cite_start]Hotels, restaurants, and luxury venues [cite: 136, 137]

**Service Summary Text:**
[cite_start]Prominent offers turnkey construction projects and subcontracting for large-scale structures[cite: 140]. [cite_start]Managing all processes from project management to fine finishing with its expert team, it produces complete solutions on time and at high quality standards[cite: 141]. [cite_start]Our company serves as a reliable solution partner in residential, commercial, and institutional projects[cite: 142].

## 🏗 5. Portfolio & Projects
**Company Stats for Counters:**
* [cite_start]**Completed Projects:** 27 [cite: 218, 219]
* [cite_start]**Years of Experience:** 17 [cite: 220, 221]

**Project 1:**
* [cite_start]**Name:** WHITE HAUSE [cite: 152, 153]
* [cite_start]**Location:** DREAM CITY [cite: 154, 155]
* [cite_start]**Year:** 2013 [cite: 156, 157]
* [cite_start]**Client:** HACI SHAHAB [cite: 158, 159]
* [cite_start]**Scope:** Turnkey [cite: 160, 161]
* [cite_start]**Assets:** Photos/Videos available and approved for publishing[cite: 162, 163, 165, 166].

**Project 2:**
* [cite_start]**Name:** HACI SHAHAB PRIVATE VILLA [cite: 168, 173]
* [cite_start]**Location:** DREAM CITY [cite: 169, 174]
* [cite_start]**Year:** 2022 [cite: 175, 176]
* [cite_start]**Client:** HACI SHAHAB [cite: 177, 178]
* [cite_start]**Scope:** Turnkey [cite: 179, 180]
* [cite_start]**Assets:** Photos/Videos available and approved for publishing[cite: 181, 182, 184, 185].

**Project 3:**
* [cite_start]**Name:** HACI IDRIS & LOKMAN PRIVATE VILLA [cite: 196]
* [cite_start]**Location:** DREAM CITY [cite: 196]
* [cite_start]**Year:** 2023 [cite: 196]
* [cite_start]**Client:** HACI IDRIS & LOKMAN [cite: 196]
* [cite_start]**Scope:** Turnkey [cite: 196]
* [cite_start]**Assets:** Photos/Videos available and approved for publishing[cite: 196].

## 💡 6. Brand Messaging & Differentiators
**Why choose Prominent?**
[cite_start]At Prominent, we view each project not just as a building, but as a long-term relationship built on trust[cite: 209, 210]. [cite_start]From turnkey projects to large-scale subcontracting services, we prioritize quality, on-time delivery, and a professional business approach in all processes[cite: 211].

**Key Differentiators:**
* [cite_start]Meticulous project management with an experienced and expert team[cite: 213].
* [cite_start]Strict adherence to schedules with an on-time delivery approach[cite: 213].
* [cite_start]High-standard solutions through quality-focused execution[cite: 214].
* [cite_start]Continuous client communication based on transparent and reliable business principles[cite: 215].
* [cite_start]Professional approach to any scale of work, backed by experience in large-scale projects[cite: 216].
* [cite_start]Flawless end-to-end execution through comprehensive turnkey services[cite: 217].

**The Five Pillars of Prestige (Brand Core Values):**
1. [cite_start]**Architectural Excellence:** Combining aesthetics, functionality, and technical expertise to create timeless, high-quality structures[cite: 238]. [cite_start]Attention to architectural details gives our projects a distinct identity[cite: 238].
2. [cite_start]**Precision Delivery:** Meticulous management of planning and execution processes to deliver projects flawlessly and on schedule[cite: 238].
3. [cite_start]**Refined Finishing:** The true value of a building lies in the details[cite: 238]. [cite_start]We complete every project to the highest aesthetic and quality standards using fine craftsmanship and superior materials[cite: 238].
4. [cite_start]**Superior Standards:** Prioritizing quality, safety, and sustainability[cite: 238]. [cite_start]Building long-lasting structures with solutions that meet international standards[cite: 238].
5. [cite_start]**Customer Trust:** Building long-term partnerships based on transparent communication and mutual trust[cite: 238]. [cite_start]We aim to be a reliable solution partner by keeping our promises[cite: 238].

[cite_start]*Alternative approved keywords:* Visionary Design, Precision Execution, Reliable Partnership, Enduring Quality[cite: 241, 243, 246, 248].

## 📑 7. Sitemap & Features
**Required Pages:**
* [cite_start]Home [cite: 268, 269]
* [cite_start]About Us [cite: 270]
* [cite_start]Services [cite: 272]
* [cite_start]Projects / Portfolio [cite: 274, 275]
* [cite_start]Contact [cite: 279]
* [cite_start]Careers [cite: 280, 281]

**Required Features:**
* [cite_start]Contact form [cite: 357, 358]
* [cite_start]WhatsApp button [cite: 359]
* [cite_start]Project gallery [cite: 362]
* [cite_start]Google Maps integration [cite: 364]
* [cite_start]Social media links [cite: 366]

## 📞 8. Contact Information
* [cite_start]**Main Phone / WhatsApp:** +964 750 122 6498 [cite: 296, 300]
* [cite_start]**Email:** 34prominent@gmail.com [cite: 298, 301]
* [cite_start]**Erbil Office Address:** Ankawa ashtar street no: 245/2/479 [cite: 299, 302]
* [cite_start]**Business Hours:** 08:00 - 18:00 [cite: 305, 306]
* [cite_start]**Website Coordination Contact:** Rupel Ora [cite: 307, 308]
* [cite_start]**Certifications:** Company possesses official certificates, licenses, and official approvals[cite: 224, 225].
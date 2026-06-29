# Spec: Remove ProjectsMap Completely

**Status:** Draft  
**Scope:** Delete the ProjectsMap interactive map component, its page route, its navigation entry, and its static asset.

---

## 1. Rationale

The interactive Projects Map (`/projects-map`) is no longer needed. It will be replaced by a static project gallery. All code, routes, and assets related to the map system should be removed to avoid dead code, unused build artifacts, and navigation dead ends.

---

## 2. Files to Delete

### 2.1 Component directory — `src/components/ProjectsMap/`
| File | Purpose |
|------|---------|
| `ProjectsMap.astro` | Orchestrator — queries collection, renders sub-components, mounts MapController |
| `MapController.ts` | Client-side map interaction logic |
| `MapStage.astro` | Renders inline SVG map |
| `ProjectThumbnail.astro` | Hoverable project pin on the map |
| `ProjectOverlay.astro` | Detail overlay shown on thumbnail click |
| `animations.ts` | GSAP animation helpers for the map |
| `types.ts` | TypeScript types for map project data |

**Action:** Delete the entire `src/components/ProjectsMap/` directory.

### 2.2 Page route — `src/pages/projects-map.astro`
| Detail | Value |
|--------|-------|
| File | `src/pages/projects-map.astro` |
| Purpose | Dedicated page route `/projects-map` |
| Imports | `Layout`, `NavBar`, `ProjectsMap` |
| Dependencies | Only imports `ProjectsMap` | 

**Action:** Delete file.

### 2.3 Static asset — `public/maps/middle-east.svg`
| Detail | Value |
|--------|-------|
| File | `public/maps/middle-east.svg` (44 KB) |
| Purpose | SVG map displayed inside `MapStage` |
| Other consumers | Only `MapStage.astro` references it |

**Optional:** Keep if the SVG may be reused elsewhere (e.g., a static contact map).  
**Recommended action:** Delete — can always be retrieved from git (`git checkout -- public/maps/middle-east.svg`).

---

## 3. Files to Modify

### 3.1 NavBar — `src/components/NavBar.astro`
**Change:** Remove the `Projects` link that points to `/projects-map`.

```diff
 const links = [
   { label: 'Home', href: '/' },
   { label: 'About', href: '/about' },
-  { label: 'Projects', href: '/projects-map' },
   { label: 'Services', href: '/#services-section' },
   { label: 'Careers', href: '/careers' },
   { label: 'Contact', href: '/contact' },
 ];
```

> **Important:** If a replacement Projects page exists (e.g., `src/pages/projects.astro`), the link should be updated to that URL instead of removed.

---

## 4. Dependencies & No-Op Checks

| Check | Status | Notes |
|-------|--------|-------|
| Any other file imports from `ProjectsMap/` | ❌ None found | Only `src/pages/projects-map.astro` |
| Any other file imports `MapController` | ❌ None found | Only `ProjectsMap.astro` |
| Any content collection depends on `map` field | ⚠️ Possible | `ProjectsMap.astro` filters `await getCollection("projects")` by `p.data.map`. If the `map` field still exists in the content schema, it's harmless dead schema — not urgent to remove, but worth cleaning later. |
| Any link (internal or external) to `/projects-map` | ✅ Only NavBar | See §3.1 |

---

## 5. Execution Order (Recommended)

```
1. Delete src/pages/projects-map.astro
2. Delete src/components/ProjectsMap/ (entire directory)
3. Optionally delete public/maps/middle-east.svg
4. Edit src/components/NavBar.astro — remove "Projects" link
5. Build (`npm run build`) to confirm no errors
6. Dev-server check — visit /projects-map → 404 (expected), verify NavBar
```

---

## 6. Rollback

All deleted files exist in git history. Recovery is a single command:

```bash
git checkout HEAD~1 -- src/pages/projects-map.astro src/components/ProjectsMap/ public/maps/middle-east.svg
```

Reverse the NavBar edit manually.

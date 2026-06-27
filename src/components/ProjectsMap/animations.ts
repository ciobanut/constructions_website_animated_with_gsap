import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

import type { ProjectMapData, MapConfig } from "./types";
import { DEFAULT_MAP_CONFIG } from "./types";

gsap.registerPlugin(ScrollTrigger, Flip);

/**
 * Build the master GSAP timeline for all projects.
 * Returns the ScrollTrigger instance so the caller can kill it on unmount.
 */
export function buildMasterTimeline(
  projects: ProjectMapData[],
  elements: {
    section: HTMLElement;
    mapContainer: HTMLElement;
    thumbnails: HTMLElement[];
    overlay: HTMLElement;
    overlayImage: HTMLImageElement;
    overlayTitle: HTMLElement;
    overlayDescription: HTMLElement;
    overlayLink: HTMLAnchorElement;
    stage: HTMLElement;
  },
  config?: MapConfig
): ScrollTrigger | null {
  if (!config) config = DEFAULT_MAP_CONFIG;
  if (projects.length === 0) return null;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return null;

  const isMobile = window.innerWidth <= config.mobileBreakpoint;
  if (isMobile) return null;

  const {
    section,
    mapContainer,
    thumbnails,
    overlay,
    overlayImage,
    overlayTitle,
    overlayDescription,
    overlayLink,
  } = elements;

  // Master timeline — ease is ignored by scrub but set as fallback
  const master = gsap.timeline({
    defaults: { ease: "none" },
  });

  // Initial state
  gsap.set(overlay, { opacity: 0, visibility: "hidden" });
  gsap.set([overlayTitle, overlayDescription], {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  });

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Per-project durations (proportional — actual scroll distance comes from end)
  const D = {
    intro: 1.5,        // breathing room before first project
    zoom: 2.0,         // map pan+zoom to project
    highlight: 0.8,    // thumbnail glow/scale
    flipToFull: 1.2,   // Flip thumbnail → fullscreen
    fadeInContent: 1.0, // title + description fade in
    hold: 2.0,          // hold on fullscreen project
    fadeOutContent: 0.8, // title + description fade out
    flipBack: 1.2,      // Flip fullscreen → thumbnail
    resetThumb: 0.6,    // thumbnail scale reset
    transition: 1.5,    // map moves to next project
    outro: 1.0,         // breathing room after last project
  };

  // ── Intro: hold on full map overview ──
  master.to({}, { duration: D.intro });

  projects.forEach((project, index) => {
    const thumb = thumbnails[index];
    if (!thumb) return;

    const zoom = project.map.zoom ?? config!.defaultZoom;

    // Calculate map translation to center the project
    const targetX = (project.map.x / 100) * vw;
    const targetY = (project.map.y / 100) * vh;
    const translateX = vw / 2 - targetX * zoom;
    const translateY = vh / 2 - targetY * zoom;

    const stepLabel = `project-${index}`;
    const seq = gsap.timeline();

    let t = 0; // local cursor

    // ── 1. Zoom map toward project ──
    seq.to(
      mapContainer,
      {
        x: translateX,
        y: translateY,
        scale: zoom,
        duration: D.zoom,
        ease: "power2.inOut",
      },
      t
    );
    t += D.zoom;

    // ── 2. Highlight thumbnail ──
    seq.to(
      thumb,
      {
        scale: 1.2,
        boxShadow: "0 12px 48px rgba(255,255,255,0.2)",
        duration: D.highlight,
        ease: "power2.out",
      },
      t - D.highlight * 0.4 // start slightly before zoom ends
    );

    // ── 3. Flip thumbnail → fullscreen ──
    seq.add(() => {
      const state = Flip.getState(thumb);
      overlayImage.src = thumb.querySelector("img")?.src || "";
      overlayImage.alt = project.title;
      overlayTitle.textContent = project.title;
      overlayDescription.textContent = project.description;
      overlayLink.href = `/projects/${project.slug}`;

      gsap.set(overlay, { visibility: "visible", opacity: 1 });

      Flip.from(state, {
        targets: overlayImage,
        duration: D.flipToFull,
        ease: "power2.inOut",
        absolute: true,
        onComplete: () => {
          gsap.set(thumb, { autoAlpha: 0 });
        },
      });
    }, t);
    t += D.flipToFull;

    // ── 4. Fade in overlay content ──
    seq.to(
      overlayTitle,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: D.fadeInContent,
        ease: "power3.out",
      },
      t
    );
    seq.to(
      overlayDescription,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: D.fadeInContent,
        ease: "power3.out",
      },
      t + 0.15 // slight stagger
    );
    t += D.fadeInContent;

    // ── 5. Hold on fullscreen project ──
    seq.to({}, { duration: D.hold }, t);
    t += D.hold;

    // ── 6. Fade out overlay content ──
    seq.to([overlayTitle, overlayDescription], {
      opacity: 0,
      y: -30,
      filter: "blur(10px)",
      duration: D.fadeOutContent,
      ease: "power2.in",
    }, t);
    t += D.fadeOutContent;

    // ── 7. Flip fullscreen → thumbnail ──
    seq.add(() => {
      const state = Flip.getState(overlayImage);
      gsap.set(thumb, { autoAlpha: 1 });

      Flip.from(state, {
        targets: thumb,
        duration: D.flipBack,
        ease: "power2.inOut",
        absolute: true,
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden", opacity: 0 });
        },
      });
    }, t);
    t += D.flipBack;

    // ── 8. Reset thumbnail scale ──
    seq.to(
      thumb,
      {
        scale: 1,
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        duration: D.resetThumb,
        ease: "power2.out",
      },
      t
    );
    t += D.resetThumb;

    // ── 9. Transition to next project (or outro) ──
    // Smoothly pull map back slightly before next zoom
    if (index < projects.length - 1) {
      const nextProject = projects[index + 1];
      const nextZoom = nextProject.map.zoom ?? config!.defaultZoom;
      const nextTargetX = (nextProject.map.x / 100) * vw;
      const nextTargetY = (nextProject.map.y / 100) * vh;
      const midX = vw / 2 - ((targetX + nextTargetX) / 2) * ((zoom + nextZoom) / 2);
      const midY = vh / 2 - ((targetY + nextTargetY) / 2) * ((zoom + nextZoom) / 2);

      seq.to(
        mapContainer,
        {
          x: midX,
          y: midY,
          scale: (zoom + nextZoom) / 2,
          duration: D.transition,
          ease: "power2.inOut",
        },
        t
      );
    }
    t += D.transition;

    master.add(seq, stepLabel);
  });

  // ── Outro: hold on final view ──
  master.to({}, { duration: D.outro });

  // Total scroll distance = total timeline duration × multiplier
  // The timeline total duration in "seconds" is the sum of all D values.
  // We multiply by a factor to get enough scroll pixels.
  const totalDuration = master.duration();
  const scrollMultiplier = 280; // pixels per "timeline second"
  const totalScrollPx = Math.ceil(totalDuration * scrollMultiplier);

  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: `+=${totalScrollPx}`,
    pin: true,
    scrub: 1.5,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    animation: master,
  });

  return st;
}

/**
 * Check if animations should run.
 */
export function shouldAnimate(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  if (window.innerWidth <= DEFAULT_MAP_CONFIG.mobileBreakpoint) return false;
  return true;
}

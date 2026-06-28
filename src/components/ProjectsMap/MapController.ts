import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

import { buildMasterTimeline, shouldAnimate } from "./animations";
import type { ProjectMapData, MapConfig } from "./types";
import { DEFAULT_MAP_CONFIG } from "./types";

gsap.registerPlugin(ScrollTrigger, Flip);

/**
 * Controls the interactive projects map experience.
 * Instantiated once on page load, manages GSAP timeline lifecycle.
 */
export class MapController {
  private projects: ProjectMapData[];
  private config: MapConfig;
  private scrollTrigger: ScrollTrigger | null = null;
  private isDesktop: boolean;

  constructor(projects: ProjectMapData[], config: MapConfig = DEFAULT_MAP_CONFIG) {
    this.projects = projects;
    this.config = config;
    this.isDesktop = shouldAnimate();
  }

  init(elements: {
    section: HTMLElement;
    mapContainer: HTMLElement;
    thumbnails: HTMLElement[];
    overlay: HTMLElement;
    overlayImage: HTMLImageElement;
    overlayTitle: HTMLElement;
    overlayDescription: HTMLElement;
    overlayLink: HTMLAnchorElement;
    stage: HTMLElement;
  }): void {
    if (!this.isDesktop) {
      this.initMobile(elements);
      return;
    }

    // Build timeline synchronously — no rAF delay
    this.scrollTrigger = buildMasterTimeline(
      this.projects,
      elements,
      this.config
    )!;

    // Refresh on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nowDesktop = shouldAnimate();
        if (nowDesktop !== this.isDesktop) {
          window.location.reload();
        }
      }, 300);
    });
  }

  private initMobile(elements: {
    section: HTMLElement;
    mapContainer: HTMLElement;
    thumbnails: HTMLElement[];
    overlay: HTMLElement;
    overlayImage: HTMLImageElement;
    overlayTitle: HTMLElement;
    overlayDescription: HTMLElement;
    overlayLink: HTMLAnchorElement;
    stage: HTMLElement;
  }): void {
    const { thumbnails, overlay, overlayImage, overlayTitle, overlayDescription, overlayLink } = elements;

    thumbnails.forEach((thumb, index) => {
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", () => {
        const project = this.projects[index];
        if (!project) return;

        overlayImage.src = thumb.querySelector("img")?.src || "";
        overlayImage.alt = project.title;
        overlayTitle.textContent = project.title;
        overlayDescription.textContent = project.description;
        overlayLink.href = `/projects/${project.slug}`;

        gsap.set(overlay, { visibility: "visible", opacity: 1 });
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      });
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => gsap.set(overlay, { visibility: "hidden" }),
        });
      }
    });
  }

  destroy(): void {
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
      this.scrollTrigger = null;
    }
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf("*");
  }
}

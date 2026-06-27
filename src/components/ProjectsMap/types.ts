export interface ProjectMapData {
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  map: {
    x: number;
    y: number;
    zoom?: number;
  };
}

export interface MapConfig {
  defaultZoom: number;
  projectDuration: number; // in scroll height units
  animationDuration: number; // in seconds
  mobileBreakpoint: number;
}

export const DEFAULT_MAP_CONFIG: MapConfig = {
  defaultZoom: 2.5,
  projectDuration: 180,
  animationDuration: 0.5,
  mobileBreakpoint: 768,
};

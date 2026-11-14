// ============================================================================
// COFOCO Image Map - Direct bindings to authentic brand and character imagery
// ============================================================================

import type { CharacterSlug } from './types';

export const CHARACTER_IMAGE_MAP: Record<CharacterSlug, string> = {
  arjun: '/characters/arjunhero.jpg',
  bheema: '/characters/bheemahero.jpg',
  karna: '/characters/karnahero.jpg',
  sita: '/characters/sitahero.jpg',
  draupadi: '/characters/draupadihero.jpg',
  savitri: '/characters/savitrihero.jpg',
};

export const KIT_IMAGE_MAP: Record<string, string> = {
  // Primary kit imagery
  'arjun-morning-prep-kit': '/characters/arjun-morning-prep-kit.jpg',
  'arjun-focus-hydration-kit': '/characters/arjun-focus-hydration-kit.jpg',
  'bheema-heavy-training-kit': '/characters/bheema-heavy-training-kit.jpg',
  'bheema-structural-roller-kit': '/characters/bheema-structural-roller-kit.jpg',
  'karna-daily-resolve-kit': '/characters/karna-daily-resolve-kit.jpg',
  'sita-steady-decompression-kit': '/characters/sita-steady-decompression-kit.jpg',
  'draupadi-control-grip-kit': '/characters/DraupadiandSavitrikits.jpg',
  'savitri-habit-rhythm-kit': '/characters/savitri-habit-kit.jpg',
};

export const BRAND_IMAGES = {
  homeHero: '/brand/home-hero.jpg',
  draupadiSavitriShared: '/characters/DraupadiandSavitrikits.jpg',
};

export function getCharacterImage(slug: CharacterSlug): string {
  return CHARACTER_IMAGE_MAP[slug] || '/brand/home-hero.jpg';
}

export function getKitImage(kitSlug: string): string {
  return KIT_IMAGE_MAP[kitSlug] || '/brand/home-hero.jpg';
}

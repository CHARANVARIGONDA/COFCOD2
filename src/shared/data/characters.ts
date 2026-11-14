// ============================================================================
// COFOCO Character Roster
// Placeholder copy - pending brand approval. No medical or health claims.
// ============================================================================

import type { Character } from '../types';

export const CHARACTERS: Character[] = [
  {
    slug: 'arjun',
    name: 'ARJUN',
    title: 'The Master Archer',
    archetype: 'PRECISION // ARCHER VELOCITY',
    tagline: 'Pinpoint trajectory. Calibrated neuromuscular focus.',
    discipline: 'Dynamic Warm-Ups // Kinetic Precision // Speed Work',
    cue: 'Pre-dawn mobility, diaphragm priming, unbroken gaze.',
    routineDescription:
      'Arjun routines eliminate peripheral jitter. Designed for explosive kinetic hand-eye coordination, rapid wrist and scapular activation, and dialed-in neuromuscular speed before heavy output.',
    mythicContext:
      'The third Pandava whose eye never strayed from the bird’s iris. In modern training, Arjun embodies laser focus and the removal of all superfluous motion.',
    color: '#6AAEE0',
    textAccent: '#8EC2F5',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #0F1824 0%, #0A0D12 70%, #070707 100%)',
    glowColor: 'rgba(91, 141, 184, 0.45)',
    emblemId: 'gandiva-bow',
    heroImage: '/characters/arjunhero.jpg',
    kitSlugs: ['arjun-morning-prep-kit', 'arjun-focus-hydration-kit'],
  },
  {
    slug: 'bheema',
    name: 'BHEEMA',
    title: 'The Unyielding Colossus',
    archetype: 'RAW FORCE // GROUNDED LOAD',
    tagline: 'Massive compound tension. Immovable structural integrity.',
    discipline: 'Heavy Compound Lift // Joint Compression // Dense Volume',
    cue: 'Root into the floor, brace the abdominal wall, move the earth.',
    routineDescription:
      'Engineered for lifters operating under extreme axial load. Bheema gear stabilizes the posterior chain, cushions high-tonnage joint stress, and fosters uncompromising structural density.',
    mythicContext:
      'Possessor of ten thousand elephants’ brute vigor. Bheema represents raw physical power tempered by disciplined stability and unshakeable root.',
    color: '#A0704A',
    textAccent: '#C58F63',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #1B120C 0%, #0E0A07 70%, #070707 100%)',
    glowColor: 'rgba(160, 112, 74, 0.45)',
    emblemId: 'gada-mace',
    heroImage: '/characters/bheemahero.jpg',
    kitSlugs: ['bheema-heavy-training-kit', 'bheema-structural-roller-kit'],
  },
  {
    slug: 'karna',
    name: 'KARNA',
    title: 'The Solitary Sun Warrior',
    archetype: 'ENDURANCE // UNBROKEN RESOLVE',
    tagline: 'Tested under heat. Built for the relentless solitary grind.',
    discipline: 'Lactate Threshold // Interval Density // Solitary Grit',
    cue: 'Exhale heat, disregard discomfort, repeat the cycle until done.',
    routineDescription:
      'Karna equipment thrives in high-friction, solitary conditioning sessions where external motivation is absent. Built with rugged canvas, reinforced brass, and sweat-shedding composites.',
    mythicContext:
      'Born with golden armor fused to flesh, Karna sacrificed everything yet never surrendered his code. He is the spirit of unheralded, relentless work.',
    color: '#E59438',
    textAccent: '#FFB85C',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #1E1206 0%, #100A04 70%, #070707 100%)',
    glowColor: 'rgba(217, 131, 36, 0.45)',
    emblemId: 'kavacha-sun',
    heroImage: '/characters/karnahero.jpg',
    kitSlugs: ['karna-daily-resolve-kit'],
  },
  {
    slug: 'sita',
    name: 'SITA',
    title: 'The Earth Anchor',
    archetype: 'DECOMPRESSION // POSTURAL ROOTS',
    tagline: 'Quiet somatic restoration. Return the spine to zero tension.',
    discipline: 'Fascial Release // Parasympathetic Breath // Spinal Alignment',
    cue: 'Lower heart rate, yield gravity to dense cork, quiet the nervous system.',
    routineDescription:
      'Designed for intentional down-regulation. Sita tools employ natural antimicrobial cork, pure cotton webbing, and slow gravity decompression to transition high-intensity nervous systems into restorative sleep.',
    mythicContext:
      'Born of the furrowed earth, enduring trial with profound dignity. Sita symbolizes organic purity, unbreakable foundation, and returning to equilibrium.',
    color: '#EFE6D2',
    textAccent: '#EFE6D2',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #161610 0%, #0D0D0B 70%, #070707 100%)',
    glowColor: 'rgba(239, 230, 210, 0.45)',
    emblemId: 'lotus-chasm',
    heroImage: '/characters/sitahero.jpg',
    kitSlugs: ['sita-steady-decompression-kit'],
  },
  {
    slug: 'draupadi',
    name: 'DRAUPADI',
    title: 'The Sacred Flame',
    archetype: 'FIERCE AGILITY // TACTILE HEAT',
    tagline: 'Blazing rotational power. Unforgiving grip and reflex control.',
    discipline: 'Plyometric Agility // Rotational Torque // Grip Stamina',
    cue: 'Snap hips, squeeze the knurl, channel internal fire into cadence.',
    routineDescription:
      'Crafted for high-energy athletes who command high cadence and sudden direction shifts. Grips, chalk blocks, and speed ropes calibrated for rapid kinetic transfer and fierce grip stability.',
    mythicContext:
      'Born from sacrificial sacrificial fire, uncompromising and radiant. Draupadi embodies righteous heat, unyielding sovereignty, and dynamic velocity.',
    color: '#C25A6E',
    textAccent: '#DE778C',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #1E0F14 0%, #110A0C 70%, #070707 100%)',
    glowColor: 'rgba(194, 90, 110, 0.45)',
    emblemId: 'sacred-fire',
    heroImage: '/characters/draupadihero.jpg',
    kitSlugs: ['draupadi-control-grip-kit'],
  },
  {
    slug: 'savitri',
    name: 'SAVITRI',
    title: 'The Defier of Decay',
    archetype: 'LONGEVITY // PERSISTENT RHYTHM',
    tagline: 'Daily isometric resilience. Outlasting time through cadence.',
    discipline: 'Tendon Longevity // Habit Consistency // Micro-Mobility',
    cue: 'Ten slow repetitions, unbroken daily cadence, lifelong fortitude.',
    routineDescription:
      'Savitri implements focus on joint longevity, tendon conditioning, and micro-habits. Built with durable vulcanized natural rubber and timeless brass accents to endure years of daily use.',
    mythicContext:
      'The princess whose intellect and resolve retrieved her companion from Yama himself. Savitri signifies unshakeable persistence and triumph over physical decline.',
    color: '#8A8F3C',
    textAccent: '#A8AD4B',
    bgGradient: 'radial-gradient(ellipse at 50% 20%, #151A0C 0%, #0C0E08 70%, #070707 100%)',
    glowColor: 'rgba(138, 143, 60, 0.45)',
    emblemId: 'banyan-tree',
    heroImage: '/characters/savitrihero.jpg',
    kitSlugs: ['savitri-habit-rhythm-kit'],
  },
];

export function getCharacterBySlug(slug: string): Character | undefined {
  return CHARACTERS.find((c) => c.slug === slug);
}

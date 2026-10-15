import { Wallpaper } from '../types/theme';

export const WALLPAPERS: Wallpaper[] = [
  {
    id: 'deep-aurora',
    name: 'Aurora Borealis',
    category: 'mesh',
    recommendedPaletteId: 'electric-sapphire',
    thumbnailGradient: 'linear-gradient(135deg, #1e1b4b 0%, #065f46 50%, #0284c7 100%)',
    backgroundCss: `
      radial-gradient(at 10% 20%, rgba(59, 130, 246, 0.45) 0px, transparent 50%),
      radial-gradient(at 90% 10%, rgba(16, 185, 129, 0.4) 0px, transparent 50%),
      radial-gradient(at 50% 80%, rgba(99, 102, 241, 0.5) 0px, transparent 50%),
      radial-gradient(at 80% 80%, rgba(14, 165, 233, 0.35) 0px, transparent 50%),
      linear-gradient(180deg, #090e1a 0%, #04121a 100%)
    `
  },
  {
    id: 'tokyo-midnight',
    name: 'Tokyo Neon Dusk',
    category: 'mesh',
    recommendedPaletteId: 'cyber-neon',
    thumbnailGradient: 'linear-gradient(135deg, #2e1065 0%, #d946ef 50%, #06b6d4 100%)',
    backgroundCss: `
      radial-gradient(at 20% 25%, rgba(217, 70, 239, 0.45) 0px, transparent 50%),
      radial-gradient(at 85% 30%, rgba(6, 182, 212, 0.45) 0px, transparent 50%),
      radial-gradient(at 50% 75%, rgba(168, 85, 247, 0.4) 0px, transparent 50%),
      linear-gradient(180deg, #0d0417 0%, #17072a 100%)
    `
  },
  {
    id: 'emerald-canopy',
    name: 'Emerald Canopy',
    category: 'landscape',
    recommendedPaletteId: 'emerald-evergreen',
    thumbnailGradient: 'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #14b8a6 100%)',
    backgroundCss: `
      radial-gradient(at 15% 15%, rgba(16, 185, 129, 0.45) 0px, transparent 50%),
      radial-gradient(at 85% 20%, rgba(20, 184, 166, 0.4) 0px, transparent 50%),
      radial-gradient(at 50% 85%, rgba(132, 204, 22, 0.35) 0px, transparent 50%),
      linear-gradient(180deg, #021710 0%, #06261c 100%)
    `
  },
  {
    id: 'solar-dunes',
    name: 'Solar Dunes',
    category: 'warm',
    recommendedPaletteId: 'solar-amber',
    thumbnailGradient: 'linear-gradient(135deg, #78350f 0%, #f59e0b 50%, #f97316 100%)',
    backgroundCss: `
      radial-gradient(at 25% 20%, rgba(245, 158, 11, 0.45) 0px, transparent 50%),
      radial-gradient(at 80% 30%, rgba(249, 115, 22, 0.4) 0px, transparent 50%),
      radial-gradient(at 40% 80%, rgba(234, 179, 8, 0.3) 0px, transparent 50%),
      linear-gradient(180deg, #140d04 0%, #241607 100%)
    `
  },
  {
    id: 'arctic-frost',
    name: 'Glacier Blue',
    category: 'minimal',
    recommendedPaletteId: 'nordic-glacier',
    thumbnailGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #cbd5e1 100%)',
    backgroundCss: `
      radial-gradient(at 20% 30%, rgba(14, 165, 233, 0.4) 0px, transparent 50%),
      radial-gradient(at 80% 20%, rgba(56, 189, 248, 0.35) 0px, transparent 50%),
      radial-gradient(at 50% 85%, rgba(148, 163, 184, 0.25) 0px, transparent 50%),
      linear-gradient(180deg, #08101e 0%, #0f1c30 100%)
    `
  },
  {
    id: 'crimson-velvet',
    name: 'Velvet Dusk',
    category: 'mesh',
    recommendedPaletteId: 'velvet-rosewood',
    thumbnailGradient: 'linear-gradient(135deg, #881337 0%, #e11d48 50%, #fb7185 100%)',
    backgroundCss: `
      radial-gradient(at 20% 20%, rgba(225, 29, 72, 0.45) 0px, transparent 50%),
      radial-gradient(at 80% 25%, rgba(244, 63, 94, 0.35) 0px, transparent 50%),
      radial-gradient(at 45% 80%, rgba(251, 113, 133, 0.25) 0px, transparent 50%),
      linear-gradient(180deg, #140409 0%, #260812 100%)
    `
  },
  {
    id: 'obsidian-matrix',
    name: 'Obsidian Minimal',
    category: 'geometric',
    recommendedPaletteId: 'monochrome-carbon',
    thumbnailGradient: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #52525b 100%)',
    backgroundCss: `
      radial-gradient(at 50% 30%, rgba(255, 255, 255, 0.08) 0px, transparent 50%),
      radial-gradient(at 80% 70%, rgba(161, 161, 170, 0.06) 0px, transparent 40%),
      linear-gradient(180deg, #09090b 0%, #121214 100%)
    `
  },
  {
    id: 'sunset-glow',
    name: 'Dawn Horizon',
    category: 'warm',
    recommendedPaletteId: 'sunset-horizon',
    thumbnailGradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 40%, #a855f7 100%)',
    backgroundCss: `
      radial-gradient(at 25% 25%, rgba(249, 115, 22, 0.45) 0px, transparent 50%),
      radial-gradient(at 80% 30%, rgba(168, 85, 247, 0.4) 0px, transparent 50%),
      radial-gradient(at 50% 80%, rgba(236, 72, 153, 0.3) 0px, transparent 50%),
      linear-gradient(180deg, #130718 0%, #220c2b 100%)
    `
  }
];

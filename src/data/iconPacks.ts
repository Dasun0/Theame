import { IconPackDefinition, IconPackId } from '../types/theme';

export const ICON_PACKS: Record<IconPackId, IconPackDefinition> = {
  linear: {
    id: 'linear',
    name: 'Linear Minimal',
    tagline: 'Clean & Ultra-Refined',
    description: 'Crisp monoline aesthetic with precise 1.5px geometry and airy negative space.',
    defaultStrokeWidth: 1.5,
    defaultShape: 'none' as any,
    defaultBackplate: 'none',
    badge: 'Monoline'
  },
  duotone: {
    id: 'duotone',
    name: 'Duotone Nova',
    tagline: 'Dual-Layer Chromatic Depth',
    description: 'Combines dynamic accent strokes with translucent tinted secondary fills for vibrant depth.',
    defaultStrokeWidth: 1.8,
    defaultShape: 'rounded',
    defaultBackplate: 'subtle',
    badge: 'Duotone'
  },
  squircle: {
    id: 'squircle',
    name: 'Squircle Neo-Glass',
    tagline: 'Frosted Curvature & Micro-Glow',
    description: 'Fluid iOS/Fluent inspired continuous curvature with subtle glassmorphic backing.',
    defaultStrokeWidth: 2.0,
    defaultShape: 'squircle',
    defaultBackplate: 'glass',
    badge: 'Glassmorphic'
  },
  solid: {
    id: 'solid',
    name: 'Solid Obsidian',
    tagline: 'Bold High-Contrast Silhouette',
    description: 'Punchy filled glyphs engineered for instantaneous recognizability in high-velocity workflows.',
    defaultStrokeWidth: 2.2,
    defaultShape: 'rounded',
    defaultBackplate: 'solid',
    badge: 'Filled'
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Chamfer',
    tagline: 'Precision Angled Monoline',
    description: 'Sharp chamfered corners, technical precision markers, and electric neon edge definition.',
    defaultStrokeWidth: 1.6,
    defaultShape: 'hex',
    defaultBackplate: 'subtle',
    badge: 'High-Tech'
  },
  papercraft: {
    id: 'papercraft',
    name: 'Papercraft Tactile',
    tagline: 'Soft Clay & Warm Shadows',
    description: 'Tactile layered cards with gentle downward diffuse ambient shadows and friendly radius.',
    defaultStrokeWidth: 2.0,
    defaultShape: 'circle',
    defaultBackplate: 'solid',
    badge: 'Tactile'
  }
};

export interface CatalogIconItem {
  name: string;
  category: 'system' | 'media' | 'communication' | 'productivity' | 'device' | 'files';
  label: string;
}

export const CATALOG_ICONS: CatalogIconItem[] = [
  // System
  { name: 'Settings', category: 'system', label: 'Settings' },
  { name: 'Shield', category: 'system', label: 'Security' },
  { name: 'BatteryCharging', category: 'system', label: 'Battery' },
  { name: 'Wifi', category: 'system', label: 'Wi-Fi' },
  { name: 'Bluetooth', category: 'system', label: 'Bluetooth' },
  { name: 'Bell', category: 'system', label: 'Notifications' },
  { name: 'Search', category: 'system', label: 'Search' },
  { name: 'Sliders', category: 'system', label: 'Preferences' },
  { name: 'Power', category: 'system', label: 'Power' },
  { name: 'Cpu', category: 'system', label: 'Processor' },
  { name: 'Sparkles', category: 'system', label: 'Appearance' },
  { name: 'Compass', category: 'system', label: 'Navigation' },

  // Media
  { name: 'Music', category: 'media', label: 'Music' },
  { name: 'Play', category: 'media', label: 'Play' },
  { name: 'Camera', category: 'media', label: 'Camera' },
  { name: 'Image', category: 'media', label: 'Photos' },
  { name: 'Video', category: 'media', label: 'Video' },
  { name: 'Headphones', category: 'media', label: 'Audio' },
  { name: 'Radio', category: 'media', label: 'Radio' },
  { name: 'Volume2', category: 'media', label: 'Volume' },

  // Communication
  { name: 'MessageSquare', category: 'communication', label: 'Messages' },
  { name: 'Mail', category: 'communication', label: 'Mail' },
  { name: 'Phone', category: 'communication', label: 'Phone' },
  { name: 'Send', category: 'communication', label: 'Direct' },
  { name: 'Users', category: 'communication', label: 'Contacts' },
  { name: 'Share2', category: 'communication', label: 'Share' },
  { name: 'Heart', category: 'communication', label: 'Favorites' },
  { name: 'AtSign', category: 'communication', label: 'Mentions' },

  // Productivity
  { name: 'Calendar', category: 'productivity', label: 'Calendar' },
  { name: 'Clock', category: 'productivity', label: 'Clock' },
  { name: 'CheckSquare', category: 'productivity', label: 'Tasks' },
  { name: 'Bookmark', category: 'productivity', label: 'Bookmarks' },
  { name: 'Layers', category: 'productivity', label: 'Workspaces' },
  { name: 'BarChart3', category: 'productivity', label: 'Analytics' },
  { name: 'Calculator', category: 'productivity', label: 'Calculator' },
  { name: 'Target', category: 'productivity', label: 'Goals' },

  // Device
  { name: 'Smartphone', category: 'device', label: 'Mobile' },
  { name: 'Laptop', category: 'device', label: 'Laptop' },
  { name: 'Monitor', category: 'device', label: 'Desktop' },
  { name: 'Watch', category: 'device', label: 'Watch' },
  { name: 'HardDrive', category: 'device', label: 'Storage' },
  { name: 'Printer', category: 'device', label: 'Print' },

  // Files & Tools
  { name: 'Folder', category: 'files', label: 'Folders' },
  { name: 'FileText', category: 'files', label: 'Documents' },
  { name: 'Cloud', category: 'files', label: 'Cloud Drive' },
  { name: 'Download', category: 'files', label: 'Downloads' },
  { name: 'Terminal', category: 'files', label: 'Terminal' },
  { name: 'Code', category: 'files', label: 'Code' },
  { name: 'Trash2', category: 'files', label: 'Trash' },
  { name: 'Paperclip', category: 'files', label: 'Attachments' }
];

export type IconPackId = 
  | 'linear' 
  | 'duotone' 
  | 'squircle' 
  | 'solid' 
  | 'cyber' 
  | 'papercraft';

export type IconShape = 'squircle' | 'circle' | 'rounded' | 'sharp' | 'hex';
export type BackplateStyle = 'none' | 'subtle' | 'solid' | 'glass' | 'gradient';

export interface IconPackDefinition {
  id: IconPackId;
  name: string;
  tagline: string;
  description: string;
  defaultStrokeWidth: number;
  defaultShape: IconShape;
  defaultBackplate: BackplateStyle;
  badge: string;
}

export interface ColorTones {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SystemPalette {
  id: string;
  name: string;
  description: string;
  category: 'vibrant' | 'minimal' | 'cyber' | 'nature' | 'warm';
  isCustom?: boolean;
  colors: {
    primary: string; // main accent (buttons, active states)
    primaryHover: string;
    secondary: string; // secondary accent
    accent: string; // tertiary highlight
    
    // Light mode surface tokens
    lightBg: string;
    lightCard: string;
    lightBorder: string;
    lightText: string;
    lightMuted: string;
    
    // Dark mode surface tokens
    darkBg: string;
    darkCard: string;
    darkBorder: string;
    darkText: string;
    darkMuted: string;

    // Status colors
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export interface Wallpaper {
  id: string;
  name: string;
  category: 'mesh' | 'geometric' | 'minimal' | 'landscape' | 'warm';
  backgroundCss: string;
  thumbnailGradient: string;
  recommendedPaletteId: string;
}

export type PreviewDevice = 'mobile' | 'desktop' | 'component-kit' | 'icon-lab';

export interface ThemeConfig {
  iconPack: IconPackId;
  iconShape: IconShape;
  iconBackplate: BackplateStyle;
  iconStrokeWidth: number;
  iconScale: number; // e.g. 1.0 (24px)
  
  paletteId: string;
  customPalette: SystemPalette['colors'];
  
  isDark: boolean;
  wallpaperId: string;
  systemRadius: number; // 4, 8, 12, 16, 24px
  glassmorphism: boolean; // backdrop blur active
  
  activeView: PreviewDevice;
}

export interface SavedPreset {
  id: string;
  name: string;
  createdAt: number;
  config: ThemeConfig;
}

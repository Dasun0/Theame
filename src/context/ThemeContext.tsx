import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  ThemeConfig, 
  IconPackId, 
  IconShape, 
  BackplateStyle, 
  PreviewDevice, 
  SavedPreset, 
  SystemPalette 
} from '../types/theme';
import { SYSTEM_PALETTES, generateHarmoniousPalette } from '../data/palettes';
import { ICON_PACKS } from '../data/iconPacks';
import { WALLPAPERS } from '../data/wallpapers';

const DEFAULT_CONFIG: ThemeConfig = {
  iconPack: 'squircle',
  iconShape: 'squircle',
  iconBackplate: 'glass',
  iconStrokeWidth: 2.0,
  iconScale: 1.0,
  paletteId: 'electric-sapphire',
  customPalette: SYSTEM_PALETTES[0].colors,
  isDark: true,
  wallpaperId: 'deep-aurora',
  systemRadius: 16,
  glassmorphism: true,
  activeView: 'mobile'
};

interface ActiveTokens {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  status: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

interface ThemeContextType {
  config: ThemeConfig;
  tokens: ActiveTokens;
  currentPalette: SystemPalette;
  setIconPack: (packId: IconPackId) => void;
  setIconShape: (shape: IconShape) => void;
  setIconBackplate: (style: BackplateStyle) => void;
  setIconStrokeWidth: (width: number) => void;
  setIconScale: (scale: number) => void;
  setPaletteId: (paletteId: string) => void;
  setCustomColor: (key: keyof SystemPalette['colors'], val: string) => void;
  generateFromHex: (hex: string) => void;
  generateFromWallpaper: (wallpaperId: string) => void;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  setWallpaperId: (wallpaperId: string) => void;
  setSystemRadius: (radius: number) => void;
  setGlassmorphism: (enabled: boolean) => void;
  setActiveView: (view: PreviewDevice) => void;
  savedPresets: SavedPreset[];
  saveCurrentPreset: (name: string) => void;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
  resetDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem('aura_theme_active_config');
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => {
    try {
      const saved = localStorage.getItem('aura_theme_saved_presets');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'preset-cyberpunk',
        name: 'Neon Cyberpunk OS',
        createdAt: Date.now() - 86400000,
        config: {
          ...DEFAULT_CONFIG,
          iconPack: 'cyber',
          iconShape: 'hex',
          iconBackplate: 'subtle',
          paletteId: 'cyber-neon',
          wallpaperId: 'tokyo-midnight'
        }
      },
      {
        id: 'preset-emerald-minimal',
        name: 'Zen Evergreen Linear',
        createdAt: Date.now() - 43200000,
        config: {
          ...DEFAULT_CONFIG,
          iconPack: 'linear',
          iconShape: 'rounded',
          iconBackplate: 'none',
          paletteId: 'emerald-evergreen',
          wallpaperId: 'emerald-canopy',
          systemRadius: 12
        }
      }
    ];
  });

  // Save active config to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aura_theme_active_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  // Save presets list to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aura_theme_saved_presets', JSON.stringify(savedPresets));
    } catch {
      // ignore
    }
  }, [savedPresets]);

  // Find active palette
  const currentPalette = useMemo<SystemPalette>(() => {
    if (config.paletteId === 'custom') {
      return {
        id: 'custom',
        name: 'Custom Tuned Palette',
        description: 'User crafted color token assignments',
        category: 'vibrant',
        isCustom: true,
        colors: config.customPalette
      };
    }
    const found = SYSTEM_PALETTES.find(p => p.id === config.paletteId);
    return found || SYSTEM_PALETTES[0];
  }, [config.paletteId, config.customPalette]);

  // Compute active tokens based on current palette and dark mode
  const tokens = useMemo<ActiveTokens>(() => {
    const c = currentPalette.colors;
    const isDark = config.isDark;

    return {
      primary: c.primary,
      primaryHover: c.primaryHover || c.primary,
      secondary: c.secondary,
      accent: c.accent,
      background: isDark ? c.darkBg : c.lightBg,
      card: isDark ? c.darkCard : c.lightCard,
      border: isDark ? c.darkBorder : c.lightBorder,
      text: isDark ? c.darkText : c.lightText,
      textMuted: isDark ? c.darkMuted : c.lightMuted,
      status: {
        success: c.success,
        warning: c.warning,
        danger: c.danger,
        info: c.info
      }
    };
  }, [currentPalette, config.isDark]);

  // Dynamic CSS variables injection on body
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--sys-primary', tokens.primary);
    root.style.setProperty('--sys-secondary', tokens.secondary);
    root.style.setProperty('--sys-accent', tokens.accent);
    root.style.setProperty('--sys-bg', tokens.background);
    root.style.setProperty('--sys-card', tokens.card);
    root.style.setProperty('--sys-border', tokens.border);
    root.style.setProperty('--sys-text', tokens.text);
    root.style.setProperty('--sys-text-muted', tokens.textMuted);
    root.style.setProperty('--sys-radius', `${config.systemRadius}px`);
  }, [tokens, config.systemRadius]);

  const setIconPack = (packId: IconPackId) => {
    const def = ICON_PACKS[packId];
    setConfig(prev => ({
      ...prev,
      iconPack: packId,
      iconShape: def.defaultShape,
      iconBackplate: def.defaultBackplate,
      iconStrokeWidth: def.defaultStrokeWidth
    }));
  };

  const setIconShape = (shape: IconShape) => {
    setConfig(prev => ({ ...prev, iconShape: shape }));
  };

  const setIconBackplate = (style: BackplateStyle) => {
    setConfig(prev => ({ ...prev, iconBackplate: style }));
  };

  const setIconStrokeWidth = (width: number) => {
    setConfig(prev => ({ ...prev, iconStrokeWidth: width }));
  };

  const setIconScale = (scale: number) => {
    setConfig(prev => ({ ...prev, iconScale: scale }));
  };

  const setPaletteId = (paletteId: string) => {
    const selected = SYSTEM_PALETTES.find(p => p.id === paletteId);
    if (selected) {
      setConfig(prev => ({
        ...prev,
        paletteId,
        customPalette: selected.colors
      }));
    }
  };

  const setCustomColor = (key: keyof SystemPalette['colors'], val: string) => {
    setConfig(prev => {
      const updated = { ...prev.customPalette, [key]: val };
      return {
        ...prev,
        paletteId: 'custom',
        customPalette: updated
      };
    });
  };

  const generateFromHex = (hex: string) => {
    const generated = generateHarmoniousPalette(hex);
    setConfig(prev => ({
      ...prev,
      paletteId: 'custom',
      customPalette: generated
    }));
  };

  const generateFromWallpaper = (wallpaperId: string) => {
    const wp = WALLPAPERS.find(w => w.id === wallpaperId);
    if (wp) {
      const matchPalette = SYSTEM_PALETTES.find(p => p.id === wp.recommendedPaletteId);
      if (matchPalette) {
        setConfig(prev => ({
          ...prev,
          wallpaperId,
          paletteId: matchPalette.id,
          customPalette: matchPalette.colors
        }));
        return;
      }
    }
    setConfig(prev => ({ ...prev, wallpaperId }));
  };

  const toggleDarkMode = () => {
    setConfig(prev => ({ ...prev, isDark: !prev.isDark }));
  };

  const setDarkMode = (isDark: boolean) => {
    setConfig(prev => ({ ...prev, isDark }));
  };

  const setWallpaperId = (wallpaperId: string) => {
    setConfig(prev => ({ ...prev, wallpaperId }));
  };

  const setSystemRadius = (radius: number) => {
    setConfig(prev => ({ ...prev, systemRadius: radius }));
  };

  const setGlassmorphism = (enabled: boolean) => {
    setConfig(prev => ({ ...prev, glassmorphism: enabled }));
  };

  const setActiveView = (view: PreviewDevice) => {
    setConfig(prev => ({ ...prev, activeView: view }));
  };

  const saveCurrentPreset = (name: string) => {
    const newPreset: SavedPreset = {
      id: `preset-${Date.now()}`,
      name: name.trim() || `Theme ${savedPresets.length + 1}`,
      createdAt: Date.now(),
      config: { ...config }
    };
    setSavedPresets(prev => [newPreset, ...prev]);
  };

  const loadPreset = (presetId: string) => {
    const found = savedPresets.find(p => p.id === presetId);
    if (found) {
      setConfig({ ...found.config });
    }
  };

  const deletePreset = (presetId: string) => {
    setSavedPresets(prev => prev.filter(p => p.id !== presetId));
  };

  const resetDefaults = () => {
    setConfig({ ...DEFAULT_CONFIG });
  };

  return (
    <ThemeContext.Provider
      value={{
        config,
        tokens,
        currentPalette,
        setIconPack,
        setIconShape,
        setIconBackplate,
        setIconStrokeWidth,
        setIconScale,
        setPaletteId,
        setCustomColor,
        generateFromHex,
        generateFromWallpaper,
        toggleDarkMode,
        setDarkMode,
        setWallpaperId,
        setSystemRadius,
        setGlassmorphism,
        setActiveView,
        savedPresets,
        saveCurrentPreset,
        loadPreset,
        deletePreset,
        resetDefaults
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SYSTEM_PALETTES, getContrastRatio } from '../../data/palettes';
import { WALLPAPERS } from '../../data/wallpapers';

export const PaletteCustomizer: React.FC = () => {
  const { 
    config, 
    tokens, 
    currentPalette, 
    setPaletteId, 
    setCustomColor, 
    generateFromHex, 
    generateFromWallpaper 
  } = useTheme();

  const [seedColor, setSeedColor] = useState(tokens.primary);

  const isDark = config.isDark;
  const contrastWithBg = getContrastRatio(tokens.primary, tokens.background);

  const handleGenerateHarmonious = () => {
    generateFromHex(seedColor);
  };

  const handleExtractFromWallpaper = () => {
    generateFromWallpaper(config.wallpaperId);
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Curated Master Palettes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System Palettes
          </label>
          <span className="text-[11px] text-slate-500 font-mono">
            {SYSTEM_PALETTES.length} Curated
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SYSTEM_PALETTES.map(p => {
            const isSelected = config.paletteId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPaletteId(p.id)}
                className={`group p-2.5 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                }}
              >
                {/* 3 Color swatches strip */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span 
                    className="w-4 h-4 rounded-full shadow-xs border border-white/20" 
                    style={{ backgroundColor: p.colors.primary }} 
                  />
                  <span 
                    className="w-4 h-4 rounded-full shadow-xs border border-white/20" 
                    style={{ backgroundColor: p.colors.secondary }} 
                  />
                  <span 
                    className="w-4 h-4 rounded-full shadow-xs border border-white/20" 
                    style={{ backgroundColor: p.colors.accent }} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                    {p.name}
                  </span>
                  {isSelected && <Check size={12} className="text-indigo-400 shrink-0 ml-1" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Dynamic Auto Generator (Color Harmony Engine) */}
      <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
            <Wand2 size={14} />
            <span>Harmonious Palette Generator</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Input any primary seed color; mathematical color algorithms generate matching secondary, surface, and semantic tones.
        </p>

        <div className="flex items-center gap-2">
          {/* Seed Color input */}
          <div className="relative flex items-center gap-2 flex-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-xs">
            <input
              type="color"
              value={seedColor}
              onChange={e => setSeedColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
            />
            <input
              type="text"
              value={seedColor}
              onChange={e => setSeedColor(e.target.value)}
              className="flex-1 bg-transparent font-mono text-xs focus:outline-hidden text-slate-200"
            />
          </div>

          <button
            onClick={handleGenerateHarmonious}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles size={13} />
            <span>Generate</span>
          </button>
        </div>

        {/* Wallpaper auto-extractor button */}
        <button
          onClick={handleExtractFromWallpaper}
          className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800 text-slate-300 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={12} />
          <span>Sync Palette to Active Wallpaper</span>
        </button>
      </div>

      {/* SECTION 3: Individual Token Tuning */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Token Fine-Tuning
        </label>

        <div className="space-y-2">
          {[
            { key: 'primary' as const, label: 'Primary Accent', color: tokens.primary },
            { key: 'secondary' as const, label: 'Secondary Tone', color: tokens.secondary },
            { key: 'accent' as const, label: 'Tertiary Highlight', color: tokens.accent },
            { 
              key: isDark ? ('darkBg' as const) : ('lightBg' as const), 
              label: isDark ? 'Dark Canvas' : 'Light Canvas', 
              color: tokens.background 
            },
            { 
              key: isDark ? ('darkCard' as const) : ('lightCard' as const), 
              label: isDark ? 'Dark Card Surface' : 'Light Card Surface', 
              color: tokens.card 
            }
          ].map(token => (
            <div 
              key={token.key}
              className="flex items-center justify-between p-2 rounded-lg border border-slate-800/80 bg-slate-900/30 text-xs"
            >
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={token.color.length === 7 ? token.color : '#3b82f6'}
                  onChange={e => setCustomColor(token.key, e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="text-slate-300">{token.label}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">{token.color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Live Accessibility Feedback */}
      <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/20 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Primary Contrast Ratio</span>
          <span className="font-mono font-bold text-slate-200 tabular-nums">{contrastWithBg}:1</span>
        </div>
        <span 
          className="px-2.5 py-1 rounded-md text-[11px] font-semibold"
          style={{
            backgroundColor: contrastWithBg >= 4.5 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: contrastWithBg >= 4.5 ? '#10b981' : '#f59e0b'
          }}
        >
          {contrastWithBg >= 4.5 ? 'WCAG AA Valid' : 'Check Contrast'}
        </span>
      </div>
    </div>
  );
};

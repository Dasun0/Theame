import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ICON_PACKS } from '../../data/iconPacks';
import { IconPackId, IconShape, BackplateStyle } from '../../types/theme';
import { ThemedIcon } from '../common/ThemedIcon';
import { Check } from 'lucide-react';

export const IconPackControls: React.FC = () => {
  const { 
    config, 
    tokens, 
    setIconPack, 
    setIconShape, 
    setIconBackplate, 
    setIconStrokeWidth, 
    setIconScale 
  } = useTheme();

  const packs = Object.values(ICON_PACKS);

  const shapes: { id: IconShape; label: string }[] = [
    { id: 'squircle', label: 'Squircle' },
    { id: 'circle', label: 'Circle' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'hex', label: 'Hexagon' },
    { id: 'sharp', label: 'Sharp' }
  ];

  const backplates: { id: BackplateStyle; label: string }[] = [
    { id: 'none', label: 'None' },
    { id: 'subtle', label: 'Subtle' },
    { id: 'glass', label: 'Glass' },
    { id: 'solid', label: 'Solid' },
    { id: 'gradient', label: 'Gradient' }
  ];

  return (
    <div className="space-y-6">
      {/* SECTION 1: Icon Pack Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Icon Pack Architecture
        </label>

        <div className="space-y-2">
          {packs.map(pack => {
            const isSelected = config.iconPack === pack.id;
            return (
              <button
                key={pack.id}
                onClick={() => setIconPack(pack.id as IconPackId)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10' 
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950/60 border border-white/5">
                    <ThemedIcon name="Sparkles" size={20} showBackplate={false} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{pack.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {pack.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {pack.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 ml-2">
                    <Check size={12} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Backplate Treatment */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Backplate Treatment
        </label>
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl border border-slate-800 bg-slate-900/40">
          {backplates.map(bp => (
            <button
              key={bp.id}
              onClick={() => setIconBackplate(bp.id)}
              className={`py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                config.iconBackplate === bp.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {bp.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3: Curvature & Shape */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Geometric Curvature
        </label>
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl border border-slate-800 bg-slate-900/40">
          {shapes.map(s => (
            <button
              key={s.id}
              onClick={() => setIconShape(s.id)}
              className={`py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                config.iconShape === s.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 4: Micro Sliders (Stroke & Scale) */}
      <div className="space-y-4 pt-2">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Glyph Stroke Width</span>
            <span className="font-mono text-slate-400 tabular-nums">{config.iconStrokeWidth.toFixed(1)}px</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.2"
            value={config.iconStrokeWidth}
            onChange={e => setIconStrokeWidth(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: tokens.primary }}
          />
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Display Scale Multiplier</span>
            <span className="font-mono text-slate-400 tabular-nums">{config.iconScale.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.5"
            step="0.1"
            value={config.iconScale}
            onChange={e => setIconScale(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: tokens.primary }}
          />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Moon, Sun, Check, Sparkles, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { WALLPAPERS } from '../../data/wallpapers';

export const DisplayControls: React.FC = () => {
  const { 
    config, 
    tokens, 
    toggleDarkMode, 
    setDarkMode, 
    setWallpaperId, 
    setSystemRadius, 
    setGlassmorphism 
  } = useTheme();

  const radii = [4, 8, 12, 16, 24];

  return (
    <div className="space-y-6">
      {/* SECTION 1: Appearance Mode */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Color Scheme Mode
        </label>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setDarkMode(false)}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              !config.isDark
                ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-900">
              <Sun size={18} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200">Light Mode</p>
              <p className="text-[10px] text-slate-400">Clean daytime surface</p>
            </div>
          </button>

          <button
            onClick={() => setDarkMode(true)}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              config.isDark
                ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 shadow-xs flex items-center justify-center text-indigo-400">
              <Moon size={18} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200">Dark Mode</p>
              <p className="text-[10px] text-slate-400">Deep obsidian canvas</p>
            </div>
          </button>
        </div>
      </div>

      {/* SECTION 2: System Corner Radius */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System Corner Radius
          </label>
          <span className="font-mono text-xs text-slate-400">{config.systemRadius}px</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {radii.map(r => (
            <button
              key={r}
              onClick={() => setSystemRadius(r)}
              className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                config.systemRadius === r
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              {r}px
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3: Glassmorphism / Frosted Backdrop */}
      <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Layers size={16} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-200 block">Backdrop Blur & Glass</span>
            <span className="text-[10px] text-slate-400">Translucent frosted depth layers</span>
          </div>
        </div>

        <button
          onClick={() => setGlassmorphism(!config.glassmorphism)}
          className="w-10 h-5 rounded-full p-0.5 transition-colors duration-200"
          style={{ backgroundColor: config.glassmorphism ? tokens.primary : '#475569' }}
        >
          <div 
            className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${
              config.glassmorphism ? 'translate-x-5' : 'translate-x-0'
            }`} 
          />
        </button>
      </div>

      {/* SECTION 4: System Wallpapers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Wallpapers & Backgrounds
          </label>
          <span className="text-[11px] text-slate-500">{WALLPAPERS.length} Wallpapers</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {WALLPAPERS.map(wp => {
            const isSelected = config.wallpaperId === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => setWallpaperId(wp.id)}
                className={`relative group h-20 rounded-xl overflow-hidden border text-left p-2.5 flex flex-col justify-end transition-all ${
                  isSelected 
                    ? 'border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg' 
                    : 'border-slate-800 hover:border-slate-600'
                }`}
                style={{
                  background: wp.thumbnailGradient
                }}
              >
                {/* Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-xs font-medium text-white truncate drop-shadow-sm">
                    {wp.name}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

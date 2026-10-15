import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wifi, 
  Battery, 
  Volume2, 
  Moon, 
  Sun, 
  Minus, 
  Square, 
  X, 
  Folder, 
  FileText, 
  Sliders, 
  Music, 
  Play, 
  Pause,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemedIcon } from '../common/ThemedIcon';
import { WALLPAPERS } from '../../data/wallpapers';

export const DesktopPreview: React.FC = () => {
  const { config, tokens, toggleDarkMode } = useTheme();
  const [activeWindow, setActiveWindow] = useState<'settings' | 'music' | 'files'>('settings');
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeWallpaper = WALLPAPERS.find(w => w.id === config.wallpaperId) || WALLPAPERS[0];
  const isDark = config.isDark;

  const toggleMinimize = (winId: string) => {
    setMinimizedWindows(prev => 
      prev.includes(winId) ? prev.filter(id => id !== winId) : [...prev, winId]
    );
  };

  const dockItems = [
    { id: 'settings', label: 'System Settings', icon: 'Settings' },
    { id: 'music', label: 'Beats & Sound', icon: 'Music' },
    { id: 'files', label: 'File Manager', icon: 'Folder' },
    { id: 'browser', label: 'Browser', icon: 'Compass' },
    { id: 'terminal', label: 'Terminal', icon: 'Terminal' },
    { id: 'code', label: 'IDE Editor', icon: 'Code' }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none">
      {/* Desktop Display Canvas */}
      <div 
        className="relative h-[620px] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundImage: activeWallpaper.backgroundCss,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Top OS Menu Bar */}
        <div 
          className="relative z-30 h-8 px-4 flex items-center justify-between text-xs text-white/90 backdrop-blur-md border-b"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.55)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            color: isDark ? '#ffffff' : '#0f172a'
          }}
        >
          {/* Left Menus */}
          <div className="flex items-center gap-4 font-medium">
            <span className="font-bold flex items-center gap-1.5" style={{ color: tokens.primary }}>
              <ThemedIcon name="Sparkles" size={14} showBackplate={false} />
              <span>AuraOS</span>
            </span>
            <span className="hover:opacity-100 opacity-80 cursor-pointer">File</span>
            <span className="hover:opacity-100 opacity-80 cursor-pointer">Edit</span>
            <span className="hover:opacity-100 opacity-80 cursor-pointer">View</span>
            <span className="hover:opacity-100 opacity-80 cursor-pointer">Window</span>
          </div>

          {/* Right System Tray */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-1 rounded-sm hover:bg-white/10"
              title="Toggle theme appearance"
            >
              {isDark ? <Moon size={13} /> : <Sun size={13} />}
            </button>
            <Wifi size={13} />
            <Volume2 size={13} />
            <Battery size={14} />
            <span className="font-mono tabular-nums font-medium text-[11px]">
              Thu 09:41 AM
            </span>
          </div>
        </div>

        {/* Desktop Workspace with Windows */}
        <div className="relative flex-1 p-6 overflow-hidden">
          {/* WINDOW 1: System Settings */}
          {!minimizedWindows.includes('settings') && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                zIndex: activeWindow === 'settings' ? 20 : 10
              }}
              onClick={() => setActiveWindow('settings')}
              className={`absolute top-8 left-8 w-[420px] rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden transition-all duration-200 ${
                activeWindow === 'settings' ? 'ring-2 ring-indigo-500/30' : 'opacity-90'
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.92)',
                borderColor: tokens.border,
                color: tokens.text,
                borderRadius: `${config.systemRadius}px`
              }}
            >
              {/* Window Header */}
              <div 
                className="h-10 px-4 flex items-center justify-between border-b"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => toggleMinimize('settings')}
                      className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 flex items-center justify-center text-[8px] text-white"
                    />
                    <button 
                      onClick={() => toggleMinimize('settings')}
                      className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 flex items-center justify-center text-[8px] text-white"
                    />
                    <button 
                      className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 flex items-center justify-center text-[8px] text-white"
                    />
                  </div>
                  <span className="text-xs font-semibold ml-2">System Theme Preferences</span>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-5 space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-xs mb-1">Active Icon Pack</h4>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border" style={{ borderColor: tokens.border }}>
                    <ThemedIcon name="Sparkles" size={24} />
                    <div className="flex-1">
                      <p className="font-semibold capitalize">{config.iconPack} Pack</p>
                      <p className="text-[11px] opacity-70">Curvature: {config.iconShape} · Backplate: {config.iconBackplate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-xs mb-1">Active Color Scheme</h4>
                  <div className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: tokens.border }}>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: tokens.primary }} />
                      <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: tokens.secondary }} />
                      <span className="w-5 h-5 rounded-full shadow-xs" style={{ backgroundColor: tokens.accent }} />
                    </div>
                    <span className="text-[11px] font-mono opacity-80">{tokens.primary}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium">Corner Radius</span>
                  <span className="font-mono">{config.systemRadius}px</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* WINDOW 2: Music / Audio Player */}
          {!minimizedWindows.includes('music') && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                zIndex: activeWindow === 'music' ? 20 : 10
              }}
              onClick={() => setActiveWindow('music')}
              className={`absolute top-20 right-10 w-[360px] rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden transition-all duration-200 ${
                activeWindow === 'music' ? 'ring-2 ring-indigo-500/30' : 'opacity-90'
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: tokens.border,
                color: tokens.text,
                borderRadius: `${config.systemRadius}px`
              }}
            >
              <div 
                className="h-10 px-4 flex items-center justify-between border-b"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => toggleMinimize('music')} 
                      className="w-3 h-3 rounded-full bg-rose-500" 
                    />
                    <button 
                      onClick={() => toggleMinimize('music')} 
                      className="w-3 h-3 rounded-full bg-amber-500" 
                    />
                    <button className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-semibold ml-2">Aura Beats</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`
                    }}
                  >
                    <ThemedIcon name="Music" size={28} showBackplate={false} colorOverride="#fff" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Synthetic Horizons</h3>
                    <p className="text-xs opacity-70">Aura Audio Labs</p>
                    <span 
                      className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${tokens.primary}20`, color: tokens.primary }}
                    >
                      Lossless 96kHz
                    </span>
                  </div>
                </div>

                {/* Animated Equalizer Wave Bars */}
                <div className="flex items-end justify-between h-8 px-2 gap-1 bg-black/10 dark:bg-white/5 rounded-lg py-1">
                  {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h}%` : '20%',
                        backgroundColor: i % 2 === 0 ? tokens.primary : tokens.secondary
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 pt-1">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md active:scale-95"
                    style={{ backgroundColor: tokens.primary }}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* WINDOW 3: File Explorer (when active) */}
          {activeWindow === 'files' && !minimizedWindows.includes('files') && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, zIndex: 25 }}
              className="absolute bottom-20 left-24 w-[500px] rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.94)',
                borderColor: tokens.border,
                color: tokens.text,
                borderRadius: `${config.systemRadius}px`
              }}
            >
              <div 
                className="h-10 px-4 flex items-center justify-between border-b"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex items-center gap-1.5">
                  <button onClick={() => toggleMinimize('files')} className="w-3 h-3 rounded-full bg-rose-500" />
                  <button onClick={() => toggleMinimize('files')} className="w-3 h-3 rounded-full bg-amber-500" />
                  <button className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold ml-2">File Manager</span>
                </div>
              </div>
              <div className="p-4 grid grid-cols-4 gap-4 text-center text-xs">
                {['Documents', 'Projects', 'Icon Packs', 'Tokens'].map(f => (
                  <div key={f} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer">
                    <ThemedIcon name="Folder" size={28} />
                    <span className="truncate w-full">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Bottom Dock */}
        <div className="relative z-30 pb-4 flex justify-center">
          <div 
            className="p-2.5 rounded-3xl backdrop-blur-2xl border shadow-2xl flex items-center gap-3"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            {dockItems.map(item => {
              const isOpen = !minimizedWindows.includes(item.id) && ['settings', 'music', 'files'].includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (minimizedWindows.includes(item.id)) {
                      toggleMinimize(item.id);
                    }
                    if (['settings', 'music', 'files'].includes(item.id)) {
                      setActiveWindow(item.id as any);
                    }
                  }}
                  className="relative group p-1.5 hover:-translate-y-2 active:scale-90 transition-all duration-200"
                  title={item.label}
                >
                  <ThemedIcon name={item.icon} size={28} />
                  {isOpen && (
                    <span 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: tokens.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

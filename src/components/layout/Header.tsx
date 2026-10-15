import React from 'react';
import { Download, Sparkles, Bookmark, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { PreviewDevice } from '../../types/theme';

interface HeaderProps {
  onOpenExport: () => void;
  onOpenPresets: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExport, onOpenPresets }) => {
  const { config, tokens, setActiveView, toggleDarkMode } = useTheme();

  const navItems: { id: PreviewDevice; label: string }[] = [
    { id: 'mobile', label: 'Mobile OS' },
    { id: 'desktop', label: 'Desktop OS' },
    { id: 'component-kit', label: 'Component Kit' },
    { id: 'icon-lab', label: 'Icon Lab' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-slate-800/80 bg-slate-950/80 px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <a 
        href="/" 
        onClick={(e) => { e.preventDefault(); }}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
      >
        <span 
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`
          }}
        >
          <Sparkles size={16} />
        </span>
        <span>AuraOS Studio</span>
      </a>

      {/* Zone 2: Navigation Links (Single-line, concise) */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800">
        {navItems.map(item => {
          const isActive = config.activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={{
                backgroundColor: isActive ? tokens.primary : 'transparent'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Presets trigger */}
        <button
          onClick={onOpenPresets}
          className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          title="Saved theme snapshots"
        >
          <Bookmark size={14} />
          <span className="hidden sm:inline">Presets</span>
        </button>

        {/* Global Dark/Light mode switch */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          title="Toggle Dark / Light appearance"
        >
          {config.isDark ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Primary CTA button */}
        <button
          onClick={onOpenExport}
          className="px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
          style={{ backgroundColor: tokens.primary }}
        >
          <Download size={14} />
          <span>Export Theme</span>
        </button>
      </div>
    </header>
  );
};

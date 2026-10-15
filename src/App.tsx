import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { MobilePreview } from './components/simulators/MobilePreview';
import { DesktopPreview } from './components/simulators/DesktopPreview';
import { ComponentKitPreview } from './components/simulators/ComponentKitPreview';
import { IconLabPreview } from './components/simulators/IconLabPreview';
import { PaletteCustomizer } from './components/controls/PaletteCustomizer';
import { IconPackControls } from './components/controls/IconPackControls';
import { DisplayControls } from './components/controls/DisplayControls';
import { ExportModal } from './components/controls/ExportModal';
import { PresetsModal } from './components/controls/PresetsModal';
import { Palette, Shapes, MonitorSmartphone, SlidersHorizontal, Sparkles } from 'lucide-react';

const StudioContent: React.FC = () => {
  const { config, tokens, setActiveView } = useTheme();
  const [activeTab, setActiveTab] = useState<'palettes' | 'icons' | 'display'>('palettes');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);

  const sidebarTabs = [
    { id: 'palettes' as const, label: 'Palettes', icon: Palette },
    { id: 'icons' as const, label: 'Icon Packs', icon: Shapes },
    { id: 'display' as const, label: 'Display & Wallpapers', icon: MonitorSmartphone }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Bar Header */}
      <Header 
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Canvas Area (Interactive Simulator) */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-900/30 overflow-y-auto p-4 md:p-8">
          {/* View mode indicator strip */}
          <div className="flex items-center justify-between pb-4 max-w-5xl mx-auto w-full text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200 capitalize">
                {config.activeView.replace('-', ' ')}
              </span>
              <span aria-hidden="true">·</span>
              <span>Active Pack: <strong className="text-slate-300 capitalize">{config.iconPack}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Primary: <code className="text-indigo-400 font-mono">{tokens.primary}</code></span>
            </div>

            {/* Mobile / Responsive view switcher */}
            <div className="flex md:hidden items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
              {(['mobile', 'desktop', 'component-kit', 'icon-lab'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-2 py-1 text-[11px] font-medium rounded-md capitalize ${
                    config.activeView === view ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  {view.split('-')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Simulator Container */}
          <div className="flex-1 flex items-center justify-center w-full">
            {config.activeView === 'mobile' && <MobilePreview />}
            {config.activeView === 'desktop' && <DesktopPreview />}
            {config.activeView === 'component-kit' && <ComponentKitPreview />}
            {config.activeView === 'icon-lab' && <IconLabPreview />}
          </div>
        </main>

        {/* Theme Tuning Workbench Sidebar */}
        <aside className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/95 flex flex-col h-auto lg:h-[calc(100vh-57px)]">
          {/* Workbench Tabs */}
          <div className="flex items-center border-b border-slate-800 px-3 pt-2 bg-slate-950">
            {sidebarTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-indigo-400' : ''} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'palettes' && <PaletteCustomizer />}
            {activeTab === 'icons' && <IconPackControls />}
            {activeTab === 'display' && <DisplayControls />}
          </div>

          {/* Quick Preset Banner at bottom */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tokens.primary }} />
              <span className="text-slate-300 font-medium truncate max-w-[170px]">
                {config.paletteId === 'custom' ? 'Custom Tuned' : config.paletteId.replace('-', ' ')}
              </span>
            </div>

            <button
              onClick={() => setIsExportOpen(true)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Export Tokens →
            </button>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <PresetsModal isOpen={isPresetsOpen} onClose={() => setIsPresetsOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <StudioContent />
    </ThemeProvider>
  );
}

import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Sliders, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemedIcon } from '../common/ThemedIcon';
import { CATALOG_ICONS, CatalogIconItem } from '../../data/iconPacks';

export const IconLabPreview: React.FC = () => {
  const { config, tokens, setIconScale, setIconStrokeWidth } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedIcon, setInspectedIcon] = useState<CatalogIconItem | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'All Icons' },
    { id: 'system', label: 'System' },
    { id: 'media', label: 'Media' },
    { id: 'communication', label: 'Communication' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'device', label: 'Hardware' },
    { id: 'files', label: 'Files' }
  ];

  const filteredIcons = useMemo(() => {
    return CATALOG_ICONS.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.label.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory]);

  const handleCopySvg = (iconName: string) => {
    const svgCode = `<!-- AuraOS Theme Icon: ${iconName} [Pack: ${config.iconPack}] -->\n<svg width="24" height="24" viewBox="0 0 24 24" fill="${config.iconPack === 'solid' ? tokens.primary : 'none'}" stroke="${tokens.primary}" stroke-width="${config.iconStrokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="aura-icon aura-icon-${config.iconPack}">\n  <!-- Generated from AuraOS Theme Studio -->\n</svg>`;
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto rounded-2xl p-6 shadow-xl border space-y-6"
      style={{
        backgroundColor: tokens.background,
        borderColor: tokens.border,
        color: tokens.text,
        borderRadius: `${config.systemRadius}px`
      }}
    >
      {/* Header & Controls Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: tokens.border }}>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">Icon Pack Gallery</h2>
            <span 
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
              style={{ backgroundColor: `${tokens.primary}20`, color: tokens.primary }}
            >
              {config.iconPack}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Displaying {filteredIcons.length} vector icons tuned with {config.iconStrokeWidth}px stroke & {config.iconShape} curvature
          </p>
        </div>

        {/* Live Size & Stroke Quick Adjusters */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="opacity-70">Scale:</span>
            <input
              type="range"
              min="0.8"
              max="1.6"
              step="0.1"
              value={config.iconScale}
              onChange={e => setIconScale(Number(e.target.value))}
              className="w-20 cursor-pointer"
              style={{ accentColor: tokens.primary }}
            />
            <span className="font-mono tabular-nums">{config.iconScale.toFixed(1)}x</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="opacity-70">Stroke:</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.2"
              value={config.iconStrokeWidth}
              onChange={e => setIconStrokeWidth(Number(e.target.value))}
              className="w-20 cursor-pointer"
              style={{ accentColor: tokens.primary }}
            />
            <span className="font-mono tabular-nums">{config.iconStrokeWidth.toFixed(1)}px</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div 
          className="w-full sm:w-72 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs"
          style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
        >
          <Search size={14} style={{ color: tokens.primary }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search icons by name..."
            className="flex-1 bg-transparent focus:outline-hidden text-xs"
          />
          {search && (
            <button onClick={() => setSearch('')} className="opacity-60 hover:opacity-100">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id 
                  ? 'text-white shadow-xs' 
                  : 'opacity-70 hover:opacity-100 border'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? tokens.primary : 'transparent',
                borderColor: selectedCategory === cat.id ? 'transparent' : tokens.border
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filteredIcons.map(icon => (
          <button
            key={icon.name}
            onClick={() => setInspectedIcon(icon)}
            className="group p-3 rounded-xl border flex flex-col items-center justify-center gap-2 hover:border-indigo-500/40 hover:-translate-y-0.5 active:scale-95 transition-all text-center"
            style={{
              backgroundColor: tokens.card,
              borderColor: tokens.border,
              borderRadius: `${Math.min(config.systemRadius, 16)}px`
            }}
          >
            <ThemedIcon name={icon.name} size={24} />
            <span className="text-[11px] font-medium truncate w-full opacity-80 group-hover:opacity-100">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Modal Inspector for an icon */}
      {inspectedIcon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl border space-y-5 animate-in fade-in zoom-in-95 duration-150"
            style={{
              backgroundColor: tokens.card,
              borderColor: tokens.border,
              color: tokens.text,
              borderRadius: `${config.systemRadius}px`
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: tokens.border }}>
              <div className="flex items-center gap-2">
                <ThemedIcon name={inspectedIcon.name} size={20} showBackplate={false} />
                <h3 className="font-bold text-base">{inspectedIcon.label}</h3>
              </div>
              <button 
                onClick={() => setInspectedIcon(null)}
                className="p-1 rounded-md opacity-70 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* High-res showcase */}
            <div className="flex flex-col items-center justify-center py-6 bg-black/5 dark:bg-white/5 rounded-xl border border-dashed border-white/10">
              <ThemedIcon name={inspectedIcon.name} size={48} />
              <p className="text-xs font-mono opacity-60 mt-4">lucide-react/{inspectedIcon.name}</p>
            </div>

            {/* Token details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border" style={{ borderColor: tokens.border }}>
                <span className="text-[10px] text-slate-400 block">Icon Pack</span>
                <span className="font-semibold capitalize">{config.iconPack}</span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ borderColor: tokens.border }}>
                <span className="text-[10px] text-slate-400 block">Shape Curvature</span>
                <span className="font-semibold capitalize">{config.iconShape}</span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ borderColor: tokens.border }}>
                <span className="text-[10px] text-slate-400 block">Stroke Width</span>
                <span className="font-semibold font-mono">{config.iconStrokeWidth}px</span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ borderColor: tokens.border }}>
                <span className="text-[10px] text-slate-400 block">Color Token</span>
                <span className="font-semibold font-mono">{tokens.primary}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleCopySvg(inspectedIcon.name)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg text-white shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                style={{ backgroundColor: tokens.primary }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied SVG to Clipboard!' : 'Copy SVG Tag'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

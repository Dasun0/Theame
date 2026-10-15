import React, { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  Search, 
  ChevronRight, 
  Sliders, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemedIcon } from '../common/ThemedIcon';
import { getContrastRatio } from '../../data/palettes';

export const ComponentKitPreview: React.FC = () => {
  const { config, tokens } = useTheme();
  
  // Interactive UI state
  const [toggleActive, setToggleActive] = useState(true);
  const [checkboxActive, setCheckboxActive] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState<'opt1' | 'opt2'>('opt1');
  const [activeTab, setActiveTab] = useState<'design' | 'tokens' | 'accessibility'>('design');
  const [sliderVal, setSliderVal] = useState(65);
  const [inputValue, setInputValue] = useState('Dynamic Design System');

  const isDark = config.isDark;

  // Calculate contrast ratios
  const contrastWithBg = getContrastRatio(tokens.primary, tokens.background);
  const contrastWithCard = getContrastRatio(tokens.primary, tokens.card);
  const textContrast = getContrastRatio(tokens.text, tokens.background);

  return (
    <div 
      className="w-full max-w-4xl mx-auto rounded-2xl p-6 shadow-xl border space-y-8"
      style={{
        backgroundColor: tokens.background,
        borderColor: tokens.border,
        color: tokens.text,
        borderRadius: `${config.systemRadius}px`
      }}
    >
      {/* Header & Segmented Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: tokens.border }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight">System Component Library</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time rendering of interactive components with active tokens & icon pack
          </p>
        </div>

        {/* Tab switcher */}
        <div 
          className="flex items-center p-1 rounded-xl border bg-black/5 dark:bg-white/5"
          style={{ borderColor: tokens.border }}
        >
          {(['design', 'tokens', 'accessibility'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors duration-150 ${
                activeTab === tab ? 'shadow-xs text-white' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: activeTab === tab ? tokens.primary : 'transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'design' && (
        <div className="space-y-8">
          {/* Section 1: Buttons & Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">01. Interactive Actions & Buttons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
                style={{
                  backgroundColor: tokens.primary,
                  borderRadius: `${Math.min(config.systemRadius, 14)}px`
                }}
              >
                <ThemedIcon name="Sparkles" size={16} showBackplate={false} colorOverride="#fff" />
                <span>Primary Action</span>
              </button>

              <button
                className="px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                style={{
                  backgroundColor: tokens.secondary,
                  borderRadius: `${Math.min(config.systemRadius, 14)}px`
                }}
              >
                <span>Secondary</span>
              </button>

              <button
                className="px-4 py-2 text-xs font-medium rounded-lg border hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all flex items-center gap-2"
                style={{
                  borderColor: tokens.border,
                  borderRadius: `${Math.min(config.systemRadius, 14)}px`
                }}
              >
                <span>Outlined</span>
              </button>

              <button
                className="px-4 py-2 text-xs font-medium rounded-lg text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 active:scale-95 transition-all"
                style={{
                  borderRadius: `${Math.min(config.systemRadius, 14)}px`
                }}
              >
                Destructive
              </button>

              <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: tokens.border }}>
                <ThemedIcon name="Settings" size={20} />
                <ThemedIcon name="Bell" size={20} />
                <ThemedIcon name="Share2" size={20} />
              </div>
            </div>
          </div>

          {/* Section 2: Form Controls & Inputs */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">02. Form Controls & Sliders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input field */}
              <div 
                className="p-4 rounded-xl border space-y-3"
                style={{ 
                  backgroundColor: tokens.card, 
                  borderColor: tokens.border,
                  borderRadius: `${config.systemRadius}px`
                }}
              >
                <label className="text-xs font-medium block">Search Query</label>
                <div 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all focus-within:ring-2"
                  style={{
                    borderColor: tokens.border,
                    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)'
                  }}
                >
                  <Search size={15} style={{ color: tokens.primary }} />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Type system keyword..."
                    className="flex-1 bg-transparent text-xs focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Toggles and Checkbox */}
              <div 
                className="p-4 rounded-xl border flex flex-col justify-between"
                style={{ 
                  backgroundColor: tokens.card, 
                  borderColor: tokens.border,
                  borderRadius: `${config.systemRadius}px`
                }}
              >
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium">Haptic Feedback Toggle</span>
                  <button
                    onClick={() => setToggleActive(!toggleActive)}
                    className="w-10 h-5 rounded-full p-0.5 transition-colors duration-200"
                    style={{ backgroundColor: toggleActive ? tokens.primary : '#94a3b8' }}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        toggleActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium">Auto Color Extraction</span>
                  <button
                    onClick={() => setCheckboxActive(!checkboxActive)}
                    className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: checkboxActive ? tokens.primary : 'transparent',
                      borderColor: checkboxActive ? tokens.primary : tokens.border
                    }}
                  >
                    {checkboxActive && <Check size={12} className="text-white" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Slider bar */}
            <div 
              className="p-4 rounded-xl border space-y-2"
              style={{ 
                backgroundColor: tokens.card, 
                borderColor: tokens.border,
                borderRadius: `${config.systemRadius}px`
              }}
            >
              <div className="flex justify-between text-xs">
                <span className="font-medium">System Accent Saturation</span>
                <span className="font-mono tabular-nums">{sliderVal}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={e => setSliderVal(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: tokens.primary }}
              />
            </div>
          </div>

          {/* Section 3: Semantic Alerts & Notification Banners */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">03. Status Feedback & Notifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                className="p-3.5 rounded-xl border flex items-start gap-3 text-xs"
                style={{
                  backgroundColor: `${tokens.status.success}15`,
                  borderColor: `${tokens.status.success}30`
                }}
              >
                <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: tokens.status.success }} />
                <div>
                  <h5 className="font-semibold" style={{ color: tokens.status.success }}>Theme Sync Complete</h5>
                  <p className="opacity-80 text-[11px] mt-0.5">All 48 system icons loaded and tokenized.</p>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-start gap-3 text-xs"
                style={{
                  backgroundColor: `${tokens.status.warning}15`,
                  borderColor: `${tokens.status.warning}30`
                }}
              >
                <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: tokens.status.warning }} />
                <div>
                  <h5 className="font-semibold" style={{ color: tokens.status.warning }}>Contrast Notice</h5>
                  <p className="opacity-80 text-[11px] mt-0.5">Background brightness check: 98% nominal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tokens' && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Design Tokens</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Primary Accent', value: tokens.primary },
              { label: 'Secondary Tone', value: tokens.secondary },
              { label: 'Highlight Accent', value: tokens.accent },
              { label: 'Surface Background', value: tokens.background },
              { label: 'Card Surface', value: tokens.card },
              { label: 'Hairline Border', value: tokens.border },
              { label: 'Primary Text', value: tokens.text },
              { label: 'Muted Text', value: tokens.textMuted },
              { label: 'Success State', value: tokens.status.success }
            ].map(token => (
              <div 
                key={token.label}
                className="p-3 rounded-xl border flex items-center gap-3"
                style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
              >
                <span 
                  className="w-8 h-8 rounded-lg shrink-0 border border-white/20 shadow-xs" 
                  style={{ backgroundColor: token.value }}
                />
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 truncate">{token.label}</p>
                  <p className="text-xs font-mono font-medium truncate">{token.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'accessibility' && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">WCAG 2.1 Contrast Evaluation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-xl border space-y-2"
              style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
            >
              <span className="text-xs text-slate-400">Primary on Background</span>
              <div className="text-2xl font-mono font-bold tabular-nums">
                {contrastWithBg}:1
              </div>
              <div className="text-xs font-medium" style={{ color: contrastWithBg >= 4.5 ? tokens.status.success : tokens.status.warning }}>
                {contrastWithBg >= 4.5 ? 'WCAG AA Compliant' : 'Large Text Only'}
              </div>
            </div>

            <div 
              className="p-4 rounded-xl border space-y-2"
              style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
            >
              <span className="text-xs text-slate-400">Primary on Card</span>
              <div className="text-2xl font-mono font-bold tabular-nums">
                {contrastWithCard}:1
              </div>
              <div className="text-xs font-medium" style={{ color: contrastWithCard >= 4.5 ? tokens.status.success : tokens.status.warning }}>
                {contrastWithCard >= 4.5 ? 'WCAG AA Compliant' : 'Large Text Only'}
              </div>
            </div>

            <div 
              className="p-4 rounded-xl border space-y-2"
              style={{ backgroundColor: tokens.card, borderColor: tokens.border }}
            >
              <span className="text-xs text-slate-400">Text on Background</span>
              <div className="text-2xl font-mono font-bold tabular-nums">
                {textContrast}:1
              </div>
              <div className="text-xs font-medium" style={{ color: textContrast >= 7.0 ? tokens.status.success : tokens.status.info }}>
                {textContrast >= 7.0 ? 'WCAG AAA Enhanced' : 'WCAG AA Standard'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

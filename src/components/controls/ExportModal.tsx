import React, { useState } from 'react';
import { X, Copy, Check, Download, Code, FileText, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { config, tokens } = useTheme();
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css' | 'json' | 'typescript'>('tailwind');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getExportCode = () => {
    switch (activeTab) {
      case 'tailwind':
        return `// tailwind.config.js - AuraOS Theme Export
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: {
          primary: '${tokens.primary}',
          'primary-hover': '${tokens.primaryHover}',
          secondary: '${tokens.secondary}',
          accent: '${tokens.accent}',
          canvas: '${tokens.background}',
          surface: '${tokens.card}',
          border: '${tokens.border}',
          'text-base': '${tokens.text}',
          'text-muted': '${tokens.textMuted}',
          success: '${tokens.status.success}',
          warning: '${tokens.status.warning}',
          danger: '${tokens.status.danger}',
        }
      },
      borderRadius: {
        'sys': '${config.systemRadius}px',
        'sys-sm': '${Math.max(4, config.systemRadius - 4)}px',
        'sys-lg': '${config.systemRadius + 4}px',
      }
    }
  }
};`;

      case 'css':
        return `/* aura-theme.css - Generated Theme Tokens */
:root {
  /* System Brand Accents */
  --aura-primary: ${tokens.primary};
  --aura-primary-hover: ${tokens.primaryHover};
  --aura-secondary: ${tokens.secondary};
  --aura-accent: ${tokens.accent};

  /* Surfaces & Canvas */
  --aura-bg: ${tokens.background};
  --aura-card: ${tokens.card};
  --aura-border: ${tokens.border};

  /* Typography */
  --aura-text: ${tokens.text};
  --aura-text-muted: ${tokens.textMuted};

  /* Status Colors */
  --aura-success: ${tokens.status.success};
  --aura-warning: ${tokens.status.warning};
  --aura-danger: ${tokens.status.danger};

  /* Icon Pack Specifications */
  --aura-icon-pack: "${config.iconPack}";
  --aura-icon-stroke: ${config.iconStrokeWidth}px;
  --aura-icon-scale: ${config.iconScale};
  --aura-icon-shape: "${config.iconShape}";
  --aura-radius: ${config.systemRadius}px;
}`;

      case 'json':
        return JSON.stringify({
          version: '1.0.0',
          name: 'AuraOS Exported Theme',
          iconPack: {
            id: config.iconPack,
            strokeWidth: config.iconStrokeWidth,
            scale: config.iconScale,
            shape: config.iconShape,
            backplate: config.iconBackplate
          },
          colors: tokens,
          layout: {
            systemRadius: config.systemRadius,
            glassmorphism: config.glassmorphism,
            isDark: config.isDark
          }
        }, null, 2);

      case 'typescript':
        return `// theme.ts - AuraOS TypeScript Definition
export const auraTheme = {
  iconPack: '${config.iconPack}',
  iconShape: '${config.iconShape}',
  iconBackplate: '${config.iconBackplate}',
  strokeWidth: ${config.iconStrokeWidth},
  scale: ${config.iconScale},
  systemRadius: ${config.systemRadius},
  isDark: ${config.isDark},
  tokens: {
    primary: '${tokens.primary}',
    secondary: '${tokens.secondary}',
    accent: '${tokens.accent}',
    background: '${tokens.background}',
    card: '${tokens.card}',
    border: '${tokens.border}',
    text: '${tokens.text}',
    textMuted: '${tokens.textMuted}',
    status: {
      success: '${tokens.status.success}',
      warning: '${tokens.status.warning}',
      danger: '${tokens.status.danger}',
      info: '${tokens.status.info}'
    }
  }
} as const;

export type AuraTheme = typeof auraTheme;`;
    }
  };

  const codeContent = getExportCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === 'json' ? 'json' : activeTab === 'css' ? 'css' : activeTab === 'tailwind' ? 'js' : 'ts';
    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-theme.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col bg-slate-950 border-slate-800 text-slate-100"
        style={{ borderRadius: `${config.systemRadius}px` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold tracking-tight">Export Theme Tokens</h3>
            <p className="text-xs text-slate-400">
              Integrate into Tailwind CSS, raw CSS properties, or React codebases
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/30">
          {[
            { id: 'tailwind' as const, label: 'Tailwind CSS' },
            { id: 'css' as const, label: 'CSS Variables' },
            { id: 'json' as const, label: 'JSON Tokens' },
            { id: 'typescript' as const, label: 'TypeScript' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Viewport */}
        <div className="relative p-6 bg-slate-900/40">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Ready for production</span>
            <span aria-hidden="true">·</span>
            <span>Zero runtime overhead</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-2"
            >
              <Download size={14} />
              <span>Download File</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs active:scale-95 transition-all flex items-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

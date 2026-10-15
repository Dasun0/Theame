import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Sparkles, FolderDown, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({ isOpen, onClose }) => {
  const { 
    config, 
    tokens, 
    savedPresets, 
    saveCurrentPreset, 
    loadPreset, 
    deletePreset, 
    resetDefaults 
  } = useTheme();

  const [presetName, setPresetName] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) return;
    saveCurrentPreset(presetName.trim());
    setPresetName('');
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col bg-slate-950 border-slate-800 text-slate-100"
        style={{ borderRadius: `${config.systemRadius}px` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold tracking-tight">Saved Theme Presets</h3>
            <p className="text-xs text-slate-400">
              Save your current theme configuration or load previously saved snapshots
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Save Current Theme Form */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/40">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Save Current Active Theme
          </label>
          <form onSubmit={handleSave} className="flex items-center gap-2">
            <input
              type="text"
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              placeholder="e.g. Minimalist Midnight Neon..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-xs text-slate-200 focus:outline-hidden focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!presetName.trim()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>{justSaved ? 'Saved!' : 'Save Preset'}</span>
            </button>
          </form>
        </div>

        {/* Presets List */}
        <div className="p-6 space-y-3 max-h-72 overflow-y-auto">
          {savedPresets.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No custom saved themes yet. Give your active theme a name above!
            </div>
          ) : (
            savedPresets.map(preset => (
              <div
                key={preset.id}
                className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/30 flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{preset.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {preset.config.iconPack} icon pack · {preset.config.paletteId}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      loadPreset(preset.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
                  >
                    <FolderDown size={12} />
                    <span>Load</span>
                  </button>

                  <button
                    onClick={() => deletePreset(preset.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete preset"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <button
            onClick={() => {
              if (window.confirm('Reset all customization settings back to default?')) {
                resetDefaults();
                onClose();
              }
            }}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

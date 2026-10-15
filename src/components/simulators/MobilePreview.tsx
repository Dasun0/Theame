import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Battery, 
  Moon, 
  Sun, 
  Play, 
  Pause, 
  SkipForward, 
  Sliders, 
  Volume2, 
  Search, 
  ChevronDown, 
  Lock, 
  Unlock,
  Check,
  Send,
  ArrowLeft,
  X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemedIcon } from '../common/ThemedIcon';
import { WALLPAPERS } from '../../data/wallpapers';

export const MobilePreview: React.FC = () => {
  const { config, tokens, toggleDarkMode, setDarkMode } = useTheme();
  
  // Mobile Simulator state
  const [isLocked, setIsLocked] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [volume, setVolume] = useState(72);
  const [brightness, setBrightness] = useState(85);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [activeApp, setActiveApp] = useState<'none' | 'settings' | 'messages' | 'music'>('none');
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey! Did you check out the new system theme update?' },
    { id: 2, sender: 'user', text: 'Yes! The custom icon pack and color palette look incredible!' },
    { id: 3, sender: 'other', text: 'The glassmorphic blur and micro-animations feel so smooth.' }
  ]);

  const activeWallpaper = WALLPAPERS.find(w => w.id === config.wallpaperId) || WALLPAPERS[0];
  const isDark = config.isDark;

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: messageInput.trim() }
    ]);
    setMessageInput('');
  };

  const appGrid = [
    { name: 'Settings', label: 'Settings', icon: 'Settings', appId: 'settings' as const },
    { name: 'Music', label: 'Music', icon: 'Music', appId: 'music' as const },
    { name: 'Messages', label: 'Messages', icon: 'MessageSquare', appId: 'messages' as const },
    { name: 'Camera', label: 'Camera', icon: 'Camera', appId: 'none' as const },
    { name: 'Photos', label: 'Photos', icon: 'Image', appId: 'none' as const },
    { name: 'Browser', label: 'Browser', icon: 'Compass', appId: 'none' as const },
    { name: 'Calendar', label: 'Calendar', icon: 'Calendar', appId: 'none' as const },
    { name: 'Files', label: 'Files', icon: 'Folder', appId: 'none' as const }
  ];

  const dockApps = [
    { name: 'Phone', icon: 'Phone', appId: 'none' as const },
    { name: 'Messages', icon: 'MessageSquare', appId: 'messages' as const },
    { name: 'Music', icon: 'Music', appId: 'music' as const },
    { name: 'Settings', icon: 'Settings', appId: 'settings' as const }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-md mx-auto">
      {/* Phone Hardware Bezel */}
      <div 
        className="relative w-[340px] h-[690px] rounded-[48px] p-3 shadow-2xl transition-all duration-300 ring-1"
        style={{
          backgroundColor: isDark ? '#0c0f17' : '#e2e8f0',
          boxShadow: isDark 
            ? `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px ${tokens.primary}20` 
            : `0 20px 50px -15px rgba(0,0,0,0.15), 0 0 30px ${tokens.primary}15`,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
      >
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-3 h-7 w-28 bg-black rounded-full shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Screen Area */}
        <div 
          className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col select-none"
          style={{
            backgroundImage: activeWallpaper.backgroundCss,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Top Status Bar */}
          <div className="relative z-30 flex items-center justify-between px-7 pt-3 text-xs font-medium text-white/90 drop-shadow-sm">
            <span className="font-mono tabular-nums">09:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi size={13} className={wifiEnabled ? 'opacity-100' : 'opacity-40'} />
              <span className="text-[10px] tracking-tight">5G</span>
              <Battery size={14} className="fill-white" />
            </div>
          </div>

          {/* Quick Action Button to Pull Down Control Center */}
          <button
            onClick={() => setShowControlCenter(!showControlCenter)}
            aria-label="Toggle Control Center"
            className="absolute top-2 right-4 z-40 w-12 h-6 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-8 h-1 rounded-full bg-white/40" />
          </button>

          {/* MAIN SCREEN CONTENT */}
          <div className="relative flex-1 flex flex-col justify-between p-4 pt-6 overflow-hidden">
            {/* LOCK SCREEN STATE */}
            {isLocked ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-between py-8 text-white text-center"
              >
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-1 text-white/70 text-xs">
                    <Lock size={12} />
                    <span>Swipe up to unlock</span>
                  </div>
                  <h1 className="text-6xl font-light tracking-tight drop-shadow-md">09:41</h1>
                  <p className="text-sm font-medium text-white/80 mt-1">Thursday, October 15</p>
                </div>

                {/* Lockscreen Notification */}
                <div 
                  className="w-full max-w-xs p-3 rounded-2xl backdrop-blur-xl border border-white/15 text-left text-xs shadow-lg"
                  style={{
                    backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                    color: isDark ? '#fff' : '#0f172a'
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ThemedIcon name="Sparkles" size={14} showBackplate={false} />
                    <span className="font-semibold">System Theme</span>
                    <span className="text-white/50 text-[10px] ml-auto">Just now</span>
                  </div>
                  <p className="text-white/80">Applied {config.iconPack} icon pack & {tokens.primary} accent.</p>
                </div>

                <button
                  onClick={() => setIsLocked(false)}
                  className="px-6 py-2 rounded-full backdrop-blur-md bg-white/20 border border-white/25 text-xs font-medium hover:bg-white/30 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Unlock size={14} />
                  <span>Tap to Unlock</span>
                </button>
              </motion.div>
            ) : (
              /* HOME SCREEN / ACTIVE APP */
              <div className="flex-1 flex flex-col justify-between">
                {activeApp === 'none' ? (
                  <>
                    {/* Top System Widgets */}
                    <div className="space-y-3 pt-2">
                      {/* Weather / Clock Dynamic Glass Widget */}
                      <div 
                        className="p-3.5 rounded-2xl backdrop-blur-xl border shadow-lg flex items-center justify-between"
                        style={{
                          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.75)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                          color: tokens.text
                        }}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: tokens.primary }}>
                            <ThemedIcon name="Sparkles" size={14} showBackplate={false} />
                            <span>San Francisco</span>
                          </div>
                          <div className="text-2xl font-bold tracking-tight">72°</div>
                          <p className="text-[11px] opacity-70">Clear sky · H:76° L:54°</p>
                        </div>
                        <div className="text-right">
                          <ThemedIcon name="Sun" size={32} showBackplate={false} colorOverride="#f59e0b" />
                          <p className="text-[10px] font-mono opacity-60 mt-1">Air: 28 Good</p>
                        </div>
                      </div>

                      {/* Interactive Music Widget */}
                      <div 
                        className="p-3 rounded-2xl backdrop-blur-xl border shadow-lg"
                        style={{
                          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                          color: tokens.text
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`
                            }}
                          >
                            <ThemedIcon name="Music" size={18} showBackplate={false} colorOverride="#ffffff" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate">Midnight City Lights</h4>
                            <p className="text-[11px] opacity-70 truncate">Neon Synthetics</p>
                            {/* Track bar */}
                            <div className="w-full bg-black/10 dark:bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-300"
                                style={{ width: '58%', backgroundColor: tokens.primary }}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm shrink-0 active:scale-95 transition-transform"
                            style={{ backgroundColor: tokens.primary }}
                          >
                            {isPlayingMusic ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-4 gap-y-4 gap-x-2 py-3">
                      {appGrid.map(app => (
                        <button
                          key={app.name}
                          onClick={() => {
                            if (app.appId !== 'none') {
                              setActiveApp(app.appId);
                            }
                          }}
                          className="flex flex-col items-center gap-1 group active:scale-95 transition-transform"
                        >
                          <ThemedIcon name={app.icon} size={24} />
                          <span 
                            className="text-[11px] font-medium text-white drop-shadow-sm truncate w-full text-center px-0.5"
                          >
                            {app.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Bottom Floating Glass Dock */}
                    <div 
                      className="p-2 rounded-3xl backdrop-blur-2xl border shadow-xl flex items-center justify-around mt-auto"
                      style={{
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {dockApps.map((app, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (app.appId !== 'none') {
                              setActiveApp(app.appId);
                            }
                          }}
                          className="active:scale-90 transition-transform"
                        >
                          <ThemedIcon name={app.icon} size={24} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  /* SIMULATED IN-APP SCREENS */
                  <div 
                    className="flex-1 flex flex-col rounded-3xl overflow-hidden shadow-2xl border"
                    style={{
                      backgroundColor: tokens.card,
                      borderColor: tokens.border,
                      color: tokens.text
                    }}
                  >
                    {/* App Header */}
                    <div 
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: tokens.border }}
                    >
                      <button
                        onClick={() => setActiveApp('none')}
                        className="flex items-center gap-1 text-xs font-medium"
                        style={{ color: tokens.primary }}
                      >
                        <ArrowLeft size={16} />
                        <span>Home</span>
                      </button>
                      <h3 className="text-xs font-semibold capitalize">{activeApp}</h3>
                      <button 
                        onClick={() => setActiveApp('none')}
                        className="p-1 rounded-full opacity-60 hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* App Body Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                      {activeApp === 'settings' && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-2.5 rounded-xl border" style={{ borderColor: tokens.border }}>
                            <ThemedIcon name="Sparkles" size={20} />
                            <div>
                              <p className="font-semibold text-xs">AuraOS System</p>
                              <p className="text-[11px] opacity-70">Active Theme: {config.iconPack}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: tokens.border }}>
                              <span>Dark Appearance</span>
                              <button
                                onClick={toggleDarkMode}
                                className="w-10 h-5 rounded-full p-0.5 transition-colors duration-200"
                                style={{ backgroundColor: isDark ? tokens.primary : '#94a3b8' }}
                              >
                                <div 
                                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                                    isDark ? 'translate-x-5' : 'translate-x-0'
                                  }`} 
                                />
                              </button>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: tokens.border }}>
                              <span>Accent Palette</span>
                              <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tokens.primary }} />
                                <span className="text-[11px] font-mono">{tokens.primary}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: tokens.border }}>
                              <span>Glassmorphism</span>
                              <span className="text-[11px] font-medium" style={{ color: tokens.primary }}>Enabled</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeApp === 'messages' && (
                        <div className="flex flex-col h-full justify-between">
                          <div className="space-y-2.5">
                            {chatMessages.map(msg => (
                              <div 
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div 
                                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed ${
                                    msg.sender === 'user' ? 'text-white' : 'border'
                                  }`}
                                  style={{
                                    backgroundColor: msg.sender === 'user' ? tokens.primary : (isDark ? '#1e293b' : '#f1f5f9'),
                                    borderColor: tokens.border
                                  }}
                                >
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-1.5 pt-2">
                            <input
                              type="text"
                              value={messageInput}
                              onChange={e => setMessageInput(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Message..."
                              className="flex-1 px-3 py-1.5 rounded-full border text-xs focus:outline-hidden"
                              style={{
                                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                                borderColor: tokens.border,
                                color: tokens.text
                              }}
                            />
                            <button
                              onClick={handleSendMessage}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
                              style={{ backgroundColor: tokens.primary }}
                            >
                              <Send size={12} />
                            </button>
                          </div>
                        </div>
                      )}

                      {activeApp === 'music' && (
                        <div className="flex flex-col items-center text-center py-4 space-y-4">
                          <div 
                            className="w-36 h-36 rounded-2xl shadow-xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`
                            }}
                          >
                            <ThemedIcon name="Music" size={44} showBackplate={false} colorOverride="#ffffff" />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm">Midnight City Lights</h3>
                            <p className="text-xs opacity-70">Neon Synthetics · Tokyo Dreams</p>
                          </div>

                          <div className="w-full space-y-1">
                            <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: '58%', backgroundColor: tokens.primary }} />
                            </div>
                            <div className="flex justify-between text-[10px] font-mono opacity-60">
                              <span>02:18</span>
                              <span>03:45</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-6">
                            <ThemedIcon name="Radio" size={18} showBackplate={false} />
                            <button
                              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95"
                              style={{ backgroundColor: tokens.primary }}
                            >
                              {isPlayingMusic ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                            </button>
                            <button onClick={() => {}} className="opacity-80 hover:opacity-100">
                              <SkipForward size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Settings / Control Center Drawer Overlay */}
          <AnimatePresence>
            {showControlCenter && (
              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                className="absolute inset-0 z-50 p-4 pt-12 backdrop-blur-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: isDark ? 'rgba(10, 15, 26, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                  color: tokens.text
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-semibold">Control Center</span>
                  <button 
                    onClick={() => setShowControlCenter(false)}
                    className="p-1 rounded-full hover:bg-white/10 text-xs flex items-center gap-1"
                  >
                    <span>Done</span>
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Control Tiles */}
                <div className="grid grid-cols-2 gap-2.5 my-auto">
                  {/* Wi-Fi & Bluetooth */}
                  <div 
                    className="p-3 rounded-2xl border space-y-2"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      borderColor: tokens.border
                    }}
                  >
                    <button
                      onClick={() => setWifiEnabled(!wifiEnabled)}
                      className="w-full flex items-center gap-2 text-xs font-medium"
                    >
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors"
                        style={{ backgroundColor: wifiEnabled ? tokens.primary : '#64748b' }}
                      >
                        <Wifi size={14} />
                      </div>
                      <span className="truncate">Wi-Fi</span>
                    </button>
                    <button
                      onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                      className="w-full flex items-center gap-2 text-xs font-medium"
                    >
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors"
                        style={{ backgroundColor: bluetoothEnabled ? tokens.secondary : '#64748b' }}
                      >
                        <ThemedIcon name="Bluetooth" size={14} showBackplate={false} colorOverride="#fff" />
                      </div>
                      <span className="truncate">Bluetooth</span>
                    </button>
                  </div>

                  {/* Dark Mode & Lock */}
                  <div 
                    className="p-3 rounded-2xl border space-y-2"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      borderColor: tokens.border
                    }}
                  >
                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center gap-2 text-xs font-medium"
                    >
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors"
                        style={{ backgroundColor: isDark ? tokens.primary : '#64748b' }}
                      >
                        {isDark ? <Moon size={14} /> : <Sun size={14} />}
                      </div>
                      <span className="truncate">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsLocked(true);
                        setShowControlCenter(false);
                      }}
                      className="w-full flex items-center gap-2 text-xs font-medium"
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white">
                        <Lock size={14} />
                      </div>
                      <span className="truncate">Lock Screen</span>
                    </button>
                  </div>
                </div>

                {/* Brightness & Volume Vertical Sliders */}
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {/* Brightness */}
                  <div 
                    className="p-3 rounded-2xl border flex flex-col items-center gap-2"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      borderColor: tokens.border
                    }}
                  >
                    <Sun size={16} style={{ color: tokens.primary }} />
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={brightness}
                      onChange={e => setBrightness(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                      style={{ accentColor: tokens.primary }}
                    />
                    <span className="text-[10px] font-mono">{brightness}%</span>
                  </div>

                  {/* Volume */}
                  <div 
                    className="p-3 rounded-2xl border flex flex-col items-center gap-2"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      borderColor: tokens.border
                    }}
                  >
                    <Volume2 size={16} style={{ color: tokens.secondary }} />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      className="w-full cursor-pointer"
                      style={{ accentColor: tokens.secondary }}
                    />
                    <span className="text-[10px] font-mono">{volume}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Home Indicator Bar */}
          <div className="relative z-30 pb-2 flex justify-center">
            <button
              onClick={() => {
                if (showControlCenter) setShowControlCenter(false);
                else if (activeApp !== 'none') setActiveApp('none');
              }}
              aria-label="Home"
              className="w-32 h-1 rounded-full bg-white/60 hover:bg-white active:scale-95 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Simulator Control Footnote */}
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <span>Tap top right for Control Center</span>
        <span aria-hidden="true">·</span>
        <span>Tap apps to open</span>
      </div>
    </div>
  );
};

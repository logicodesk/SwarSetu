import React, { useState, useRef, useEffect } from 'react';
import { SwarSetuLogo } from './SwarSetuLogo';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  User, 
  Mic, 
  ShieldCheck, 
  RotateCcw, 
  LogOut, 
  CheckCircle2, 
  Globe2, 
  X,
  FileText
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'live-demo';
  setActiveTab: (tab: 'home' | 'live-demo') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [citizenSessionId] = useState(() => `IND-UIDAI-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleNavClick = (tab: 'home' | 'live-demo', anchorId?: string) => {
    setActiveTab(tab);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Primary action: Navigate to demo, focus voice console, and highlight
  const handleTryVoiceForm = () => {
    setActiveTab('live-demo');
    setIsProfileOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('swarsetu:focus-voice'));
      const el = document.getElementById('voice-assistant-panel') || document.getElementById('btn-voice-mic');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  const handleResetApplication = () => {
    window.dispatchEvent(new CustomEvent('swarsetu:reset-form'));
    setIsProfileOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
    >
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Govt Badge */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <SwarSetuLogo size="md" />
          <span className="hidden sm:inline-block bg-surface-container-high text-on-surface-variant font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            Govt & Citizen AI
          </span>
        </div>

        {/* Central Navigation Pills */}
        <nav
          id="main-nav"
          className="hidden xl:flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/25"
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 text-[14px] font-medium transition-all rounded-lg ${
              activeTab === 'home'
                ? 'bg-primary-container text-white font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('home', 'how-it-works-section')}
            className="px-3.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-all rounded-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('home', 'features-section')}
            className="px-3.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-all rounded-lg"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('home', 'languages-section')}
            className="px-3.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-all rounded-lg"
          >
            Languages
          </button>
          <button
            onClick={() => handleNavClick('home', 'developers-section')}
            className="px-3.5 py-1.5 text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-all rounded-lg"
          >
            Developers
          </button>
          <button
            onClick={() => handleNavClick('live-demo')}
            className={`px-3.5 py-1.5 text-[14px] transition-all rounded-lg ${
              activeTab === 'live-demo'
                ? 'bg-primary-container text-white font-semibold shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Live Demo (Voice Form)
          </button>
        </nav>

        {/* Right Tools & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-header"
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>

          {/* User Profile Menu Button & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              id="btn-citizen-profile-toggle"
              aria-label="Citizen Account & Profile"
              aria-expanded={isProfileOpen}
              className="relative w-9 h-9 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center text-white text-sm shadow-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" />
            </button>

            {/* Citizen Profile Dropdown Popover */}
            {isProfileOpen && (
              <div
                id="citizen-profile-dropdown"
                className="absolute right-0 mt-3 w-80 sm:w-88 rounded-2xl bg-surface-container-highest/98 backdrop-blur-2xl border border-outline-variant/40 shadow-2xl p-4 z-50 animate-fadeIn text-on-surface"
              >
                {/* Header & Verification */}
                <div className="flex items-start justify-between pb-3 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-headline font-bold text-base">
                      SC
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-headline font-bold text-sm text-on-surface">Sovereign Citizen</h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-[11px] font-mono text-on-surface-variant">{citizenSessionId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    aria-label="Close Profile"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Identity & Portal Badges */}
                <div className="my-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Digital Identity Tier:
                    </span>
                    <span className="font-semibold text-on-surface font-mono text-[11px]">Level 2 (Bhashini-Ready)</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono">
                      <Globe2 className="w-3.5 h-3.5 text-primary" />
                      Voice STT Engine:
                    </span>
                    <span className="font-semibold text-primary font-mono text-[11px]">Sarvam AI (saaras:v3)</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono">
                      <FileText className="w-3.5 h-3.5 text-tertiary" />
                      Form Active:
                    </span>
                    <span className="font-semibold text-on-surface font-mono text-[11px]">SW-FORM-7A (Pension & Welfare)</span>
                  </div>
                </div>

                {/* Interactive Action Options */}
                <div className="space-y-1">
                  <button
                    onClick={handleTryVoiceForm}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/10 text-on-surface hover:text-primary transition-all text-xs font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-primary" />
                      Open Voice Application Console
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={handleResetApplication}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-red-500/10 text-on-surface hover:text-red-500 transition-all text-xs font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                      Clear & Reset Current Form (Esc)
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">Esc</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface transition-all text-xs font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
                      Appearance: {isDark ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant">Toggle</span>
                  </button>
                </div>

                {/* Sign Out / Switch Session Footer */}
                <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between text-[11px]">
                  <span className="text-on-surface-variant font-mono">Status: Connected</span>
                  <button
                    onClick={() => {
                      handleResetApplication();
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface font-semibold hover:underline cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>New Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

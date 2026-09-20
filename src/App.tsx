import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { VoiceFormView } from './components/VoiceFormView';
import { Footer } from './components/Footer';
import { LanguageParticleBackground } from './components/LanguageParticleBackground';
import { IndicLanguageCode, AudioPipelineStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'live-demo'>('live-demo');
  const [targetLang, setTargetLang] = useState<IndicLanguageCode>('hi-IN');
  const [voiceState, setVoiceState] = useState<AudioPipelineStatus>('idle');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('swarsetu_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync theme class to documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('swarsetu_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('swarsetu_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigateToDemo = (lang?: IndicLanguageCode) => {
    if (lang) setTargetLang(lang);
    setActiveTab('live-demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('swarsetu:focus-voice'));
    }, 100);
  };

  const handleTabChange = (tab: 'home' | 'live-demo') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setVoiceState('idle');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'live-demo') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('swarsetu:focus-voice'));
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Cinematic Multilingual Language Universe Background */}
      <LanguageParticleBackground
        voiceState={voiceState}
        isDark={isDark}
        page={activeTab}
        activeLanguage={targetLang}
      />

      {/* Primary Interactive Foreground Layer */}
      <div className="relative z-10 flex flex-col flex-1 justify-between min-h-screen">
        {/* Universal Fixed Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {activeTab === 'home' ? (
            <LandingPage onNavigateToDemo={handleNavigateToDemo} />
          ) : (
            <VoiceFormView
              onBackToHome={() => handleTabChange('home')}
              isDark={isDark}
              toggleTheme={toggleTheme}
              initialLanguage={targetLang}
              onPipelineStatusChange={setVoiceState}
            />
          )}
        </main>

        {/* Universal Footer */}
        <Footer />
      </div>
    </div>
  );
}

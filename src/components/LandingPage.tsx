import React from 'react';
import {
  Mic,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  FileText,
  Volume2,
  Lock,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  Github,
  Linkedin
} from 'lucide-react';
import { LANGUAGE_LIST } from '../config/languages';
import { IndicLanguageCode } from '../types';

interface LandingPageProps {
  onNavigateToDemo: (lang?: IndicLanguageCode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToDemo }) => {
  const developers = [
    {
      name: 'Harsh Kumar',
      role: 'Developer',
      photo: '/developers/harsh-kumar.jpeg',
      linkedin: 'https://www.linkedin.com/in/harsh-kumar-6047a9381',
      github: 'https://github.com/26Harsh01'
    },
    {
      name: 'Srijan Keshri',
      role: 'Developer',
      photo: '/developers/srijan-keshri.jpeg',
      linkedin: 'https://www.linkedin.com/in/srijan-keshri-258740393?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/logicodesk'
    },
    {
      name: 'Swastika Chaubey',
      role: 'Developer',
      photo: '/developers/swastika-chaubey.jpeg',
      linkedin: 'https://www.linkedin.com/in/swastika-chaubey-6a35a2388?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: 'https://github.com/SwastikaChaubey113'
    }
  ];

  return (
    <div className="flex flex-col gap-20 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION */}
      {/* ========================================================================= */}
      <section className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BHASHINI COMPLIANT • 22 INDIC SCRIPTS</span>
            </div>

            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.1]">
              Speak Your Language. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4648D4] to-[#6063EE]">
                Access Every Form.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              India’s sovereign AI-powered multilingual voice-to-form platform. Bridging the digital divide for Bharat by converting natural spoken voice into verified civic records in under 3 seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateToDemo('hi-IN')}
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-headline font-semibold text-sm shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mic className="w-4 h-4" />
                <span>Try Voice Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-headline font-semibold text-sm border border-outline-variant/40 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20 max-w-lg">
              <div>
                <div className="font-headline font-bold text-xl text-primary">142ms</div>
                <div className="text-xs text-on-surface-variant font-mono">ASR Latency</div>
              </div>
              <div>
                <div className="font-headline font-bold text-xl text-tertiary">98.2%</div>
                <div className="text-xs text-on-surface-variant font-mono">Dialect Accuracy</div>
              </div>
              <div>
                <div className="font-headline font-bold text-xl text-secondary">0%</div>
                <div className="text-xs text-on-surface-variant font-mono">Hallucination Risk</div>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Live Telemetry & Pipeline Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-mono text-xs font-bold text-on-surface">IndicASR Live Pipeline</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono text-primary font-semibold">
                  16 kHz Active
                </span>
              </div>

              {/* Sample Voice Waveform Card */}
              <div className="mt-5 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant">Spoken Input (Hindi):</span>
                  <span className="text-tertiary font-bold">Confidence: 99.1%</span>
                </div>
                <p className="text-xs text-on-surface font-sans leading-relaxed italic bg-surface-container/50 p-2.5 rounded-lg border border-outline-variant/20">
                  "मेरा नाम राहुल शर्मा है, उम्र बाईस साल, मैं ग्वालियर में रहता हूँ..."
                </p>

                {/* Simulated Waveform */}
                <div className="flex items-center justify-center gap-1 h-10 px-2 py-1 bg-surface-container-low rounded-lg overflow-hidden">
                  {[20, 45, 60, 85, 95, 70, 80, 40, 60, 90, 75, 50, 65, 80, 95, 45, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 rounded-full bg-gradient-to-t from-primary to-secondary"
                    />
                  ))}
                </div>
              </div>

              {/* Extracted JSON schema preview */}
              <div className="mt-4 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 font-mono text-[11px] text-on-surface-variant space-y-1">
                <div className="text-primary font-bold">Extracted Schema (Form 7-A):</div>
                <div className="text-xs">
                  <span className="text-on-surface-variant">name:</span> <span className="text-emerald-700 dark:text-emerald-400">"Rahul Sharma"</span>
                </div>
                <div className="text-xs">
                  <span className="text-on-surface-variant">age:</span> <span className="text-emerald-700 dark:text-emerald-400">22</span>
                </div>
                <div className="text-xs">
                  <span className="text-on-surface-variant">location:</span> <span className="text-emerald-700 dark:text-emerald-400">"Gwalior, MP"</span>
                </div>
              </div>

              <button
                onClick={() => onNavigateToDemo('hi-IN')}
                className="w-full mt-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-headline font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE EXCLUSION BOTTLENECK */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            The Digital Divide
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface">
            The Exclusion Bottleneck
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Digital access shouldn't depend on how fast you type or whether you know English.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Typing & Keypad Barriers</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Over 300 Million citizens struggle with touch keyboards, complex CAPTCHAs, and multi-page drop-down menus on small smartphone displays.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Linguistic Disconnect</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              90% of official welfare portals operate strictly in English or complex bureaucratic legalese, forcing rural citizens to pay cyber cafe middlemen.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">The Civic Accessibility Gap</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Critical pension, healthcare, and agricultural subsidies remain unclaimed due to cognitive friction during manual form filing.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW IT WORKS PIPELINE */}
      {/* ========================================================================= */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Intelligent Architecture
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface">
            From Voice to Form in Seconds
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Four streamlined stages transforming raw acoustic speech into verified civic database submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              step: '01',
              title: 'Speak',
              desc: 'Citizen speaks freely in Hindi, Marathi, Bengali, Tamil, or regional dialects without typing.',
              icon: Mic,
              color: 'text-primary'
            },
            {
              step: '02',
              title: 'Understand',
              desc: 'IndicConformer ASR transcribes audio buffer into verbatim native script in 142ms.',
              icon: Volume2,
              color: 'text-secondary'
            },
            {
              step: '03',
              title: 'Auto-Fill',
              desc: 'Zero-hallucination extraction maps named entities directly into form inputs with live feedback.',
              icon: Sparkles,
              color: 'text-tertiary'
            },
            {
              step: '04',
              title: 'Verify',
              desc: 'Citizen reviews missing field warnings, inspects bilingual fields, and confirms sovereign submission.',
              icon: ShieldCheck,
              color: 'text-emerald-600'
            }
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-outline-variant">
                    {item.step}
                  </span>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: FEATURES GRID */}
      {/* ========================================================================= */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Sovereign Engineering
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface">
            Built for Real-World Indian Digital Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Enterprise-grade, low-latency civic infrastructure designed to withstand real rural connectivity constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: 'Multilingual Voice Input',
              desc: 'Seamless speech capture across Eighth Schedule Indian languages, understanding colloquial sentence structures.',
              icon: Mic
            },
            {
              title: 'Zero-Hallucination AI',
              desc: 'Strict schema extraction leaves unmentioned fields blank, prompting the citizen for review rather than inventing values.',
              icon: ShieldCheck
            },
            {
              title: 'Dialect & Accent Robustness',
              desc: 'Trained on diverse rural acoustic corpora to accurately decode background noise, regional inflections, and code-mixing.',
              icon: Layers
            },
            {
              title: 'Low-Bandwidth Optimization',
              desc: 'Compressed 16kHz audio buffer transfer allows reliable operation over intermittent 2G/3G network links.',
              icon: Zap
            },
            {
              title: 'WCAG 2.1 AAA Accessibility',
              desc: 'High contrast ratios, screen reader compatibility, and auditory guidance for non-literate and visually impaired citizens.',
              icon: Award
            },
            {
              title: 'Sovereign Data Privacy',
              desc: 'Zero telemetry storage. Audio streams are discarded after extraction with strict on-device data sovereignty.',
              icon: Lock
            }
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 hover:border-primary/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">{f.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: 22 SCHEDULED INDIC SCRIPTS */}
      {/* ========================================================================= */}
      <section id="languages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Scheduled Languages
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface">
            Technology That Speaks Bharat’s Languages
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Full native script transcription and bilingual entity resolution for every citizen.
          </p>
        </div>

        {/* Live Active Cohort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {LANGUAGE_LIST.map((lang) => (
            <div
              key={lang.code}
              onClick={() => onNavigateToDemo(lang.code)}
              className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
                  {lang.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                  Active v1.0
                </span>
              </div>
              <div className="text-2xl font-bold text-primary font-serif">
                {lang.nativeName}
              </div>
              <div className="space-y-1 text-[11px] font-mono text-on-surface-variant">
                <div>Script: {lang.script}</div>
                <div>Demographics: {lang.speakers}</div>
              </div>
              <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                <span>Try {lang.name} Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Next Scheduled Cohort Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-headline font-bold text-sm text-on-surface flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Next Scheduled Cohort Launching in Q3 2026:</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Gujarati (ગુજરાતી), Odia (ଓଡ଼ିଆ), Malayalam (മലയാളം), and Punjabi (ਪੰਜਾਬੀ).
            </p>
          </div>
          <button
            onClick={() => onNavigateToDemo('hi-IN')}
            className="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-xs font-mono font-bold border border-outline-variant/30 text-on-surface shrink-0"
          >
            Request Regional Sandbox Access
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: DEVELOPERS */}
      {/* ========================================================================= */}
      <section id="developers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Project Team
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface">
            Developers Behind SwarSetu
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            The team building multilingual voice-first access for citizen services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {developers.map((developer) => (
            <article
              key={developer.github}
              className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-center space-y-4"
            >
              <div className="mx-auto w-28 h-28 rounded-2xl overflow-hidden border border-outline-variant/40 bg-surface-container-lowest shadow-sm">
                <img
                  src={developer.photo}
                  alt={`${developer.name} profile photo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface">{developer.name}</h3>
                <p className="text-xs font-mono text-on-surface-variant mt-1">{developer.role}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${developer.name} LinkedIn profile`}
                  title={`${developer.name} LinkedIn`}
                  className="w-10 h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/35 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={developer.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${developer.name} GitHub profile`}
                  title={`${developer.name} GitHub`}
                  className="w-10 h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/35 text-on-surface hover:bg-on-surface hover:text-surface transition-all flex items-center justify-center"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: BOTTOM CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#002DB0] via-[#2547D0] to-[#6063EE] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl max-w-2xl mx-auto leading-tight">
            Empower Every Citizen With The Power Of Their Voice.
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Experience the voice-driven civic revolution. Test live audio forms or deploy SwarSetu into your public service registry today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigateToDemo('hi-IN')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-white/90 text-primary font-headline font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              Launch Live Sandbox
            </button>
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-headline font-bold text-sm border border-white/30 backdrop-blur-sm transition-all"
            >
              API Status & Health
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

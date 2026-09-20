import React from 'react';
import { SwarSetuLogo } from './SwarSetuLogo';
import { ShieldCheck, Heart, Award } from 'lucide-react';
import { LANGUAGE_LIST } from '../config/languages';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 py-12 px-4 sm:px-6 lg:px-12 text-xs text-on-surface-variant font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Mission */}
        <div className="space-y-2 max-w-sm">
          <SwarSetuLogo size="sm" />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            SwarSetu Sovereign Compute Foundation. Transforming civic access across Bharat through indigenous voice intelligence.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-tertiary">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WCAG 2.1 AAA Compliant • Zero Telemetry</span>
          </div>
        </div>

        {/* Supported Indic Scripts */}
        <div className="space-y-2">
          <div className="font-mono text-[11px] uppercase font-bold text-on-surface">
            Supported Indic Scripts
          </div>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGE_LIST.map((lang) => (
              <span
                key={lang.code}
                className="px-2 py-0.5 rounded-md bg-surface-container-lowest border border-outline-variant/25 text-[11px] font-medium text-on-surface"
              >
                {lang.name} ({lang.nativeName})
              </span>
            ))}
            <span className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-mono text-on-surface-variant">
              +18 More in Pipeline
            </span>
          </div>
        </div>

        {/* Legal & Version */}
        <div className="space-y-1 text-[11px] font-mono md:text-right">
          <div>SwarSetu v1.0 Sovereign Build</div>
          <div>Bhashini & IndicConformer Aligned</div>
          <div className="text-on-surface-variant/70 pt-2 flex items-center md:justify-end gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>for Bharat Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useEffect, useState } from 'react';
import { AudioPipelineStatus } from '../types';

interface AudioWaveformProps {
  isRecording: boolean;
  audioLevel?: number; // 0 to 1
  frequencyData?: number[]; // normalized 0 to 1 array
  barsCount?: number;
  status?: AudioPipelineStatus;
  isSpeaking?: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  audioLevel = 0,
  frequencyData,
  barsCount = 32,
  status = 'idle',
  isSpeaking = false
}) => {
  const [bars, setBars] = useState<number[]>(() => Array(barsCount).fill(10));

  useEffect(() => {
    if (!isRecording) {
      setBars(Array(barsCount).fill(8));
      return;
    }

    // If real frequency data is provided, map it directly
    if (frequencyData && frequencyData.length >= barsCount) {
      const mapped = Array.from({ length: barsCount }, (_, idx) => {
        const val = frequencyData[Math.floor((idx / barsCount) * frequencyData.length)] || 0;
        return Math.min(100, Math.max(10, val * 100));
      });
      setBars(mapped);
      return;
    }

    // Dynamic wave animation reacting directly to audioLevel
    const interval = setInterval(() => {
      setBars(() => {
        return Array.from({ length: barsCount }, (_, idx) => {
          const distFromCenter = Math.abs(idx - barsCount / 2) / (barsCount / 2);
          const baseHeight = Math.max(12, (1 - distFromCenter * 0.55) * 65);
          // Scale intensely with audioLevel
          const reactionMultiplier = isSpeaking ? 1.5 + audioLevel * 3.5 : 0.4 + audioLevel * 1.2;
          const variance = (Math.random() * 0.5 + 0.5) * reactionMultiplier;
          return Math.min(96, Math.max(8, baseHeight * variance));
        });
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isRecording, audioLevel, frequencyData, barsCount, isSpeaking]);

  // Determine active stage in the conceptual pipeline: VOICE → LANGUAGE → UNDERSTANDING → FORM
  const getStageClass = (stage: 'voice' | 'language' | 'understanding' | 'form') => {
    if (stage === 'voice' && isRecording) return 'text-primary font-bold opacity-100 scale-105';
    if (stage === 'language' && (isRecording || status === 'transcribing')) return 'text-secondary font-bold opacity-100 scale-105';
    if (stage === 'understanding' && (status === 'transcribing' || status === 'extracting')) return 'text-tertiary font-bold opacity-100 scale-105';
    if (stage === 'form' && (status === 'form_ready' || status === 'submitting' || status === 'success')) return 'text-emerald-600 dark:text-emerald-400 font-bold opacity-100 scale-105';
    return 'text-on-surface-variant/50 font-normal';
  };

  return (
    <div className="w-full flex flex-col gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 relative overflow-hidden transition-all duration-200">
      {/* Background Watermark Indic Glyphs */}
      <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-[0.06] select-none text-2xl font-serif text-primary">
        <span>अ</span>
        <span>অ</span>
        <span>அ</span>
        <span>ळ</span>
        <span>ક</span>
        <span>ಕ</span>
      </div>

      {/* Voice Status Pill */}
      {isRecording && (
        <div className="flex items-center justify-between px-2 pt-0.5 text-[11px] font-mono select-none z-10">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
            <span className={isSpeaking ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-on-surface-variant'}>
              {isSpeaking ? '🎙️ Speech Detected' : '👂 Listening for voice...'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant/70">
            <span>Level: {Math.round(audioLevel * 100)}%</span>
            <div className="w-16 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-75 ${
                  isSpeaking ? 'bg-emerald-500' : 'bg-primary'
                }`}
                style={{ width: `${Math.min(100, Math.round(audioLevel * 100))}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Waveform Bars Container */}
      <div className="w-full flex items-center justify-center gap-[2.5px] h-16 px-3 py-1 relative z-10">
        {bars.map((height, i) => (
          <div
            key={i}
            style={{ height: `${height}%` }}
            className={`w-1 rounded-full transition-all duration-75 ${
              isRecording
                ? isSpeaking
                  ? 'bg-gradient-to-t from-emerald-500 via-primary to-indigo-500 shadow-sm shadow-emerald-500/40'
                  : 'bg-gradient-to-t from-primary/60 via-indigo-400/60 to-secondary/60'
                : 'bg-outline-variant/40'
            }`}
          />
        ))}
      </div>

      {/* Connected Conceptual Pipeline: VOICE → LANGUAGE → UNDERSTANDING → FORM */}
      <div className="flex items-center justify-between px-2 pt-1 border-t border-outline-variant/20 text-[10px] font-mono select-none">
        <span className={`flex items-center gap-1 transition-all ${getStageClass('voice')}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-primary animate-ping' : 'bg-outline-variant/40'}`} />
          VOICE
        </span>
        <span className="text-outline-variant/40">→</span>
        <span className={`transition-all ${getStageClass('language')}`}>LANGUAGE</span>
        <span className="text-outline-variant/40">→</span>
        <span className={`transition-all ${getStageClass('understanding')}`}>UNDERSTANDING</span>
        <span className="text-outline-variant/40">→</span>
        <span className={`transition-all ${getStageClass('form')}`}>FORM</span>
      </div>
    </div>
  );
};

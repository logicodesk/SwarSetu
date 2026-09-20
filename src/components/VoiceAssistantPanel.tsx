import React, { useState, useRef, useEffect } from 'react';
import { IndicLanguageCode, AudioPipelineStatus, IndicLanguageConfig } from '../types';
import { SUPPORTED_LANGUAGES, LANGUAGE_LIST } from '../config/languages';
import { AudioWaveform } from './AudioWaveform';
import { TelemetryStepper } from './TelemetryStepper';
import {
  Mic,
  Square,
  RotateCcw,
  Sparkles,
  Volume2,
  AlertTriangle,
  WifiOff,
  Check,
  Edit2,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface VoiceAssistantPanelProps {
  selectedLanguage: IndicLanguageCode;
  onLanguageChange: (lang: IndicLanguageCode) => void;
  status: AudioPipelineStatus;
  transcript: string;
  onTranscriptChange: (newTranscript: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onRestart: () => void;
  onReExtract: () => void;
  onSimulateVoiceSample: (sampleTranscript?: string) => void;
  latencyMs: number;
  audioLevel?: number;
  isSpeaking?: boolean;
  frequencyData?: number[];
  detectedLanguage?: string | null;
}

export const VoiceAssistantPanel: React.FC<VoiceAssistantPanelProps> = ({
  selectedLanguage,
  onLanguageChange,
  status,
  transcript,
  onTranscriptChange,
  onStartRecording,
  onStopRecording,
  onRestart,
  onReExtract,
  onSimulateVoiceSample,
  latencyMs,
  audioLevel = 0,
  isSpeaking = false,
  frequencyData,
  detectedLanguage
}) => {
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [simMode, setSimMode] = useState<'normal' | 'denied' | 'offline'>('normal');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [editableTranscript, setEditableTranscript] = useState(transcript);

  const langConfig: IndicLanguageConfig = SUPPORTED_LANGUAGES[selectedLanguage] || SUPPORTED_LANGUAGES['auto'];
  const timerRef = useRef<any>(null);

  // Sync editable transcript
  useEffect(() => {
    setEditableTranscript(transcript);
  }, [transcript]);

  // Handle Recording Timer & 30-second cap
  useEffect(() => {
    if (status === 'recording') {
      setRecordDuration(0);
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => {
          if (prev >= 30) {
            // 30 seconds hard cap requirement
            clearInterval(timerRef.current);
            onStopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // When status returns to idle, reset timer and editing state back to 0
      if (status === 'idle') {
        setRecordDuration(0);
        setIsEditingTranscript(false);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, onStopRecording]);

  const handleResetClick = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setRecordDuration(0);
    setIsEditingTranscript(false);
    onRestart();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} / 00:30`;
  };

  const handleMicClick = () => {
    if (simMode === 'denied') {
      alert('Simulation: Microphone access was denied by user/browser permissions.');
      return;
    }
    if (simMode === 'offline') {
      alert('Simulation: Device is currently in Offline mode. Sovereign local cache will be used.');
    }

    if (status === 'processing_audio' || status === 'transcribing' || status === 'extracting') {
      return;
    }

    if (status === 'recording') {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  const handleSaveTranscript = () => {
    onTranscriptChange(editableTranscript);
    setIsEditingTranscript(false);
  };

  return (
    <div id="voice-assistant-panel" className="flex flex-col gap-5 p-5 md:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm transition-all duration-300">
      {/* Panel Top Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-headline font-bold text-lg text-on-surface">Voice Assistant</h2>
            <span className="px-2 py-0.5 rounded-md bg-primary-container text-white font-mono text-[10px] font-semibold tracking-wider">
              16 kHz
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Speak naturally in your mother tongue
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-mono text-[10px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>BHASHINI COMPLIANT</span>
        </div>
      </div>

      {/* Language Selector Buttons */}
      <div>
        <label className="block text-[11px] font-mono text-on-surface-variant uppercase font-semibold mb-2">
          Select Indic Language
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LANGUAGE_LIST.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-primary-container text-white border-primary shadow-sm ring-2 ring-primary/20'
                    : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container'
                }`}
              >
                <span className="font-semibold text-sm">{lang.name}</span>
                <span className={`text-xs ${isSelected ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Microphone Console */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 relative overflow-hidden">
        {/* Pulsing Concentric Rings & Orbiting Indic Glyphs when Recording */}
        {status === 'recording' && (
          <>
            <div className="absolute w-48 h-48 rounded-full bg-primary/10 animate-ping pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full bg-primary/15 animate-pulse pointer-events-none" />
            {/* Connected Floating Glyphs orbiting mic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="absolute -top-1 font-serif text-xs text-primary/80 font-bold animate-pulse">अ</span>
              <span className="absolute -bottom-1 font-serif text-xs text-secondary/80 font-bold animate-pulse">அ</span>
              <span className="absolute -left-1 font-serif text-xs text-tertiary/80 font-bold animate-pulse">অ</span>
              <span className="absolute -right-1 font-serif text-xs text-indigo-400/80 font-bold animate-pulse">ळ</span>
            </div>
          </>
        )}

        {/* The Big Mic Button */}
        <button
          onClick={handleMicClick}
          id="btn-voice-mic"
          aria-label={status === 'recording' ? 'Stop recording voice' : 'Start speaking with microphone'}
          disabled={status === 'processing_audio' || status === 'transcribing' || status === 'extracting'}
          className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            status === 'recording'
              ? 'bg-red-600 text-white shadow-red-500/30'
              : status === 'processing_audio' || status === 'transcribing' || status === 'extracting'
              ? 'bg-surface-container-high text-primary cursor-wait'
              : 'bg-gradient-to-br from-primary to-[#5F63EE] text-white shadow-primary/30'
          }`}
        >
          {status === 'recording' ? (
            <Square className="w-8 h-8 fill-current" />
          ) : (
            <Mic className="w-9 h-9" />
          )}
        </button>

        {/* Recording Timer */}
        <div className="mt-4 font-mono text-sm font-semibold tracking-wider text-on-surface">
          {formatTimer(recordDuration)}
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-1 text-xs font-medium text-center">
          {status === 'recording' ? (
            <span className="text-red-600 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Listening... ({langConfig.name} ASR Active)
            </span>
          ) : status === 'processing_audio' ? (
            <span className="text-primary font-semibold animate-pulse">
              Preparing microphone... start speaking after Listening appears
            </span>
          ) : status === 'transcribing' ? (
            <span className="text-primary font-semibold animate-pulse">
              Recognizing Speech via IndicConformer-v2...
            </span>
          ) : status === 'extracting' ? (
            <span className="text-secondary font-semibold animate-pulse">
              Extracting Form Schema via Zero-Hallucination AI...
            </span>
          ) : (
            <span className="text-on-surface-variant font-mono">
              Ready • Tap mic or use Quick Voice Preset
            </span>
          )}
        </div>

        {/* Vernacular Prompt Quote */}
        <div className="mt-2 text-xs italic text-on-surface-variant/80 bg-surface-container px-3 py-1 rounded-full">
          "{langConfig.samplePrompt}"
        </div>

        {/* Recording Controls (Stop / Restart) */}
        <div className="flex items-center gap-2 mt-4">
          {status === 'recording' ? (
            <button
              onClick={onStopRecording}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              Stop Recording
            </button>
          ) : (
            <button
              onClick={() => onSimulateVoiceSample()}
              className="px-4 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-xs flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Simulate {langConfig.name} Voice
            </button>
          )}

          <button
            type="button"
            onClick={handleResetClick}
            id="btn-reset-voice"
            aria-label="Reset voice input and form"
            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 border border-outline-variant/30 hover:border-red-500/30 transition-all text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Reset voice input and clear form (Esc)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium">Reset (Esc)</span>
          </button>
        </div>
      </div>

      {/* Audio Waveform Spectrogram & Voice Bridge */}
      <AudioWaveform isRecording={status === 'recording'} audioLevel={audioLevel} status={status} />

      {/* Telemetry Stepper */}
      <TelemetryStepper status={status} latencyMs={latencyMs} />

      {/* Spoken Transcript Box with Entity Highlights */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-on-surface">
            <Volume2 className="w-3.5 h-3.5 text-primary" />
            <span>You said:</span>
          </div>

          <div className="flex items-center gap-2">
            {!isEditingTranscript ? (
              <button
                onClick={() => setIsEditingTranscript(true)}
                className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Edit Transcript
              </button>
            ) : (
              <button
                onClick={handleSaveTranscript}
                className="text-[11px] font-mono text-tertiary hover:underline flex items-center gap-1 font-bold"
              >
                <Check className="w-3 h-3" />
                Done
              </button>
            )}

            <button
              onClick={() => onTranscriptChange('')}
              className="text-[11px] font-mono text-on-surface-variant hover:text-red-500 flex items-center gap-1"
              title="Clear transcript"
            >
              <Trash2 className="w-3 h-3" />
            </button>

            <button
              onClick={onReExtract}
              className="text-[11px] font-mono text-secondary hover:underline flex items-center gap-1"
              title="Re-extract fields"
            >
              <RefreshCw className="w-3 h-3" />
              Re-extract
            </button>
          </div>
        </div>

        {isEditingTranscript ? (
          <textarea
            value={editableTranscript}
            onChange={(e) => setEditableTranscript(e.target.value)}
            rows={3}
            className="w-full p-2.5 text-sm bg-surface-container-low border border-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-sans"
            placeholder="Type or modify spoken transcript..."
          />
        ) : (
          <div className="p-3 rounded-lg bg-surface-container-low/70 border border-outline-variant/20 text-sm leading-relaxed text-on-surface font-sans select-text">
            {transcript ? (
              <p className="whitespace-pre-wrap">{transcript}</p>
            ) : (
              <p className="text-on-surface-variant italic text-xs">
                Spoken transcript will appear here in real-time as you speak...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Simulator Controls */}
      <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-on-surface-variant font-semibold">
          Simulator Controls:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSimMode('normal')}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
              simMode === 'normal'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Normal (Active)
          </button>
          <button
            onClick={() => setSimMode('denied')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all ${
              simMode === 'denied'
                ? 'bg-error-container text-error font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Mic Denied
          </button>
          <button
            onClick={() => setSimMode('offline')}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all ${
              simMode === 'offline'
                ? 'bg-amber-100 text-amber-900 font-semibold dark:bg-amber-950 dark:text-amber-200'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <WifiOff className="w-3 h-3" />
            Offline Mode
          </button>
        </div>
      </div>
    </div>
  );
};

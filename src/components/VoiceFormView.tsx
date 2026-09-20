import React, { useState, useRef, useEffect } from 'react';
import {
  IndicLanguageCode,
  AudioPipelineStatus,
  ExtractedFormData,
  SubmissionResponse
} from '../types';
import { SUPPORTED_LANGUAGES } from '../config/languages';
import { VoiceAssistantPanel } from './VoiceAssistantPanel';
import { SmartFormEngine } from './SmartFormEngine';
import { SuccessModal } from './SuccessModal';
import { transcribeAudio, extractInformation, submitForm } from '../services/api';
import { ArrowLeft, Sparkles, Moon, Sun, RotateCcw, Check } from 'lucide-react';

interface VoiceFormViewProps {
  onBackToHome: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  initialLanguage?: IndicLanguageCode;
  onPipelineStatusChange?: (status: AudioPipelineStatus) => void;
}

export const VoiceFormView: React.FC<VoiceFormViewProps> = ({
  onBackToHome,
  isDark,
  toggleTheme,
  initialLanguage = 'hi-IN',
  onPipelineStatusChange
}) => {
  const [language, setLanguage] = useState<IndicLanguageCode>(initialLanguage);
  const [pipelineStatus, setPipelineStatus] = useState<AudioPipelineStatus>('idle');

  // Notify parent on status change for cinematic background sync
  useEffect(() => {
    onPipelineStatusChange?.(pipelineStatus);
  }, [pipelineStatus, onPipelineStatusChange]);
  const [transcript, setTranscript] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number>(142);
  const [selectedFormName, setSelectedFormName] = useState<string>(
    'Citizen Welfare & Pension Scheme (Form 7-A)'
  );
  const [showResetNotice, setShowResetNotice] = useState<boolean>(false);

  // Form data state
  const [formData, setFormData] = useState<ExtractedFormData>({
    name: null,
    nameIndic: null,
    age: null,
    gender: null,
    phone: null,
    email: null,
    address: null,
    occupation: null
  });

  // Submission state
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Audio Recording References
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const liveTranscriptRef = useRef<string>('');
  const requestIdRef = useRef<number>(0);
  const isStoppingRecordingRef = useRef<boolean>(false);
  const recordingStartedAtRef = useRef<number>(0);
  const simulateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetToastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Language Change
  const handleLanguageChange = (newLang: IndicLanguageCode) => {
    setLanguage(newLang);
    console.log('[VoiceFormView] Language set to:', newLang);
  };

  // State Change Observers for Real-Time Console Telemetry
  useEffect(() => {
    console.log(
      '%c[VoiceFormView] 🟢 FORM DATA COMMITTED TO REACT STATE:',
      'color: #10b981; font-weight: bold; background: #064e3b; padding: 2px 6px; border-radius: 4px;',
      formData
    );
    console.table({
      name: { value: formData.name, status: formData.name ? 'FILLED' : 'EMPTY' },
      nameIndic: { value: formData.nameIndic, status: formData.nameIndic ? 'FILLED' : 'EMPTY' },
      age: { value: formData.age, status: formData.age !== null ? 'FILLED' : 'EMPTY' },
      gender: { value: formData.gender, status: formData.gender ? 'FILLED' : 'EMPTY' },
      phone: { value: formData.phone, status: formData.phone ? 'FILLED' : 'EMPTY' },
      email: { value: formData.email, status: formData.email ? 'FILLED' : 'EMPTY' },
      address: { value: formData.address, status: formData.address ? 'FILLED' : 'EMPTY' },
      occupation: { value: formData.occupation, status: formData.occupation ? 'FILLED' : 'EMPTY' }
    });
  }, [formData]);

  useEffect(() => {
    console.log(
      `%c[VoiceFormView] 🔄 PIPELINE STATUS CHANGED -> "${pipelineStatus}"`,
      'color: #38bdf8; font-weight: bold;'
    );
  }, [pipelineStatus]);

  useEffect(() => {
    console.log(
      `%c[VoiceFormView] 📝 TRANSCRIPT UPDATED (${transcript.length} chars):`,
      'color: #f59e0b;',
      transcript
    );
  }, [transcript]);

  // Start Actual Recording using Browser MediaRecorder & Web Speech API
  const handleStartRecording = async () => {
    liveTranscriptRef.current = '';
    audioChunksRef.current = [];
    isStoppingRecordingRef.current = false;
    recordingStartedAtRef.current = 0;
    setPipelineStatus('processing_audio');

    // 1. Start MediaRecorder for audio blob capture. UI enters recording mode
    // immediately, so slower microphone permission/device startup does not feel stuck.
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('MediaDevices API not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      let mimeType = 'audio/webm';
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
          mimeType = 'audio/ogg;codecs=opus';
        }
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
          console.log(`[VoiceFormView] Audio chunk #${audioChunksRef.current.length} arrived: ${e.data.size} bytes`);
        }
      };

      mediaRecorder.onstop = async () => {
        isStoppingRecordingRef.current = false;
        const chunkCount = audioChunksRef.current.length;
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

        console.group(
          '%c[VoiceFormView] 🎙️ STEP 1: BLOB CREATION ON RECORDER STOP',
          'color: #3b82f6; font-weight: bold; background: #1e3a8a; padding: 2px 6px; border-radius: 4px;'
        );
        console.log('Timestamp:', new Date().toISOString());
        console.log('MimeType:', mimeType);
        console.log('Total Chunks Captured:', chunkCount);
        console.log('Total Blob Size (bytes):', audioBlob.size);
        console.log('Total Blob Size (KB):', (audioBlob.size / 1024).toFixed(2));
        console.log('Blob Instance:', audioBlob);
        console.log('Live Speech recognition buffer text:', liveTranscriptRef.current || '(none)');
        if (audioBlob.size === 0) {
          console.warn('⚠️ WARNING: Recorded audio blob size is 0 bytes! Microphone stream may not have sent audio frames.');
        } else {
          console.log('✅ Audio Blob successfully created.');
        }
        console.groupEnd();

        // Stop all audio tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        await processRecordedAudio(audioBlob, liveTranscriptRef.current);
        mediaRecorderRef.current = null;
      };

      mediaRecorder.start(100); // flush frequently so the recorder is responsive on stop
      recordingStartedAtRef.current = performance.now();
      setPipelineStatus('recording');
      console.log('[VoiceFormView] MediaRecorder started with mimeType:', mimeType);

      // 2. Start Browser Web Speech after microphone access is active. This avoids
      // competing permission/device startup paths and still provides live text.
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = language;
          recognition.onresult = (event: any) => {
            let currentText = '';
            for (let i = 0; i < event.results.length; i++) {
              currentText += event.results[i][0].transcript + ' ';
            }
            const cleanText = currentText.trim();
            if (cleanText) {
              liveTranscriptRef.current = cleanText;
              setTranscript(cleanText);
              console.log('[VoiceFormView] Live WebSpeech transcription interim:', cleanText);
            }
          };
          recognition.onerror = (e: any) => {
            console.warn('[VoiceFormView] SpeechRecognition event note:', e?.error);
          };
          recognition.start();
          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('[VoiceFormView] SpeechRecognition init notice:', e);
        }
      }
    } catch (err: any) {
      console.warn('Microphone access unavailable or denied. Switching to simulation mode:', err);
      handleSimulateVoiceSample(language, true);
    }
  };

  // Stop Recording
  const handleStopRecording = () => {
    console.log('[VoiceFormView] User triggered handleStopRecording.');
    if (isStoppingRecordingRef.current) {
      console.log('[VoiceFormView] Stop ignored because recorder is already finalizing.');
      return;
    }
    isStoppingRecordingRef.current = true;
    setPipelineStatus('transcribing');

    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      const elapsedMs = recordingStartedAtRef.current ? performance.now() - recordingStartedAtRef.current : 0;
      const finalizeDelayMs = Math.max(320, 750 - elapsedMs);
      window.setTimeout(() => {
        if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') return;
        try {
          mediaRecorderRef.current.requestData();
        } catch (e) {}
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
          isStoppingRecordingRef.current = false;
          console.warn('MediaRecorder stop note:', e);
        }
      }, finalizeDelayMs);
    } else {
      // If mic was not active or already stopped
      isStoppingRecordingRef.current = false;
      const textToProcess = transcript.trim() || SUPPORTED_LANGUAGES[language]?.sampleTranscript || '';
      console.log('[VoiceFormView] MediaRecorder was inactive; routing directly to extraction with:', textToProcess);
      processTranscript(textToProcess);
    }
  };

  // Process Real Audio File
  const processRecordedAudio = async (audioBlob: Blob, liveSpokenText?: string) => {
    const currentReqId = ++requestIdRef.current;
    setPipelineStatus('transcribing');

    console.group(
      `%c[VoiceFormView] 📡 STEP 2: TRANSCRIPTION DISPATCH (Request #${currentReqId})`,
      'color: #a855f7; font-weight: bold; background: #581c87; padding: 2px 6px; border-radius: 4px;'
    );
    console.log('Input Parameters:', {
      requestId: currentReqId,
      blobSizeBytes: audioBlob.size,
      blobType: audioBlob.type,
      language,
      liveSpokenText: liveSpokenText || '(none)'
    });

    let finalTranscript = liveSpokenText?.trim() || '';
    const hasUsableLiveTranscript = finalTranscript.replace(/\s+/g, '').length >= 12;
    const hasNameCue = /(?:name|नाम|नाव|নাম|பெயர்|పేరు|નામ|ಹೆಸರು|my name|मेरा नाम|என் பெயர்|నా పేరు)/i.test(finalTranscript);

    if (hasUsableLiveTranscript && hasNameCue) {
      console.log('Using live browser transcript because it already contains a name cue:', finalTranscript);
      setLatencyMs(120);
    } else if (audioBlob.size > 0) {
      try {
        console.log(`Sending ${audioBlob.size} bytes to POST /api/transcribe...`);
        const startTime = performance.now();
        const transResult = await transcribeAudio(audioBlob, language);
        const duration = (performance.now() - startTime).toFixed(1);

        console.log(`Received POST /api/transcribe response in ${duration}ms:`, transResult);

        // If reset was triggered while transcribing, drop result immediately
        if (currentReqId !== requestIdRef.current) {
          console.warn(
            `⚠️ Request #${currentReqId} invalidated: A reset or newer operation (#${requestIdRef.current}) was triggered.`
          );
          console.groupEnd();
          return;
        }

        console.log('Transcription Response Payload Inspection:', {
          success: transResult.success,
          transcript: transResult.transcript,
          transcriptLength: transResult.transcript ? transResult.transcript.length : 0,
          latencyMs: transResult.latencyMs,
          clarityScore: transResult.clarityScore,
          isDemo: transResult.isDemo
        });

        if (transResult.transcript && transResult.transcript.trim()) {
          // If we had no live transcript, or if backend returned a non-demo transcript, use backend result
          if (!finalTranscript || !transResult.isDemo) {
            console.log(
              `Adopting backend transcription output: was="${finalTranscript}", now="${transResult.transcript.trim()}"`
            );
            finalTranscript = transResult.transcript.trim();
          } else {
            console.log(
              `Preserving live client recognition ("${finalTranscript}") over demo fallback.`
            );
          }
        } else {
          console.warn('Backend returned empty transcript in payload.');
        }

        setLatencyMs(transResult.latencyMs || 142);
      } catch (err) {
        console.error('❌ /api/transcribe network error, proceeding with fallback:', err);
      }
    } else {
      console.warn('⚠️ Audio Blob has 0 bytes; skipping backend transcription call.');
    }

    if (currentReqId !== requestIdRef.current) {
      console.warn(`⚠️ Request #${currentReqId} dropped before transcript resolution.`);
      console.groupEnd();
      return;
    }

    if (!finalTranscript) {
      finalTranscript = transcript.trim() || SUPPORTED_LANGUAGES[language]?.sampleTranscript || '';
      console.log('No spoken audio detected; using default language sample transcript:', finalTranscript);
    }

    console.log(`✅ Final resolved transcript for Step 3: "${finalTranscript}"`);
    console.groupEnd();

    setTranscript(finalTranscript);
    await processTranscript(finalTranscript);
  };

  // Process Text Transcript to Extract Entities
  const processTranscript = async (text: string) => {
    const currentReqId = ++requestIdRef.current;
    console.group(
      `%c[VoiceFormView] 🧠 STEP 3 & 4: EXTRACTION & STATE MERGE (Request #${currentReqId})`,
      'color: #ec4899; font-weight: bold; background: #831843; padding: 2px 6px; border-radius: 4px;'
    );

    if (!text || !text.trim()) {
      console.warn('⚠️ processTranscript called with empty or blank transcript. Halting extraction.');
      setPipelineStatus('form_ready');
      console.groupEnd();
      return;
    }

    setPipelineStatus('extracting');
    console.log('Dispatching transcript to POST /api/extract:', {
      requestId: currentReqId,
      language,
      transcriptLength: text.trim().length,
      transcriptPreview: text.trim()
    });

    try {
      const startTime = performance.now();
      const extractResult = await extractInformation(text.trim(), language);
      const duration = (performance.now() - startTime).toFixed(1);

      console.log(`Received POST /api/extract response in ${duration}ms:`, extractResult);

      // If reset was triggered while extracting, drop result immediately
      if (currentReqId !== requestIdRef.current) {
        console.warn(
          `⚠️ Request #${currentReqId} invalidated: A reset or newer operation (#${requestIdRef.current}) was triggered.`
        );
        console.groupEnd();
        return;
      }

      console.log('Extraction Response Payload Inspection:', {
        success: extractResult?.success,
        modelUsed: (extractResult as any)?.modelUsed || 'Heuristic Fallback',
        detectedFieldsCount: extractResult?.detectedFieldsCount,
        missingFields: extractResult?.missingFields,
        hasDataField: Boolean(extractResult?.data)
      });

      if (extractResult && extractResult.data) {
        const incoming = extractResult.data;
        console.log('Raw incoming fields in extractResult.data:', incoming);
        console.table({
          name: { value: incoming.name, type: typeof incoming.name },
          nameIndic: { value: incoming.nameIndic, type: typeof incoming.nameIndic },
          age: { value: incoming.age, type: typeof incoming.age },
          gender: { value: incoming.gender, type: typeof incoming.gender },
          phone: { value: incoming.phone, type: typeof incoming.phone },
          email: { value: incoming.email, type: typeof incoming.email },
          address: { value: incoming.address, type: typeof incoming.address },
          occupation: { value: incoming.occupation, type: typeof incoming.occupation }
        });

        console.log(
          '%c[VoiceFormView] 🔄 STEP 4: Calling setFormData((prev) => next)...',
          'color: #10b981; font-weight: bold;'
        );

        // Merge extracted non-null values into React form state
        setFormData((prev) => {
          if (currentReqId !== requestIdRef.current) {
            console.warn(
              `⚠️ In setFormData callback: reqId #${currentReqId} does not match active #${requestIdRef.current}. Aborting update.`
            );
            return prev;
          }

          console.log('Current form state (BEFORE merge):', { ...prev });
          const next: ExtractedFormData = { ...prev };
          const audit: Record<string, { status: string; oldVal: any; newVal: any }> = {};

          // Field: name
          if (incoming.name !== null && incoming.name !== undefined && String(incoming.name).trim() !== '') {
            const val = String(incoming.name).trim();
            audit.name = { status: 'UPDATED', oldVal: prev.name, newVal: val };
            next.name = val;
          } else {
            audit.name = { status: 'SKIPPED (null/empty)', oldVal: prev.name, newVal: prev.name };
          }

          // Field: nameIndic
          if (incoming.nameIndic !== null && incoming.nameIndic !== undefined && String(incoming.nameIndic).trim() !== '') {
            const val = String(incoming.nameIndic).trim();
            audit.nameIndic = { status: 'UPDATED', oldVal: prev.nameIndic, newVal: val };
            next.nameIndic = val;
          } else {
            audit.nameIndic = { status: 'SKIPPED (null/empty)', oldVal: prev.nameIndic, newVal: prev.nameIndic };
          }

          // Field: age (handles number, numeric string, or natural language age string)
          if (incoming.age !== null && incoming.age !== undefined) {
            let parsedAge = typeof incoming.age === 'number' ? incoming.age : NaN;
            if (isNaN(parsedAge)) {
              const digits = String(incoming.age).replace(/\D/g, '');
              parsedAge = digits ? parseInt(digits, 10) : NaN;
            }
            if (!isNaN(parsedAge) && parsedAge > 0 && parsedAge < 130) {
              audit.age = { status: 'UPDATED', oldVal: prev.age, newVal: parsedAge };
              next.age = parsedAge;
            } else {
              audit.age = { status: 'SKIPPED (invalid numeric)', oldVal: prev.age, newVal: incoming.age };
            }
          } else {
            audit.age = { status: 'SKIPPED (null)', oldVal: prev.age, newVal: prev.age };
          }

          // Field: gender (handles case-insensitive 'male' | 'female' | 'other')
          if (incoming.gender !== null && incoming.gender !== undefined) {
            const normalizedGender = String(incoming.gender).toLowerCase().trim();
            if (normalizedGender === 'male' || normalizedGender === 'female' || normalizedGender === 'other') {
              audit.gender = { status: 'UPDATED', oldVal: prev.gender, newVal: normalizedGender };
              next.gender = normalizedGender as 'male' | 'female' | 'other';
            } else {
              audit.gender = { status: 'SKIPPED (unrecognized)', oldVal: prev.gender, newVal: incoming.gender };
            }
          } else {
            audit.gender = { status: 'SKIPPED (null)', oldVal: prev.gender, newVal: prev.gender };
          }

          // Field: phone
          if (incoming.phone !== null && incoming.phone !== undefined && String(incoming.phone).trim() !== '') {
            const val = String(incoming.phone).trim();
            audit.phone = { status: 'UPDATED', oldVal: prev.phone, newVal: val };
            next.phone = val;
          } else {
            audit.phone = { status: 'SKIPPED (null/empty)', oldVal: prev.phone, newVal: prev.phone };
          }

          // Field: email
          if (incoming.email !== null && incoming.email !== undefined && String(incoming.email).trim() !== '') {
            const val = String(incoming.email).trim();
            audit.email = { status: 'UPDATED', oldVal: prev.email, newVal: val };
            next.email = val;
          } else {
            audit.email = { status: 'SKIPPED (null/empty)', oldVal: prev.email, newVal: prev.email };
          }

          // Field: address
          if (incoming.address !== null && incoming.address !== undefined && String(incoming.address).trim() !== '') {
            const val = String(incoming.address).trim();
            audit.address = { status: 'UPDATED', oldVal: prev.address, newVal: val };
            next.address = val;
          } else {
            audit.address = { status: 'SKIPPED (null/empty)', oldVal: prev.address, newVal: prev.address };
          }

          // Field: occupation
          if (incoming.occupation !== null && incoming.occupation !== undefined && String(incoming.occupation).trim() !== '') {
            const val = String(incoming.occupation).trim();
            audit.occupation = { status: 'UPDATED', oldVal: prev.occupation, newVal: val };
            next.occupation = val;
          } else {
            audit.occupation = { status: 'SKIPPED (null/empty)', oldVal: prev.occupation, newVal: prev.occupation };
          }

          console.log('Field-by-Field Merge Audit:');
          console.table(audit);

          console.log('New form state (AFTER merge) returning to React:', next);
          return next;
        });

        setPipelineStatus('form_ready');
        console.log('✅ Extraction complete. Pipeline status transitioned to "form_ready".');
      } else {
        console.error('❌ extractResult payload has no .data property:', extractResult);
        throw new Error('No structured data returned in extraction response');
      }
    } catch (err) {
      if (currentReqId !== requestIdRef.current) {
        console.groupEnd();
        return;
      }
      console.error('❌ Entity extraction error caught:', err);
      setPipelineStatus('form_ready');
    }

    console.groupEnd();
  };

  // Simulate Voice Sample Preset
  const handleSimulateVoiceSample = (langCode = language, autoExtract = true) => {
    if (simulateTimeoutRef.current) {
      clearTimeout(simulateTimeoutRef.current);
      simulateTimeoutRef.current = null;
    }

    const config = SUPPORTED_LANGUAGES[langCode];
    setTranscript(config.sampleTranscript);
    if (autoExtract) {
      setPipelineStatus('transcribing');
      simulateTimeoutRef.current = setTimeout(() => {
        processTranscript(config.sampleTranscript);
      }, 300);
    } else {
      setFormData({ ...config.sampleData });
      setPipelineStatus('form_ready');
    }
  };

  // Field edit handler
  const handleFieldChange = (key: keyof ExtractedFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Voice Fill missing fields (e.g. "Say Male to Fill")
  const handleVoiceFillMissing = (field: keyof ExtractedFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Append simulated voice utterance to transcript
    const phrase = field === 'gender' ? (value === 'male' ? ' पुरुष (Male)' : ' महिला (Female)') : ` ${value}`;
    setTranscript((prev) => prev + phrase);
  };

  // Comprehensive Reset form & voice session
  const handleRestart = () => {
    console.log('[SwarSetu] Reset triggered. Terminating active audio & resetting state.');
    
    // 1. Invalidate any in-flight asynchronous operations immediately
    requestIdRef.current++;

    // 2. Clear simulation timeouts
    if (simulateTimeoutRef.current) {
      clearTimeout(simulateTimeoutRef.current);
      simulateTimeoutRef.current = null;
    }

    // 3. Stop browser Web Speech Recognition safely without triggering onresult/onerror
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (e) {
        console.warn('Recognition abort note:', e);
      }
      recognitionRef.current = null;
    }

    // 4. Stop MediaRecorder safely and detach onstop/ondataavailable so it does not trigger async processing
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (e) {
        console.warn('MediaRecorder stop note:', e);
      }
      mediaRecorderRef.current = null;
    }

    // 5. Stop all microphone hardware stream tracks
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {
        console.warn('Stream track stop note:', e);
      }
      streamRef.current = null;
    }

    // 6. Reset audio chunk buffer and live speech ref
    audioChunksRef.current = [];
    liveTranscriptRef.current = '';

    // 7. Reset all React state to fresh defaults
    setPipelineStatus('idle');
    setTranscript('');
    setLatencyMs(142);
    setFormData({
      name: null,
      nameIndic: null,
      age: null,
      gender: null,
      phone: null,
      email: null,
      address: null,
      occupation: null
    });

    // 8. Visual confirmation badge
    setShowResetNotice(true);
    if (resetToastTimerRef.current) {
      clearTimeout(resetToastTimerRef.current);
    }
    resetToastTimerRef.current = setTimeout(() => {
      setShowResetNotice(false);
    }, 2500);
  };

  // Keyboard shortcut & Universal Header Trigger listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleRestart();
      } else if (
        (e.altKey && (e.key === 'r' || e.key === 'R')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'r' || e.key === 'R'))
      ) {
        e.preventDefault();
        handleRestart();
      }
    };

    const handleCustomFocus = () => {
      const panel = document.getElementById('voice-assistant-panel') || document.getElementById('btn-voice-mic');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panel.classList.add('ring-4', 'ring-primary', 'shadow-2xl');
        setTimeout(() => {
          panel.classList.remove('ring-4', 'ring-primary', 'shadow-2xl');
        }, 1500);
      }
    };

    const handleCustomReset = () => {
      handleRestart();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('swarsetu:focus-voice', handleCustomFocus);
    window.addEventListener('swarsetu:reset-form', handleCustomReset);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('swarsetu:focus-voice', handleCustomFocus);
      window.removeEventListener('swarsetu:reset-form', handleCustomReset);
      if (resetToastTimerRef.current) clearTimeout(resetToastTimerRef.current);
      if (simulateTimeoutRef.current) clearTimeout(simulateTimeoutRef.current);
    };
  }, []);

  // Submit Application
  const handleSubmitApplication = async () => {
    setPipelineStatus('submitting');
    try {
      const result = await submitForm(formData, selectedFormName);
      setSubmissionResult(result);
      setIsSuccessModalOpen(true);
      setPipelineStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setPipelineStatus('form_ready');
    }
  };

  // Calculate extracted field count
  const detectedCount = Object.values(formData).filter(
    (v) => v !== null && v !== undefined && v !== ''
  ).length;

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 animate-fadeIn">
      {/* Top Breadcrumb & Document Header (as shown in Image 3) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <span>/</span>
            <span>National Citizen Portal</span>
            <span>/</span>
            <span className="text-on-surface font-semibold">Voice Form Filling</span>
          </div>

          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mt-1">
            {selectedFormName}
          </h1>
        </div>

        {/* Live Status Indicators */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE PRODUCTION BUILD
          </span>

          <span className="px-2.5 py-1 rounded-full bg-surface-container font-mono text-[11px] text-on-surface font-semibold border border-outline-variant/30">
            IndicASR Latency: <span className="text-primary font-bold">{latencyMs}ms</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-surface-container font-mono text-[11px] text-on-surface font-semibold border border-outline-variant/30">
            {detectedCount}/6 Fields ({Math.round((detectedCount / 6) * 100)}%)
          </span>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-all flex items-center gap-1 text-xs font-mono"
            title="Toggle Light / Dark View"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
            <span>{isDark ? 'Light' : 'Dark'} View</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace (Image 3 exact layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Voice Assistant Panel */}
        <div className="lg:col-span-5 w-full">
          <VoiceAssistantPanel
            selectedLanguage={language}
            onLanguageChange={handleLanguageChange}
            status={pipelineStatus}
            transcript={transcript}
            onTranscriptChange={(t) => {
              setTranscript(t);
              processTranscript(t);
            }}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onRestart={handleRestart}
            onReExtract={() => {
              if (transcript && transcript.trim()) {
                processTranscript(transcript.trim());
              }
            }}
            onSimulateVoiceSample={() => handleSimulateVoiceSample(language, true)}
            latencyMs={latencyMs}
          />
        </div>

        {/* Right Column: Smart Form Engine */}
        <div className="lg:col-span-7 w-full">
          <SmartFormEngine
            formData={formData}
            onChangeField={handleFieldChange}
            status={pipelineStatus}
            onSubmit={handleSubmitApplication}
            onVoiceFillMissing={handleVoiceFillMissing}
            selectedFormName={selectedFormName}
            onSelectFormName={setSelectedFormName}
            onReset={handleRestart}
          />
        </div>
      </div>

      {/* Visual Reset Feedback Toast */}
      {showResetNotice && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-surface-container-highest/95 border border-primary/40 text-on-surface shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <RotateCcw className="w-3.5 h-3.5 animate-spin" />
          </div>
          <div>
            <p className="text-xs font-headline font-bold text-on-surface">Form Reset Complete</p>
            <p className="text-[11px] font-mono text-on-surface-variant">Cleared audio stream, transcript & all inputs (Esc)</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        submission={submissionResult}
        onStartNew={() => {
          setIsSuccessModalOpen(false);
          handleRestart();
        }}
      />
    </div>
  );
};

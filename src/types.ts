/**
 * Core TypeScript definitions for SwarSetu Multilingual Voice-to-Form Platform
 */

export type IndicLanguageCode = 'auto' | 'hi-IN' | 'en-IN' | 'mr-IN' | 'bn-IN' | 'ta-IN' | 'te-IN' | 'gu-IN' | 'kn-IN';

export interface IndicLanguageConfig {
  code: IndicLanguageCode;
  shortCode: string;
  name: string;
  nativeName: string;
  script: string;
  speakers: string;
  status: string;
  conformerModel: string;
  samplePrompt: string;
  sampleTranscript: string;
  sampleData: ExtractedFormData;
}

export interface ExtractedFormData {
  name: string | null;
  nameIndic?: string | null;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  phone: string | null;
  email?: string | null;
  address: string | null;
  occupation: string | null;
  serviceCategory?: string | null;
}

export type FieldVerificationState = 'ai-detected' | 'verified' | 'needs-review' | 'unfilled';

export interface FieldMeta {
  key: keyof ExtractedFormData;
  label: string;
  labelIndic: string;
  iconName: string;
  required: boolean;
  type: 'text' | 'number' | 'radio' | 'tel' | 'email';
  placeholder: string;
  extractedFromSnippet?: string;
}

export type AudioPipelineStatus =
  | 'idle'
  | 'recording'
  | 'processing_audio'
  | 'transcribing'
  | 'extracting'
  | 'form_ready'
  | 'submitting'
  | 'success'
  | 'error';

export interface TelemetryMetrics {
  asrLatencyMs: number;
  acousticClarityPercent: number;
  engine: string;
  stepTimings: {
    audioBufferMs: number;
    speechRecognitionMs: number;
    entityExtractionMs: number;
    schemaValidationMs: number;
  };
}

export interface TranscriptionResponse {
  success: boolean;
  transcript: string;
  originalTranscript?: string;
  language: IndicLanguageCode;
  detectedLanguage?: string;
  engine?: string;
  latencyMs?: number;
  clarityScore?: number;
  error?: string;
  isDemo?: boolean;
}

export interface ExtractionResponse {
  success: boolean;
  data: ExtractedFormData;
  detectedFieldsCount: number;
  missingFields: string[];
  latencyMs?: number;
  error?: string;
}

export interface SubmissionResponse {
  success: boolean;
  submissionId: string;
  timestamp: string;
  applicant: ExtractedFormData;
  telemetry: TelemetryMetrics;
  formId: string;
  message?: string;
}

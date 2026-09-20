import React from 'react';
import { AudioPipelineStatus } from '../types';
import { CheckCircle2, Loader2, Clock, Circle } from 'lucide-react';

interface TelemetryStepperProps {
  status: AudioPipelineStatus;
  latencyMs?: number;
}

export const TelemetryStepper: React.FC<TelemetryStepperProps> = ({
  status,
  latencyMs = 142
}) => {
  const steps = [
    {
      id: 1,
      name: 'Voice captured',
      detail: '16kHz audio buffer',
      isComplete: ['processing_audio', 'transcribing', 'extracting', 'form_ready', 'submitting', 'success'].includes(status),
      isActive: status === 'recording' || status === 'processing_audio',
      time: '0.04s'
    },
    {
      id: 2,
      name: 'Speech recognized',
      detail: 'IndicConformer-v2',
      isComplete: ['extracting', 'form_ready', 'submitting', 'success'].includes(status),
      isActive: status === 'transcribing',
      time: `${(latencyMs / 1000).toFixed(2)}s`
    },
    {
      id: 3,
      name: 'Extracting entities & schema mapping',
      detail: status === 'extracting' ? 'Parsing...' : 'Zero-hallucination mapped',
      isComplete: ['form_ready', 'submitting', 'success'].includes(status),
      isActive: status === 'extracting',
      time: '0.08s'
    },
    {
      id: 4,
      name: 'Form validation & verification',
      detail: ['form_ready', 'submitting', 'success'].includes(status) ? 'Schema validated' : 'Pending',
      isComplete: ['form_ready', 'submitting', 'success'].includes(status),
      isActive: status === 'form_ready',
      time: '0.02s'
    }
  ];

  return (
    <div className="space-y-2.5 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 font-mono text-[11px] text-on-surface-variant font-medium">
        <span>Inference Telemetry Pipeline</span>
        <span className="text-primary font-semibold">Latency: {latencyMs}ms</span>
      </div>

      <div className="space-y-2 font-mono">
        {steps.map((step) => {
          return (
            <div
              key={step.id}
              className={`flex items-center justify-between py-1 px-2 rounded-lg transition-colors ${
                step.isActive
                  ? 'bg-primary/5 text-primary font-semibold'
                  : step.isComplete
                  ? 'text-on-surface'
                  : 'text-on-surface-variant/60'
              }`}
            >
              <div className="flex items-center gap-2">
                {step.isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-tertiary shrink-0" />
                ) : step.isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-outline-variant shrink-0" />
                )}
                <div>
                  <div className="text-[12px] leading-tight">{step.name}</div>
                  <div className="text-[10px] text-on-surface-variant">{step.detail}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono">
                {step.isComplete ? (
                  <span className="text-tertiary font-bold">OK {step.time}</span>
                ) : step.isActive ? (
                  <span className="text-primary animate-pulse">Running...</span>
                ) : (
                  <span className="text-outline-variant">Pending</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

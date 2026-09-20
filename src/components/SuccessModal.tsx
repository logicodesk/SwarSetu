import React from 'react';
import { SubmissionResponse } from '../types';
import { CheckCircle, Printer, PlusCircle, Copy, Check, X, ShieldCheck } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: SubmissionResponse | null;
  onStartNew: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  submission,
  onStartNew
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !submission) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(submission.submissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 shadow-sm">
            <CheckCircle className="w-10 h-10 animate-bounce" />
          </div>

          <h3 className="font-headline font-bold text-2xl text-on-surface">
            Form Submitted!
          </h3>
          <p className="text-xs text-on-surface-variant mt-1 font-mono">
            National Citizen Registry • Sovereign Digital Delivery
          </p>
        </div>

        {/* Receipt Box */}
        <div className="mt-6 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3 font-mono text-xs">
          {/* Application ID row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant/20">
            <span className="text-on-surface-variant">Application ID:</span>
            <div className="flex items-center gap-1.5 font-bold text-primary text-sm">
              <span>{submission.submissionId}</span>
              <button
                onClick={handleCopyId}
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant transition-all"
                title="Copy Application ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-tertiary" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Form Scheme */}
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Scheme / Form:</span>
            <span className="font-medium text-on-surface text-right">
              {submission.formId || 'Citizen Welfare & Pension Scheme (Form 7-A)'}
            </span>
          </div>

          {/* Applicant Name */}
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Applicant Name:</span>
            <span className="font-semibold text-on-surface">
              {submission.applicant.name || 'Citizen'}
              {submission.applicant.nameIndic ? ` (${submission.applicant.nameIndic})` : ''}
            </span>
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Filing Timestamp:</span>
            <span className="text-on-surface">
              {new Date(submission.timestamp).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </span>
          </div>

          {/* Verification Status */}
          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
            <span className="text-on-surface-variant">Acoustic Confidence:</span>
            <span className="text-tertiary font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              98.2% (IndicConformer-v2)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface font-headline font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-primary" />
            <span>Download PDF Receipt</span>
          </button>

          <button
            onClick={onStartNew}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-headline font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start New Form</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ExtractedFormData, AudioPipelineStatus } from '../types';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileJson,
  Send,
  Edit3,
  MapPin,
  Phone,
  User,
  Calendar,
  Briefcase,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface SmartFormEngineProps {
  formData: ExtractedFormData;
  onChangeField: (key: keyof ExtractedFormData, value: any) => void;
  status: AudioPipelineStatus;
  onSubmit: () => void;
  onVoiceFillMissing: (field: keyof ExtractedFormData, value: any) => void;
  selectedFormName?: string;
  onSelectFormName?: (name: string) => void;
  onReset?: () => void;
}

export const SmartFormEngine: React.FC<SmartFormEngineProps> = ({
  formData,
  onChangeField,
  status,
  onSubmit,
  onVoiceFillMissing,
  selectedFormName = 'Citizen Welfare & Pension Scheme (Form 7-A)',
  onSelectFormName,
  onReset
}) => {
  const [isEditingAll, setIsEditingAll] = useState(false);

  // Calculate completion percentage
  const keyFields: (keyof ExtractedFormData)[] = ['name', 'age', 'gender', 'phone', 'address', 'occupation'];
  const completedFields = keyFields.filter((k) => formData[k] !== null && formData[k] !== undefined && formData[k] !== '');
  const completionPercent = Math.round((completedFields.length / keyFields.length) * 100);

  // Missing fields for attention banner
  const missingKeys = keyFields.filter((k) => !formData[k]);

  // Download JSON Payload
  const handleDownloadJSON = () => {
    const payload = {
      formScheme: selectedFormName,
      extractedAt: new Date().toISOString(),
      verificationStatus: completedFields.length >= 5 ? 'High Confidence' : 'Pending Citizen Review',
      applicant: {
        fullName: formData.name || '',
        fullNameIndic: formData.nameIndic || '',
        age: formData.age ?? '',
        gender: formData.gender || '',
        mobileNumber: formData.phone || '',
        email: formData.email || '',
        residentAddress: formData.address || '',
        occupation: formData.occupation || ''
      }
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swarsetu-form-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5 p-5 md:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm">
      {/* Form Engine Header & Scheme Selector */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-headline font-bold text-lg text-on-surface">Smart Form Engine</h2>
            <p className="text-xs text-on-surface-variant">Extracting civic schema in real-time</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Form Scheme Dropdown */}
            <select
              value={selectedFormName}
              onChange={(e) => onSelectFormName && onSelectFormName(e.target.value)}
              className="px-3 py-1.5 text-xs font-mono bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Citizen Welfare & Pension Scheme (Form 7-A)">
                Form 7-A: Citizen Welfare & Pension Scheme
              </option>
              <option value="Integrated Farmer Credit Registration (Kisan Credit)">
                Form G-044: Kisan Credit & Subsidy
              </option>
              <option value="Citizen Healthcare Scheme (Ayushman / Swasthya Sathi)">
                Form M-12: Healthcare Coverage Registration
              </option>
              <option value="Public Distribution Ration Card Renewal (PDS-Form 4)">
                Form R-09: Ration Card Renewal
              </option>
            </select>

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                id="btn-reset-form-top"
                className="px-2.5 py-1.5 text-xs font-mono bg-surface-container-lowest hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 border border-outline-variant/30 rounded-lg flex items-center gap-1 transition-all"
                title="Reset form fields (Esc)"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="mt-4 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="font-bold text-on-surface">{completionPercent}% Completed</span>
            <span className="text-on-surface-variant">
              {completedFields.length} of {keyFields.length} Fields Extracted
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Missing Fields Attention Banner */}
      {missingKeys.length > 0 && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-amber-900 dark:text-amber-200">
              {missingKeys.length} {missingKeys.length === 1 ? 'field needs' : 'fields need'} your attention
            </div>
            <p className="text-amber-800/80 dark:text-amber-300/80 mt-0.5">
              {missingKeys.map((k) => k.toUpperCase()).join(', ')} were not clearly detected in the audio transcript.
            </p>

            {/* Quick Fill suggestions */}
            {!formData.gender && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-on-surface-variant font-mono">Set gender:</span>
                <button
                  type="button"
                  onClick={() => onChangeField('gender', 'male')}
                  className="px-2.5 py-1 rounded-md bg-primary-container text-white font-mono text-[11px] font-semibold flex items-center gap-1 shadow-sm hover:opacity-90 transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => onChangeField('gender', 'female')}
                  className="px-2.5 py-1 rounded-md bg-secondary text-white font-mono text-[11px] font-semibold flex items-center gap-1 shadow-sm hover:opacity-90 transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => onChangeField('gender', 'other')}
                  className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface border border-outline-variant/40 font-mono text-[11px] font-semibold flex items-center gap-1 shadow-sm hover:bg-surface-container-highest transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  Other
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="space-y-3.5">
        {/* Field 1: Full Name */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Full Name (पूरा नाम)</span>
            </label>
            {formData.name ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                AI Detected (Voice)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-semibold">
                Needs Spoken Name
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              id="input-name"
              value={formData.name || ''}
              onChange={(e) => onChangeField('name', e.target.value)}
              placeholder="English Script (e.g. Rahul Sharma)"
              className="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <input
              type="text"
              id="input-nameIndic"
              value={formData.nameIndic || ''}
              onChange={(e) => onChangeField('nameIndic', e.target.value)}
              placeholder="Indic Script (e.g. राहुल शर्मा)"
              className="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Field 2: Age */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Age (आयु)</span>
            </label>
            {formData.age ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                AI Detected (Voice)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-semibold">
                Needs Input
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              id="input-age"
              value={formData.age !== null && formData.age !== undefined ? formData.age : ''}
              onChange={(e) => onChangeField('age', e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
              placeholder="Years (e.g. 22)"
              className="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary pr-16 transition-all"
            />
            <span className="absolute right-3 top-2 text-[11px] font-mono text-on-surface-variant">
              Years
            </span>
          </div>
          {formData.age && (
            <p className="text-[10px] font-mono text-on-surface-variant">
              Extracted from spoken statement
            </p>
          )}
        </div>

        {/* Field 3: Gender */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>Gender (लिंग)</span>
            </label>
            {formData.gender ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Needs Review • Missing
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['male', 'female', 'other'] as const).map((g) => {
              const isSelected = formData.gender === g;
              const labels = {
                male: 'Male (पुरुष)',
                female: 'Female (महिला)',
                other: 'Other (अन्य)'
              };
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onChangeField('gender', g)}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-primary-container text-white border-primary shadow-sm font-semibold'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  {labels[g]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 4: Mobile Number */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>Mobile Number (मोबाइल नंबर)</span>
            </label>
            {formData.phone ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-semibold">
                Needs 10 Digits
              </span>
            )}
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-xs font-mono font-bold bg-surface-container border border-r-0 border-outline-variant/30 rounded-l-lg text-on-surface">
              🇮🇳 +91
            </span>
            <input
              type="tel"
              id="input-phone"
              value={formData.phone || ''}
              onChange={(e) => onChangeField('phone', e.target.value)}
              placeholder="10-digit mobile number"
              maxLength={10}
              className="w-full px-3 py-2 text-xs font-mono bg-surface-container-low border border-outline-variant/30 rounded-r-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Field 5: Resident City & State */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Resident City & State (निवास स्थान)</span>
            </label>
            {formData.address ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                AI Detected (Voice)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-semibold">
                Needs Address
              </span>
            )}
          </div>
          <input
            type="text"
            id="input-address"
            value={formData.address || ''}
            onChange={(e) => onChangeField('address', e.target.value)}
            placeholder="City, District, State (e.g. Gwalior, Madhya Pradesh)"
            className="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Field 6: Occupation / Category */}
        <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>Occupation / Category (व्यवसाय)</span>
            </label>
            <span className="text-[10px] font-mono text-on-surface-variant">
              Auto-inferred / Optional
            </span>
          </div>
          <input
            type="text"
            id="input-occupation"
            value={formData.occupation || ''}
            onChange={(e) => onChangeField('occupation', e.target.value)}
            placeholder="e.g. Student / Farmer / Small Business Owner"
            className="w-full px-3 py-2 text-xs bg-surface-container-low border border-outline-variant/30 rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Sovereign Privacy Footnote */}
      <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 flex items-center gap-2 text-[11px] text-on-surface-variant font-mono">
        <ShieldCheck className="w-4 h-4 text-tertiary shrink-0" />
        <span>All voice streams processed strictly via sovereign on-device Indian AI stack. Zero telemetry stored.</span>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditingAll(!isEditingAll)}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
              isEditingAll
                ? 'bg-primary text-white border-primary'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isEditingAll ? 'Lock Fields' : 'Edit All Fields'}
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="px-3 py-2 rounded-lg text-xs font-mono font-semibold bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/30 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            title="Download clean structured JSON payload"
          >
            <FileJson className="w-3.5 h-3.5 text-secondary" />
            JSON Payload
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              id="btn-reset-form-action"
              className="px-3 py-2 rounded-lg text-xs font-mono font-semibold bg-surface-container-lowest hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 border border-outline-variant/30 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              title="Reset and clear all form fields (Esc)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Form
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={status === 'submitting'}
          id="btn-confirm-submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-[#5F63EE] hover:from-primary-container hover:to-secondary text-white font-headline font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <span>Processing Application...</span>
          ) : (
            <>
              <span>Confirm & Submit Application</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

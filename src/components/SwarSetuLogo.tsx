import React from 'react';

interface SwarSetuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const SwarSetuLogo: React.FC<SwarSetuLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-[17px]',
    md: 'text-[21px]',
    lg: 'text-[26px]'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Vector Icon matching official SwarSetu Brand mark */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#2547D0] to-[#5F63EE] flex items-center justify-center p-1.5 shadow-sm text-white shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Top Head/Dot for Voice & Citizen */}
          <circle cx="50" cy="24" r="5" fill="currentColor" />
          {/* Left Pillar */}
          <line x1="33" y1="46" x2="33" y2="60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {/* Center Pillar */}
          <line x1="50" y1="36" x2="50" y2="66" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {/* Right Pillar */}
          <line x1="67" y1="46" x2="67" y2="60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {/* Bridge / Arch ("Setu") */}
          <path
            d="M20 70C30 54 70 54 80 70"
            stroke="currentColor"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center tracking-tight font-headline font-bold select-none">
          <span className={`${textSizes[size]} text-on-surface`}>Swar</span>
          <span className={`${textSizes[size]} text-[#4648d4] dark:text-[#818cf8]`}>Setu</span>
        </div>
      )}
    </div>
  );
};

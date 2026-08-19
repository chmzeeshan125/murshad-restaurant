import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  branchName?: string;
  className?: string;
  variant?: 'full' | 'compact' | 'badge';
  id?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  branchName,
  className = '',
  variant = 'full',
  id = 'murshad-brand-logo',
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Check if user uploaded a custom logo into localStorage or public assets
    const saved = localStorage.getItem('murshad_custom_logo');
    if (saved) {
      setCustomLogoUrl(saved);
    }
  }, []);

  const sizeClasses = {
    sm: {
      emblem: 'w-10 h-10',
      title: 'text-lg',
      sub: 'text-[9px]',
      branch: 'text-[10px]',
    },
    md: {
      emblem: 'w-13 h-13',
      title: 'text-2xl',
      sub: 'text-[10px]',
      branch: 'text-xs',
    },
    lg: {
      emblem: 'w-18 h-18',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-xs',
      branch: 'text-sm',
    },
    xl: {
      emblem: 'w-24 h-24 sm:w-28 sm:h-28',
      title: 'text-4xl sm:text-5xl',
      sub: 'text-sm',
      branch: 'text-base',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div id={id} className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon / Portrait Frame */}
      <div
        className={`relative ${currentSize.emblem} rounded-full bg-neutral-900 border border-red-600/80 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)] shrink-0 group overflow-hidden`}
      >
        {customLogoUrl && !imgError ? (
          <img
            src={customLogoUrl}
            alt="Murshad Restaurant Official Logo"
            className="w-full h-full object-contain rounded-full"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Faithful Emblem with Murshad portrait silhouette & Red accents */
          <div className="w-full h-full rounded-full bg-black border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Subtle red accent glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/60 via-transparent to-red-900/20" />
            
            {/* Elegant Portrait Silhouette of Murshad */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-1 drop-shadow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer decorative ring */}
              <circle cx="50" cy="50" r="46" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Portrait Silhouette (Traditional turban/headwear & noble profile) */}
              <path
                d="M50 20 C42 20, 36 26, 36 34 C36 40, 40 45, 45 47 C40 50, 33 55, 30 63 C28 68, 28 78, 28 80 L72 80 C72 78, 72 68, 70 63 C67 55, 60 50, 55 47 C60 45, 64 40, 64 34 C64 26, 58 20, 50 20 Z"
                fill="#EDEDED"
              />
              {/* Turban drapery accent */}
              <path
                d="M38 28 C42 23, 58 23, 62 28 C56 31, 44 31, 38 28 Z"
                fill="#DC2626"
              />
              {/* Beard / Collar line */}
              <path
                d="M44 42 C47 45, 53 45, 56 42 C54 48, 46 48, 44 42 Z"
                fill="#171717"
              />
              {/* Star / Crest Motif */}
              <circle cx="50" cy="14" r="2.5" fill="#EF4444" />
            </svg>
          </div>
        )}
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border border-black shadow" />
      </div>

      {/* Typography Section */}
      {variant !== 'badge' && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold font-serif tracking-widest text-white uppercase ${currentSize.title} drop-shadow-sm`}
            >
              MURSHAD
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`font-bold tracking-[0.3em] text-red-500 uppercase ${currentSize.sub}`}
              >
                RESTAURANT
              </span>
              <span className="w-1 h-1 bg-white/30 rounded-full inline-block" />
              <span className={`tracking-widest text-white/40 uppercase font-medium ${currentSize.sub}`}>
                PAKISTAN
              </span>
            </div>
          )}

          {branchName && (
            <div className="mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-white/10 text-white/80 font-semibold uppercase tracking-widest ${currentSize.branch}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                {branchName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

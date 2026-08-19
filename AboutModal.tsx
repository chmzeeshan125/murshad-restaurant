import React from 'react';
import { BranchInfo } from '../types';
import { ShieldCheck, Flame, HeartHandshake, Clock, X, Sparkles, MapPin } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: BranchInfo;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
}) => {
  if (!isOpen) return null;

  const values = [
    {
      icon: Flame,
      title: 'Traditional Charcoal & Handi',
      desc: 'Authentic clay handis, fresh whole spices, and live charcoal embers for unmatched smoky taste.',
    },
    {
      icon: ShieldCheck,
      title: '100% Halal & Fresh Daily',
      desc: 'Strict halal-certified cuts, organic desi poultry, and pure ingredients prepared hygienically.',
    },
    {
      icon: Clock,
      title: '24/7 Welcoming Hospitality',
      desc: 'Open round the clock every day for families, tour travelers, and late-night highway diners.',
    },
    {
      icon: HeartHandshake,
      title: 'Family Dining Environment',
      desc: 'Spacious private halls, comfortable table seating, and polite staff for special gatherings.',
    },
  ];

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white border border-white/10 hover:bg-white/10 transition"
          aria-label="Close Story"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3 h-3 text-red-500" />
          The Murshad Tradition
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-4">
          A True Taste of <span className="text-red-600 italic">Pakistani Heritage</span>
        </h2>

        <div className="space-y-4 text-white/70 text-sm leading-relaxed mb-6 font-light">
          <p>
            At Murshad Restaurant, we believe authentic taste comes from patience, fresh ingredients, and time-honored cooking techniques. From our sizzling <strong className="text-white">Dumba Karahi</strong> and <strong className="text-white">Desi Chicken Karahi</strong> to our charcoal-roasted <strong className="text-white">Chicken Piece</strong> and smoky <strong className="text-white">Achari Tikka</strong>, each dish is made fresh to order.
          </p>
          <p>
            Whether visiting our flagship location on the <strong className="text-white">Main G.T. Road in Gujar Khan</strong> (opposite Photohar Qila Marquee) or our <strong className="text-white">Raja Market branch in Kallar Syedan</strong>, you are always welcomed with hot food, tea, and warm Pakistani hospitality, 24 hours a day, 7 days a week.
          </p>
        </div>

        {/* 4 Pillars Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-neutral-900 border border-white/10 flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center shrink-0 text-red-500">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-white mb-1">
                    {val.title}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Close Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            Currently Viewing: {currentBranch.shortName}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};

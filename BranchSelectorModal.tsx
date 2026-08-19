import React from 'react';
import { BranchId, BranchInfo } from '../types';
import { BRANCHES } from '../data/restaurantData';
import { BrandLogo } from './BrandLogo';
import { MapPin, Star, Clock, Phone, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BranchSelectorModalProps {
  isOpen: boolean;
  onSelectBranch: (branchId: BranchId) => void;
  currentBranchId?: BranchId | null;
  onClose?: () => void;
  isInitialSelection?: boolean;
}

export const BranchSelectorModal: React.FC<BranchSelectorModalProps> = ({
  isOpen,
  onSelectBranch,
  currentBranchId,
  onClose,
  isInitialSelection = false,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="branch-selector-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl my-auto bg-[#0A0A0A] border border-white/10 rounded-none shadow-2xl overflow-hidden p-6 sm:p-10"
        >
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-red-700" />

          {/* Close button if user just opened change branch and already has a selected branch */}
          {!isInitialSelection && onClose && (
            <button
              id="close-branch-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 text-white/40 hover:text-white p-2 border border-white/10 hover:bg-white/10 transition"
              aria-label="Close branch selector"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10 pt-2">
            <div className="flex justify-center mb-5">
              <BrandLogo size="lg" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              <Sparkles className="w-3 h-3 text-red-500" />
              Authentic Pakistani Cuisine • Open 24/7
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Welcome to <span className="text-red-600 italic">Murshad</span>
            </h1>
            <p className="mt-2 text-white/40 text-xs sm:text-sm tracking-widest uppercase font-medium">
              Experience the finest flavors of Pakistan — Select Your Destination
            </p>
          </div>

          {/* Branches Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Branch 1 — Gujar Khan */}
            <BranchCard
              branch={BRANCHES['gujar-khan']}
              branchNumber="Branch 01"
              isSelected={currentBranchId === 'gujar-khan'}
              onSelect={() => onSelectBranch('gujar-khan')}
              badge="Main G.T. Road"
            />

            {/* Branch 2 — Kallar Syedan */}
            <BranchCard
              branch={BRANCHES['kallar-syedan']}
              branchNumber="Branch 02"
              isSelected={currentBranchId === 'kallar-syedan'}
              onSelect={() => onSelectBranch('kallar-syedan')}
              badge="Raja Market"
            />
          </div>

          {/* Trust badges footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[10px] text-white/40 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>100% Halal Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              <span>Open 24 Hours / 7 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span>Family Hall & Valet Parking</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface BranchCardProps {
  branch: BranchInfo;
  branchNumber: string;
  isSelected: boolean;
  onSelect: () => void;
  badge: string;
}

const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  branchNumber,
  isSelected,
  onSelect,
  badge,
}) => {
  return (
    <div
      id={`branch-card-${branch.id}`}
      onClick={onSelect}
      className={`group relative bg-neutral-900 border overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.25)]'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Visual Banner with Dark Typography Accent */}
      <div className="h-36 bg-neutral-800/90 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-5xl font-serif italic select-none">
          {branch.city}
        </div>
        <div className="absolute top-3 left-4 z-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">
            {branchNumber}
          </span>
        </div>
        <div className="absolute top-3 right-4 z-20">
          <span className="px-2.5 py-0.5 border border-white/15 bg-black/60 text-white/70 text-[10px] uppercase tracking-wider font-medium">
            {badge}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 relative z-20 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-2xl font-serif text-white mb-1 group-hover:text-red-500 transition-colors">
                {branch.name}
              </h2>
              <p className="text-white/50 text-xs leading-relaxed max-w-[280px] italic">
                {branch.address}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1 text-red-500 font-bold text-sm">
                <span>{branch.googleRating.toFixed(1)}</span>
                <span className="text-[11px]">★</span>
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">
                {branch.reviewCount}+ Reviews
              </div>
            </div>
          </div>

          {/* Left-bordered Metrics */}
          <div className="grid grid-cols-2 gap-4 my-5">
            <div className="border-l-2 border-red-600 pl-3">
              <div className="text-[10px] text-white/40 uppercase tracking-tighter">Operating Hours</div>
              <div className="text-xs font-bold text-white">Open 24/7</div>
            </div>
            <div className="border-l-2 border-red-600 pl-3">
              <div className="text-[10px] text-white/40 uppercase tracking-tighter">Est. Price</div>
              <div className="text-xs font-bold text-white">{branch.pricePerPerson}</div>
            </div>
          </div>

          {/* Known Signature Specialties */}
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">
              Signature Specialties:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {branch.knownDishes.slice(0, 4).map((dish, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 border border-white/10 bg-black/40 text-white/70 text-[11px] font-medium"
                >
                  {dish}
                </span>
              ))}
              {branch.knownDishes.length > 4 && (
                <span className="px-2 py-0.5 text-white/40 text-[10px]">
                  +{branch.knownDishes.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2.5">
          <button
            id={`select-${branch.id}-btn`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.25)] flex items-center justify-center gap-1.5"
          >
            <span>Enter Branch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={branch.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-3 border border-white/20 hover:bg-white hover:text-black text-white/70 hover:text-black text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center"
            title="Open in Google Maps"
          >
            <MapPin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

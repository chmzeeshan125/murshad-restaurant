import React from 'react';
import { BranchInfo } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Flame, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  currentBranch: BranchInfo;
  onOpenFullStory: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentBranch,
  onOpenFullStory,
}) => {
  return (
    <section id="about" className="py-12 sm:py-16 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 2-3 Line Compact Introduction */}
          <div className="lg:col-span-8 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-red-500" />
              Heritage & Hospitality
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              Authentic Flavors, <span className="text-red-600 italic">24 Hours a Day</span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl">
              Murshad Restaurant is Pakistan&apos;s celebrated home for traditional Dumba Karahi, organic Desi Chicken, live charcoal BBQ, hot soups, and stone-oven pizzas across Gujar Khan (Main G.T. Road) and Kallar Syedan (Raja Market).
            </p>

            {/* Compact Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-white/50">
              <span className="flex items-center gap-1.5 text-white/80">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                100% Halal Food
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4" />
                Open 24/7 Always
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <HeartHandshake className="w-4 h-4 text-red-500" />
                Family-Friendly Dining
              </span>
            </div>
          </div>

          {/* Action to View Detailed Story */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              id="read-full-about-btn"
              onClick={onOpenFullStory}
              className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-white/15 hover:border-red-600 text-white font-serif font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 group shadow-lg"
            >
              <span>Our Story & Values</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

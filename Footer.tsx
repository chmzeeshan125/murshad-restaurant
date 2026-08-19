import React from 'react';
import { BranchInfo } from '../types';
import { BRANCHES } from '../data/restaurantData';
import { BrandLogo } from './BrandLogo';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ShieldCheck,
  Repeat,
  ChevronUp,
  Heart,
} from 'lucide-react';

interface FooterProps {
  currentBranch: BranchInfo;
  onSelectBranch: (branchId: 'gujar-khan' | 'kallar-syedan') => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentBranch,
  onSelectBranch,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white/70 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Branding & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-md pt-2">
              Murshad Restaurant is Pakistan&apos;s celebrated home for authentic Dumba Karahi, Desi Chicken, charcoal BBQ, hot soups, and pizzas. Proudly operating 24 hours a day, 7 days a week in Gujar Khan & Kallar Syedan.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>100% Halal Food</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Open 24/7 Always</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/40">
              <li>
                <a href="#about" className="hover:text-red-400 transition">About Murshad Restaurant</a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-red-400 transition">Signature Specialties</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-red-400 transition">Explore Branch Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-red-400 transition">Photo Gallery & Ambience</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-red-400 transition">Google Verified Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-red-400 transition">Google Maps & Directions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-red-400 transition">Table Booking & Helpline</a>
              </li>
            </ul>
          </div>

          {/* Branch Direct Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-serif">
              Switch Branch View
            </h4>
            
            <div className="space-y-2.5">
              {/* Branch 1 */}
              <button
                onClick={() => onSelectBranch('gujar-khan')}
                className={`w-full p-3 border text-left transition flex items-center justify-between ${
                  currentBranch.id === 'gujar-khan'
                    ? 'bg-neutral-900 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)] text-white'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-white/10 text-white/50 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 block">Branch 01</span>
                  <span className="text-xs font-serif font-bold block text-white">Gujar Khan (Main G.T. Road)</span>
                  <span className="text-[11px] text-white/40">4.1 ★ (628+ Reviews)</span>
                </div>
                {currentBranch.id === 'gujar-khan' && (
                  <span className="text-[10px] px-2 py-0.5 bg-red-600 text-white font-bold uppercase tracking-widest">Active</span>
                )}
              </button>

              {/* Branch 2 */}
              <button
                onClick={() => onSelectBranch('kallar-syedan')}
                className={`w-full p-3 border text-left transition flex items-center justify-between ${
                  currentBranch.id === 'kallar-syedan'
                    ? 'bg-neutral-900 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)] text-white'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-white/10 text-white/50 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 block">Branch 02</span>
                  <span className="text-xs font-serif font-bold block text-white">Kallar Syedan (Raja Market)</span>
                  <span className="text-[11px] text-white/40">4.1 ★ (13+ Reviews)</span>
                </div>
                {currentBranch.id === 'kallar-syedan' && (
                  <span className="text-[10px] px-2 py-0.5 bg-red-600 text-white font-bold uppercase tracking-widest">Active</span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Both Branches Full Info Directory */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/10 text-xs">
          {/* Gujar Khan Details */}
          <div className="p-4 bg-neutral-900 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-white text-sm">Murshad Restaurant — Gujar Khan</span>
              <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">24/7 Open</span>
            </div>
            <p className="text-white/50">
              Main G.T. Road, opposite Photohar Qila Marquee, Gujar Khan, 47850, Pakistan
            </p>
            <p className="text-white/70">
              Phone: <strong className="text-white">0330 3249111</strong> • Rating: <span className="text-red-500 font-bold">4.1 ★</span> (628+ Reviews)
            </p>
          </div>

          {/* Kallar Syedan Details */}
          <div className="p-4 bg-neutral-900 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-white text-sm">Murshad Restaurant — Kallar Syedan</span>
              <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider">24/7 Open</span>
            </div>
            <p className="text-white/50">
              Kallar Syedan Road, Raja Market, Pakistan
            </p>
            <p className="text-white/70">
              Phone: <strong className="text-white">0330 3249111</strong> • Rating: <span className="text-red-500 font-bold">4.1 ★</span> (13+ Reviews)
            </p>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            <p>© {new Date().getFullYear()} Murshad Restaurant. All Rights Reserved.</p>
            <p className="text-[11px] text-white/30 mt-0.5">
              Production-ready official website • Compatible with GitHub & Netlify.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white/70 hover:text-black uppercase text-[10px] tracking-widest font-bold transition"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

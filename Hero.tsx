import React from 'react';
import { BranchInfo } from '../types';
import {
  MapPin,
  Star,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Utensils,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  branch: BranchInfo;
  onChangeBranchClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ branch, onChangeBranchClick }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-[#0A0A0A]">
      {/* Cinematic Dark Background with Subtle Red Ambient Radial Glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${branch.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/95" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Main Hero Information Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Branch Selector & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Active Branch Pill */}
              <button
                id="hero-branch-badge-btn"
                onClick={onChangeBranchClick}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 border border-white/10 hover:border-red-600 text-white/80 text-[10px] font-bold uppercase tracking-widest transition"
              >
                <span className="w-1.5 h-1.5 bg-red-600 animate-pulse" />
                <span>{branch.name}</span>
                <span className="text-white/40 group-hover:text-red-500 transition">⇄ Switch</span>
              </button>

              {/* 24/7 Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Open 24/7 Always</span>
              </div>

              {/* Google Verified Rating Badge */}
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-white/10 text-white/80 text-[10px] font-bold hover:border-amber-500/50 transition uppercase tracking-wider"
              >
                <Star className="w-3 h-3 fill-red-500 text-red-500" />
                <span className="text-red-500 font-bold">{branch.googleRating.toFixed(1)}</span>
                <span className="text-white/40">({branch.reviewCount} Reviews)</span>
              </a>
            </div>

            {/* Bold Serif Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                Pure Authentic Taste at{' '}
                <span className="text-red-600 italic">
                  Murshad Restaurant
                </span>
              </h1>
              <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {branch.description}
              </p>
            </div>

            {/* Address & Quick Info Banner */}
            <div className="p-5 bg-neutral-900 border border-white/10 space-y-3">
              <div className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">{branch.address}</span>
                  <span className="block text-xs text-white/40 mt-0.5 italic">{branch.landmark}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div className="border-l-2 border-red-600 pl-3">
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Price Per Person</div>
                  <div className="text-xs font-bold text-white">{branch.pricePerPerson}</div>
                </div>
                <div className="border-l-2 border-red-600 pl-3">
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Dining Services</div>
                  <div className="text-xs font-bold text-white">Dine-in • Takeaway • 24/7</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Menu Button */}
              <a
                id="hero-menu-cta"
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Menu</span>
              </a>

              {/* Get Directions Button */}
              <a
                id="hero-directions-cta"
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 hover:bg-white hover:text-black text-white/80 hover:text-black font-bold text-xs uppercase tracking-widest transition-all"
              >
                <Navigation className="w-4 h-4 text-red-500" />
                <span>Get Directions</span>
              </a>

              {/* Call Now */}
              <a
                id="hero-call-cta"
                href={`tel:${branch.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest transition"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call {branch.phoneFormatted}</span>
              </a>

              {/* WhatsApp Button */}
              <a
                id="hero-whatsapp-cta"
                href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20place%20an%20order%20or%20inquire.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-400 font-bold text-xs uppercase tracking-widest transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Known Dishes Ticker */}
            <div className="pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">
                Popular Known Dishes at this Branch:
              </span>
              <div className="flex flex-wrap gap-2">
                {branch.knownDishes.map((dish, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-neutral-900 border border-white/10 text-white/70 text-xs font-medium hover:border-white/20 transition"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Featured Card / Visual Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative bg-neutral-900 border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 block">
                    Official Branch Profile
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {branch.shortName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 bg-red-950/60 border border-red-600/60 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                    24/7 Open
                  </span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 mb-6">
                {branch.features.slice(0, 5).map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-5 h-5 bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3 text-red-500" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Quick Branch Comparison Callout */}
              <div className="p-4 bg-black/60 border border-white/10 mb-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Google Rating:</span>
                  <div className="flex items-center gap-1 font-bold text-red-500">
                    <Star className="w-3.5 h-3.5 fill-red-500" />
                    <span>{branch.googleRating.toFixed(1)} / 5.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Total Google Reviews:</span>
                  <span className="font-semibold text-white">{branch.reviewCount} Verified Reviews</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Price Tier:</span>
                  <span className="font-semibold text-white/80">{branch.pricePerPerson}</span>
                </div>
              </div>

              {/* Switch to Other Branch Quick Action */}
              <button
                onClick={onChangeBranchClick}
                className="w-full py-3 px-4 border border-white/20 hover:bg-white hover:text-black text-white/80 hover:text-black text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Switch to {branch.id === 'gujar-khan' ? 'Kallar Syedan Branch' : 'Gujar Khan Branch'}</span>
                <ChevronRight className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

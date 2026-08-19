import React from 'react';
import { BranchInfo } from '../types';
import {
  Users,
  Car,
  Clock,
  Accessibility,
  Utensils,
  Sparkles,
  ShieldCheck,
  Coffee,
  Heart,
  Baby,
  DoorClosed,
  ShoppingBag,
} from 'lucide-react';

interface FeaturesGridProps {
  branch: BranchInfo;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ branch }) => {
  // Mapping features to descriptive icons
  const getFeatureIcon = (featureName: string) => {
    const lower = featureName.toLowerCase();
    if (lower.includes('parking')) return Car;
    if (lower.includes('family') || lower.includes('groups')) return Users;
    if (lower.includes('kid')) return Baby;
    if (lower.includes('wheelchair') || lower.includes('accessible')) return Accessibility;
    if (lower.includes('private') || lower.includes('room')) return DoorClosed;
    if (lower.includes('halal')) return ShieldCheck;
    if (lower.includes('24') || lower.includes('hour')) return Clock;
    if (lower.includes('happy-hour') || lower.includes('quick')) return Coffee;
    if (lower.includes('takeaway') || lower.includes('delivery')) return ShoppingBag;
    return Utensils;
  };

  return (
    <section id="services" className="py-20 bg-stone-950 border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/50 text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Comfort & Hospitality
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Services & Amenities at <span className="text-red-500">{branch.shortName}</span>
          </h2>
          <p className="mt-2 text-stone-400 text-sm">
            Everything tailored to make your family gathering or road travel dining restful, comfortable, and memorable.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {branch.features.map((feature, idx) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-red-600/60 hover:bg-stone-900 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400 mb-3 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition duration-300 shadow">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition font-display">
                  {feature}
                </h4>
                <span className="text-[11px] text-stone-400 mt-1">
                  Available for all guests
                </span>
              </div>
            );
          })}
        </div>

        {/* Operational Hours Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-black border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Operating Schedule
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                Open 24 Hours / 7 Days a Week
              </h3>
              <p className="text-xs text-stone-400">
                Continuous kitchen service for dine-in, takeaway, and family dining anytime day or night.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${branch.phone}`}
              className="flex-1 md:flex-initial text-center px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow"
            >
              Call Branch Desk
            </a>
            <a
              href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20is%20table%20available%20now?`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial text-center px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition shadow"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

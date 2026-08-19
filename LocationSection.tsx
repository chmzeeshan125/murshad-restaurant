import React, { useState } from 'react';
import { BranchInfo } from '../types';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Phone,
  Clock,
  Car,
  ExternalLink,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

interface LocationSectionProps {
  branch: BranchInfo;
  onChangeBranchClick: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  branch,
  onChangeBranchClick,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(branch.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-14 sm:py-18 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <MapPin className="w-3 h-3 text-red-500" />
              Location & Navigation
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Visit <span className="text-red-600 italic">{branch.shortName}</span>
            </h2>
            <p className="mt-1 text-white/50 text-xs sm:text-sm">
              Easily accessible with spacious parking for families, tour buses, and highway travelers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onChangeBranchClick}
              className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white/80 hover:text-black font-bold text-xs uppercase tracking-widest transition"
            >
              Switch to {branch.id === 'gujar-khan' ? 'Kallar Syedan' : 'Gujar Khan'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Location Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-neutral-900 border border-white/10">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">
                  Branch Destination
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {branch.name}
                </h3>
              </div>

              {/* Full Address Block */}
              <div className="p-4 bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider block">Address</span>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                      {branch.address}
                    </p>
                    <span className="text-[11px] text-white/50 block mt-0.5 italic">
                      {branch.landmark}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <span className="text-[10px] text-white/40 uppercase">
                    Open 24/7
                  </span>
                </div>
              </div>

              {/* Quick Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block">Hours</span>
                  <strong className="text-emerald-400 font-bold block mt-0.5">Open 24/7 Always</strong>
                </div>

                <div className="p-3 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block">Parking</span>
                  <strong className="text-white font-bold block mt-0.5">Free Parking</strong>
                </div>
              </div>

              <div className="p-3 bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block">Branch Desk Line</span>
                  <a href={`tel:${branch.phone}`} className="text-sm font-bold text-white hover:text-red-500 transition">
                    {branch.phoneFormatted}
                  </a>
                </div>
                <a
                  href={`tel:${branch.phone}`}
                  className="p-2 bg-neutral-800 hover:bg-red-600 text-white transition border border-white/10"
                >
                  <Phone className="w-4 h-4 text-red-500 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Actions: Get Directions on Google Maps */}
            <div className="pt-4 mt-4 border-t border-white/10 flex gap-2">
              <a
                id="location-get-directions-btn"
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20please%20send%20live%20location.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-400 transition flex items-center justify-center"
                title="WhatsApp Location"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Google Map Frame */}
          <div className="lg:col-span-7 bg-neutral-900 border border-white/10 relative min-h-[360px] flex flex-col">
            <div className="p-3 bg-black border-b border-white/10 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-white/70 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {branch.name}
              </span>
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <span>Google Maps View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 w-full h-full min-h-[300px] bg-black relative">
              <iframe
                title={`Google Map - ${branch.name}`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

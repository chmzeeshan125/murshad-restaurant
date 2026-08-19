import React, { useState } from 'react';
import { BranchInfo } from '../types';
import {
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Facebook,
  Instagram,
  Info,
  Calendar,
} from 'lucide-react';

interface ReservationContactSectionProps {
  branch: BranchInfo;
}

export const ReservationContactSection: React.FC<ReservationContactSectionProps> = ({
  branch,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('4 Persons');
  const [timing, setTiming] = useState('Tonight (Dinner)');
  const [specialRequest, setSpecialRequest] = useState('');
  const [socialModalMessage, setSocialModalMessage] = useState<string | null>(null);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Murshad Restaurant Table Reservation / Inquiry*
---------------------------------------
*Branch:* ${branch.name}
*Customer Name:* ${name}
*Contact:* ${phone}
*Number of Guests:* ${guests}
*Preferred Time:* ${timing}
*Special Request / Order:* ${specialRequest || 'General inquiry / table booking'}`;

    const url = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSocialClick = (platform: 'Facebook' | 'Instagram') => {
    setSocialModalMessage(
      `Official verified ${platform} page for Murshad Restaurant will be connected here as provided by management.`
    );
  };

  return (
    <section id="contact" className="py-14 sm:py-18 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Calendar className="w-3 h-3 text-red-500" />
              Direct Inquiries & Dining Desk
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Connect with <span className="text-red-600 italic">{branch.shortName}</span>
            </h2>
            <p className="mt-1 text-white/50 text-xs sm:text-sm">
              Family table reservations, takeaway orders, and 24/7 helpline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Call Card */}
            <div className="p-5 bg-neutral-900 border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 bg-neutral-800 border border-white/10 flex items-center justify-center text-red-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
                  Direct Telephone
                </span>
                <a
                  id="direct-phone-call-btn"
                  href={`tel:${branch.phone}`}
                  className="text-lg font-serif font-bold text-white hover:text-red-500 transition mt-0.5 block"
                >
                  {branch.phoneFormatted}
                </a>
                <p className="text-xs text-white/50 mt-1">
                  24/7 dedicated line for orders, seat availability, and family halls.
                </p>
              </div>
            </div>

            {/* WhatsApp Chat Card */}
            <div className="p-5 bg-neutral-900 border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Instant WhatsApp Desk
                </span>
                <a
                  id="direct-whatsapp-chat-btn"
                  href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20inquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-serif font-bold text-white hover:text-emerald-400 transition mt-0.5 block"
                >
                  {branch.whatsappFormatted}
                </a>
                <p className="text-xs text-white/50 mt-1">
                  Chat directly with our branch supervisor on WhatsApp for instant replies.
                </p>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-5 bg-neutral-900 border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-3">
                Official Social Media
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="facebook-social-btn"
                  onClick={() => handleSocialClick('Facebook')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-black/60 hover:bg-neutral-800 border border-white/10 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook</span>
                </button>

                <button
                  id="instagram-social-btn"
                  onClick={() => handleSocialClick('Instagram')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-black/60 hover:bg-neutral-800 border border-white/10 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/40">
                <Info className="w-3 h-3 text-white/40 shrink-0" />
                <span>Official verified social links will be added when provided.</span>
              </div>
            </div>

          </div>

          {/* WhatsApp Table Inquiry Form */}
          <div className="lg:col-span-7 p-6 bg-neutral-900 border border-white/10 text-left">
            <div className="mb-5 border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">
                Fast Table Request
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                Table Reservation & Inquiry
              </h3>
              <p className="text-white/50 text-xs mt-1">
                Fill this quick form to instantly generate a WhatsApp booking message to {branch.shortName}.
              </p>
            </div>

            <form onSubmit={handleWhatsAppBooking} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Usman Malik"
                    className="w-full px-3 py-2 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3 py-2 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                  >
                    <option value="1-2 Persons">1 - 2 Persons (Couple / Quick Dine)</option>
                    <option value="3-5 Persons">3 - 5 Persons (Family)</option>
                    <option value="6-10 Persons">6 - 10 Persons (Group)</option>
                    <option value="10+ Persons (Private Hall)">10+ Persons (Private Hall)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                    Preferred Time (24/7)
                  </label>
                  <select
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                  >
                    <option value="Right Now / Next 30 Mins">Right Now / Next 30 Mins</option>
                    <option value="Today Lunch (1:00 PM - 4:00 PM)">Today Lunch (1:00 PM - 4:00 PM)</option>
                    <option value="Tonight Dinner (7:00 PM - 11:00 PM)">Tonight Dinner (7:00 PM - 11:00 PM)</option>
                    <option value="Late Night (12:00 AM - 4:00 AM)">Late Night (12:00 AM - 4:00 AM)</option>
                    <option value="Morning / Breakfast">Morning / Breakfast (6:00 AM - 11:00 AM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                  Special Dish Pre-Orders / Notes
                </label>
                <textarea
                  rows={2}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="e.g. Please arrange family hall table, 1 Dumba Karahi & Naans."
                  className="w-full px-3 py-2 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Reservation on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Social Modal */}
        {socialModalMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSocialModalMessage(null)}
          >
            <div
              className="bg-neutral-900 border border-white/20 p-6 max-w-sm text-center space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 bg-black border border-white/10 text-red-500 flex items-center justify-center mx-auto">
                <Info className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif font-bold text-white">Social Channel Link</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {socialModalMessage}
              </p>
              <button
                onClick={() => setSocialModalMessage(null)}
                className="w-full py-2 bg-red-600 text-white text-xs uppercase tracking-wider font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

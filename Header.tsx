import React, { useState, useEffect } from 'react';
import { BranchInfo } from '../types';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu as MenuIcon,
  X,
  Repeat,
  Sparkles,
  Clock,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  currentBranch: BranchInfo;
  onChangeBranchClick: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBranch,
  onChangeBranchClick,
  onAdminClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Services', href: '#services' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Bar (Contact & 24/7 Status) */}
      <div className="bg-black border-b border-white/10 text-white/50 text-[11px] uppercase tracking-wider py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              Open 24/7 Always
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1 text-white/60">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {currentBranch.landmark}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${currentBranch.phone}`}
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition"
              id="top-call-link"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Call: <strong className="text-white font-bold">{currentBranch.phoneFormatted}</strong></span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`https://wa.me/${currentBranch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(currentBranch.name)}),%20I%20would%20like%20to%20inquire%20about...`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
              id="top-whatsapp-link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-black/85 backdrop-blur-sm border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo & Current Branch Tag */}
          <div className="flex items-center gap-3">
            <a href="#" className="focus:outline-none" aria-label="Murshad Restaurant Home">
              <BrandLogo size="md" />
            </a>

            {/* Current Branch Active Pill with Quick Switcher Button */}
            <div className="hidden lg:flex items-center pl-4 border-l border-white/10">
              <button
                id="header-branch-switch-btn"
                onClick={onChangeBranchClick}
                className="group flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-white/10 hover:border-red-600 transition text-left"
                title="Click to Switch Branch"
              >
                <div className="w-1.5 h-1.5 bg-red-600 group-hover:scale-125 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest leading-none">
                    Selected Branch
                  </span>
                  <span className="text-xs font-serif font-bold text-white group-hover:text-red-500 transition leading-tight flex items-center gap-1">
                    {currentBranch.city}
                    <ChevronDown className="w-3 h-3 text-white/40 group-hover:text-red-500" />
                  </span>
                </div>
                <Repeat className="w-3.5 h-3.5 text-red-500 ml-1 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Change Branch & Call / WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Change Branch Button */}
            <button
              id="change-branch-btn"
              onClick={onChangeBranchClick}
              className="px-4 py-2 border border-white/20 text-[10px] uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-1.5"
            >
              <Repeat className="w-3 h-3 text-red-500" />
              <span>Change Branch</span>
            </button>

            {/* Quick WhatsApp Inquiry */}
            <a
              id="header-whatsapp-cta"
              href={`https://wa.me/${currentBranch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(currentBranch.name)}),%20I%20would%20like%20to%20inquire%20or%20reserve%20a%20table.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-400 text-[10px] uppercase tracking-widest font-bold transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Direct Call Button */}
            <a
              id="header-call-cta"
              href={`tel:${currentBranch.phone}`}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase tracking-widest font-bold transition shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-change-branch-badge"
              onClick={onChangeBranchClick}
              className="sm:hidden px-2.5 py-1.5 bg-neutral-900 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/80 flex items-center gap-1"
            >
              <Repeat className="w-3 h-3 text-red-500" />
              <span>{currentBranch.city}</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-neutral-900 border border-white/10 text-white/70 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="xl:hidden bg-black border-b border-white/10 px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
          >
            {/* Branch Card inside Mobile Menu */}
            <div className="p-4 bg-neutral-900 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase text-white/40 tracking-widest">Active Branch</span>
                <p className="text-sm font-serif font-bold text-white">{currentBranch.name}</p>
                <p className="text-[11px] text-white/50 italic">{currentBranch.landmark}</p>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onChangeBranchClick();
                }}
                className="px-3 py-1.5 bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 shadow"
              >
                <Repeat className="w-3 h-3" />
                <span>Switch</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 bg-neutral-900/80 hover:bg-neutral-800 border border-white/5 text-white/70 hover:text-white text-xs uppercase tracking-wider font-semibold transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Direct Call & WhatsApp Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${currentBranch.phone}`}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {currentBranch.phoneFormatted}</span>
              </a>

              <a
                href={`https://wa.me/${currentBranch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(currentBranch.name)}),%20I%20would%20like%20to%20inquire.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order / Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

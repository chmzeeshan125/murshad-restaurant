import React, { useState, useEffect } from 'react';
import { BranchId, BranchInfo, MenuItem, ReviewItem, GalleryItem } from './types';
import { BRANCHES, INITIAL_MENU_ITEMS, INITIAL_REVIEWS_LIST, INITIAL_GALLERY_ITEMS } from './data/restaurantData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AboutModal } from './components/AboutModal';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { FullMenuModal } from './components/FullMenuModal';
import { GallerySection } from './components/GallerySection';
import { FullGalleryModal } from './components/FullGalleryModal';
import { ReviewsSection } from './components/ReviewsSection';
import { FullReviewsModal } from './components/FullReviewsModal';
import { LocationSection } from './components/LocationSection';
import { ReservationContactSection } from './components/ReservationContactSection';
import { Footer } from './components/Footer';
import { BranchSelectorModal } from './components/BranchSelectorModal';
import {
  Phone,
  MessageCircle,
  Repeat,
  Navigation,
  Image as ImageIcon,
  X,
  Upload,
} from 'lucide-react';

export default function App() {
  // Active branch state
  const [selectedBranchId, setSelectedBranchId] = useState<BranchId | null>(() => {
    const saved = localStorage.getItem('murshad_selected_branch');
    if (saved === 'gujar-khan' || saved === 'kallar-syedan') {
      return saved as BranchId;
    }
    return null;
  });

  const [isBranchModalOpen, setIsBranchModalOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('murshad_selected_branch');
    return !saved;
  });

  // Dedicated Modals State for Clean/Short Homepage Experience
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isFullMenuModalOpen, setIsFullMenuModalOpen] = useState<boolean>(false);
  const [isFullGalleryModalOpen, setIsFullGalleryModalOpen] = useState<boolean>(false);
  const [isFullReviewsModalOpen, setIsFullReviewsModalOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [customLogoInput, setCustomLogoInput] = useState<string>('');

  // Menu items state with local persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('murshad_custom_menu');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MENU_ITEMS;
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  // Gallery items state with local persistence
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('murshad_custom_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_GALLERY_ITEMS;
      }
    }
    return INITIAL_GALLERY_ITEMS;
  });

  // Reviews list
  const [reviews] = useState<ReviewItem[]>(INITIAL_REVIEWS_LIST);

  const currentBranch: BranchInfo = BRANCHES[selectedBranchId || 'gujar-khan'];

  // Handle branch selection
  const handleSelectBranch = (branchId: BranchId) => {
    setSelectedBranchId(branchId);
    localStorage.setItem('murshad_selected_branch', branchId);
    setIsBranchModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update Menu items & persist
  const handleUpdateMenuItems = (updated: MenuItem[]) => {
    setMenuItems(updated);
    localStorage.setItem('murshad_custom_menu', JSON.stringify(updated));
  };

  // Update Gallery items & persist
  const handleUpdateGallery = (updated: GalleryItem[]) => {
    setGalleryItems(updated);
    localStorage.setItem('murshad_custom_gallery', JSON.stringify(updated));
  };

  // Custom logo upload
  const handleSaveCustomLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLogoInput) {
      localStorage.setItem('murshad_custom_logo', customLogoInput);
      window.location.reload();
    }
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        localStorage.setItem('murshad_custom_logo', result);
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    localStorage.removeItem('murshad_custom_logo');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-stone-100 font-sans flex flex-col selection:bg-red-700 selection:text-white">
      
      {/* 1. Branch Selector Modal */}
      <BranchSelectorModal
        isOpen={isBranchModalOpen}
        onSelectBranch={handleSelectBranch}
        currentBranchId={selectedBranchId}
        onClose={() => setIsBranchModalOpen(false)}
        isInitialSelection={!selectedBranchId}
      />

      {/* 2. Full Menu Modal */}
      <FullMenuModal
        isOpen={isFullMenuModalOpen}
        onClose={() => setIsFullMenuModalOpen(false)}
        branch={currentBranch}
        menuItems={menuItems}
        onUpdateMenuItems={handleUpdateMenuItems}
      />

      {/* 3. Full Gallery & Asset Modal */}
      <FullGalleryModal
        isOpen={isFullGalleryModalOpen}
        onClose={() => setIsFullGalleryModalOpen(false)}
        branch={currentBranch}
        galleryItems={galleryItems}
        onUpdateGallery={handleUpdateGallery}
      />

      {/* 4. Full Reviews Modal */}
      <FullReviewsModal
        isOpen={isFullReviewsModalOpen}
        onClose={() => setIsFullReviewsModalOpen(false)}
        branch={currentBranch}
        reviews={reviews}
      />

      {/* 5. About / Heritage Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        currentBranch={currentBranch}
      />

      {/* 6. Sticky Header */}
      <Header
        currentBranch={currentBranch}
        onChangeBranchClick={() => setIsBranchModalOpen(true)}
      />

      {/* Main Streamlined Homepage Content */}
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          branch={currentBranch}
          onChangeBranchClick={() => setIsBranchModalOpen(true)}
        />

        {/* 2. Compact 2-3 Line About Section with Expandable Story */}
        <AboutSection
          currentBranch={currentBranch}
          onOpenFullStory={() => setIsAboutModalOpen(true)}
        />

        {/* 3. Signature Dishes (Only 6–8 Curated Dishes) */}
        <FeaturedDishes
          branch={currentBranch}
          menuItems={menuItems}
          onOpenFullMenu={() => setIsFullMenuModalOpen(true)}
        />

        {/* 4. Category Menu Preview & Editor */}
        <MenuSection
          branch={currentBranch}
          menuItems={menuItems}
          onUpdateMenuItems={handleUpdateMenuItems}
          onOpenFullMenuModal={() => setIsFullMenuModalOpen(true)}
        />

        {/* 5. Curated 4-Photo Gallery Preview */}
        <GallerySection
          branch={currentBranch}
          galleryItems={galleryItems}
          onOpenFullGalleryModal={() => setIsFullGalleryModalOpen(true)}
        />

        {/* 6. Compact Google Rating & Authentic Review */}
        <ReviewsSection
          branch={currentBranch}
          reviews={reviews}
          onOpenFullReviewsModal={() => setIsFullReviewsModalOpen(true)}
        />

        {/* 7. Location & Google Maps */}
        <LocationSection
          branch={currentBranch}
          onChangeBranchClick={() => setIsBranchModalOpen(true)}
        />

        {/* 8. Table Reservation & Direct Desk */}
        <ReservationContactSection branch={currentBranch} />
      </main>

      {/* Footer */}
      <Footer
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
      />

      {/* Mobile Floating Action Bar */}
      <aside
        id="floating-quick-bar"
        aria-label="Quick Actions"
        className="fixed bottom-4 left-4 right-4 z-40 sm:hidden flex items-center justify-between gap-2 p-2 bg-black/95 border border-white/15 shadow-2xl backdrop-blur-md"
      >
        <button
          onClick={() => setIsBranchModalOpen(true)}
          className="flex-1 py-2.5 px-2 bg-neutral-900 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <Repeat className="w-3.5 h-3.5 text-red-500" />
          <span>Switch</span>
        </button>

        <a
          href={`tel:${currentBranch.phone}`}
          className="flex-1 py-2.5 px-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${currentBranch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(currentBranch.name)})`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <a
          href={currentBranch.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-neutral-900 border border-white/10 text-white/80"
          title="Google Maps Directions"
        >
          <Navigation className="w-4 h-4 text-red-500" />
        </a>
      </aside>

      {/* Logo / Asset Settings Trigger (Bottom right corner) */}
      <div className="fixed bottom-4 right-4 z-30 hidden sm:block">
        <button
          id="brand-asset-manager-btn"
          onClick={() => setIsLogoModalOpen(true)}
          className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/15 hover:border-red-600 text-white/60 hover:text-white transition shadow-xl flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider"
          title="Murshad Logo & Asset Settings"
        >
          <ImageIcon className="w-4 h-4 text-red-500" />
          <span className="hidden md:inline">Original Logo / Assets</span>
        </button>
      </div>

      {/* Brand Logo Upload Modal */}
      {isLogoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsLogoModalOpen(false)}
        >
          <div
            className="bg-[#0A0A0A] border border-white/20 p-6 sm:p-8 w-full max-w-md shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLogoModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-1"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-white mb-1">
              Original Murshad Logo Settings
            </h3>
            <p className="text-xs text-white/50 mb-4">
              Upload your original Murshad Restaurant logo or portrait file directly. It will be seamlessly applied across the entire website.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                  Select Original Logo File from Device:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoFileUpload}
                  className="w-full text-xs text-white/50 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-2 text-[10px] text-white/40 uppercase tracking-widest">Or Image URL</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <form onSubmit={handleSaveCustomLogo} className="space-y-3">
                <input
                  type="text"
                  value={customLogoInput}
                  onChange={(e) => setCustomLogoInput(e.target.value)}
                  placeholder="https://... logo image link"
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  Save URL Logo
                </button>
              </form>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={handleResetLogo}
                  className="text-white/40 hover:text-red-500 underline text-xs"
                >
                  Reset to Default Brand Emblem
                </button>
                <button
                  onClick={() => setIsLogoModalOpen(false)}
                  className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider border border-white/10"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { BranchInfo, GalleryItem } from '../types';
import { Camera, Maximize2, Plus, Sparkles, X, ArrowRight } from 'lucide-react';

interface GallerySectionProps {
  branch: BranchInfo;
  galleryItems: GalleryItem[];
  onOpenFullGalleryModal: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  branch,
  galleryItems,
  onOpenFullGalleryModal,
}) => {
  // Curated 4 photos for the homepage
  const homepagePhotos = galleryItems.slice(0, 4);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-14 sm:py-18 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Camera className="w-3 h-3 text-red-500" />
              Visual Experience
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Glimpses of <span className="text-red-600 italic">Murshad</span>
            </h2>
            <p className="mt-1 text-white/50 text-xs sm:text-sm">
              Sizzling charcoal karahis, family dining spaces, and fresh delicacies.
            </p>
          </div>

          <div>
            <button
              id="view-full-gallery-btn"
              onClick={onOpenFullGalleryModal}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/15 hover:border-red-600 text-white font-serif font-bold text-xs uppercase tracking-widest transition flex items-center gap-1.5 shadow"
            >
              <Maximize2 className="w-3.5 h-3.5 text-red-500" />
              <span>View Full Gallery ({galleryItems.length})</span>
            </button>
          </div>
        </div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {homepagePhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative aspect-4/3 sm:aspect-square bg-neutral-900 border border-white/10 overflow-hidden cursor-pointer hover:border-red-600 transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-left">
                <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold block">
                  {item.category}
                </span>
                <h4 className="text-xs font-serif font-bold text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>Authentic photographs from Murshad Restaurant Gujar Khan & Kallar Syedan.</span>
          <button
            onClick={onOpenFullGalleryModal}
            className="text-red-500 hover:text-red-400 font-serif font-bold uppercase tracking-widest text-[10px] flex items-center gap-1"
          >
            <span>Upload or View All Photos</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl max-h-[85vh] bg-[#0A0A0A] border border-white/20 p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 text-white hover:text-red-500 transition border border-white/20 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                  {selectedPhoto.category}
                </span>
                <h4 className="text-sm font-serif font-bold text-white">
                  {selectedPhoto.title}
                </h4>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

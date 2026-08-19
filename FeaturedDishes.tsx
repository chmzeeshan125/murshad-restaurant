import React from 'react';
import { BranchInfo, MenuItem } from '../types';
import { Sparkles, MessageCircle, Star, Flame, ArrowRight } from 'lucide-react';

interface FeaturedDishesProps {
  branch: BranchInfo;
  menuItems: MenuItem[];
  onOpenFullMenu: () => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  branch,
  menuItems,
  onOpenFullMenu,
}) => {
  // Filter dishes relevant to current branch
  const branchDishes = menuItems.filter((item) => item.branches.includes(branch.id));
  
  // Featured selection: 6-8 dishes max on homepage
  const featuredList = (
    branchDishes.filter((item) => item.isPopular || item.isChefSpecial).length >= 6
      ? branchDishes.filter((item) => item.isPopular || item.isChefSpecial)
      : branchDishes
  ).slice(0, 8);

  return (
    <section id="specialties" className="py-14 sm:py-18 bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3 text-red-500" />
              Signature Specialties
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Famous Dishes at <span className="text-red-600 italic">{branch.shortName}</span>
            </h2>
            <p className="mt-1 text-white/50 text-xs sm:text-sm">
              Freshly prepared authentic recipes celebrated across {branch.city}.
            </p>
          </div>

          <div>
            <button
              id="view-full-menu-header-btn"
              onClick={onOpenFullMenu}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-red-500 hover:text-red-400 transition uppercase tracking-widest"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 to 8 Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredList.map((dish) => (
            <div
              key={dish.id}
              className="group bg-neutral-900 border border-white/10 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Image with Tag Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-black">
                <img
                  src={dish.customUploadedImage || dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {dish.isChefSpecial && (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      Special
                    </span>
                  )}
                  {dish.isSpicy && (
                    <span className="px-2 py-0.5 bg-amber-600 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 fill-white" />
                      Spicy
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-2.5">
                  <span className="px-2 py-0.5 bg-black/80 border border-white/10 text-white/70 text-[10px]">
                    {dish.category}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-red-500 transition line-clamp-1">
                    {dish.name}
                  </h3>
                  {dish.urduName && (
                    <span className="text-white/40 text-xs font-serif block mt-0.5 text-right">
                      {dish.urduName}
                    </span>
                  )}
                  <p className="text-white/50 text-xs leading-relaxed mt-1.5 line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                {/* Price & Quick Order */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/40 uppercase tracking-tighter">Price</span>
                    <span className="text-xs font-semibold text-white/80">
                      {dish.price}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20order%20or%20inquire%20about%20${encodeURIComponent(dish.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-neutral-800 hover:bg-red-600 text-white transition border border-white/10 flex items-center gap-1 text-[11px] font-bold uppercase"
                    title={`Inquire about ${dish.name}`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Bottom Navigation to Full Menu */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-white/40 text-[11px]">
            *Prices vary for fresh market cuts (Dumba / Desi Chicken). Inquire directly at counter.
          </span>
          <button
            onClick={onOpenFullMenu}
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white/80 hover:text-black font-bold uppercase text-[10px] tracking-widest transition"
          >
            View All Categories & Dishes ({branchDishes.length})
          </button>
        </div>

      </div>
    </section>
  );
};

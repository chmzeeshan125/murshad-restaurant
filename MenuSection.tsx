import React, { useState, useMemo } from 'react';
import { BranchInfo, MenuItem } from '../types';
import {
  Utensils,
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Info,
  Maximize2,
} from 'lucide-react';

interface MenuSectionProps {
  branch: BranchInfo;
  menuItems: MenuItem[];
  onUpdateMenuItems: (updated: MenuItem[]) => void;
  onOpenFullMenuModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  branch,
  menuItems,
  onUpdateMenuItems,
  onOpenFullMenuModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Karahi & Handi');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = [
    'Karahi & Handi',
    'BBQ & Grills',
    'Soups & Starters',
    'Fast Food & Pizza',
    'Breads & Tandoor',
  ];

  // Filter items for branch and selected category
  const branchItems = useMemo(() => {
    return menuItems.filter((item) => item.branches.includes(branch.id));
  }, [menuItems, branch.id]);

  const categoryItems = useMemo(() => {
    return branchItems.filter((item) => item.category === activeCategory);
  }, [branchItems, activeCategory]);

  return (
    <section id="menu" className="py-14 sm:py-18 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Utensils className="w-3 h-3 text-red-500" />
              Menu Categories
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              {branch.shortName} <span className="text-red-600 italic">Menu</span>
            </h2>
            <p className="mt-1 text-white/50 text-xs sm:text-sm">
              Authentic recipes freshly cooked. Official prices can be confirmed at the counter or updated below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="open-full-menu-btn"
              onClick={onOpenFullMenuModal}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Menu & Price Editor</span>
            </button>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const count = branchItems.filter((i) => i.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-white/80' : 'text-white/40'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact Dish List for Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categoryItems.map((dish) => (
            <div
              key={dish.id}
              className="p-4 bg-neutral-900 border border-white/10 hover:border-red-600/50 transition flex items-start justify-between gap-4 text-left"
            >
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-sm font-serif font-bold text-white">
                    {dish.name}
                  </h4>
                  {dish.urduName && (
                    <span className="text-white/40 text-xs font-serif shrink-0">
                      {dish.urduName}
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs leading-relaxed mt-1 line-clamp-2">
                  {dish.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-bold text-red-500">
                    {dish.price || 'Inquire at counter'}
                  </span>
                  {dish.isChefSpecial && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-red-950 text-red-400 border border-red-800 uppercase font-semibold">
                      Special
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-1.5 items-end">
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(dish.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-black hover:bg-red-600 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition"
                  title="Inquire via WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 text-red-400" />
                  <span>Order</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Footer Callout */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50 gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-red-500" />
            <span>Prices are optional / editable. Official prices will update as provided by management.</span>
          </div>
          <button
            onClick={onOpenFullMenuModal}
            className="text-red-500 hover:text-red-400 font-serif font-bold uppercase tracking-widest text-[10px] flex items-center gap-1"
          >
            <span>Open Menu Manager & Full Catalog</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </section>
  );
};

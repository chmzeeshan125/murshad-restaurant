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
  Info,
  Check,
  Flame,
  Star,
} from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchInfo;
  menuItems: MenuItem[];
  onUpdateMenuItems: (updated: MenuItem[]) => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  branch,
  menuItems,
  onUpdateMenuItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = [
    'All',
    'Karahi & Handi',
    'BBQ & Grills',
    'Soups & Starters',
    'Fast Food & Pizza',
    'Breads & Tandoor',
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesBranch = item.branches.includes(branch.id);
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.urduName && item.urduName.includes(searchQuery));
      return matchesBranch && matchesCategory && matchesSearch;
    });
  }, [menuItems, branch.id, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSaveItem = (itemData: Partial<MenuItem>) => {
    if (editingItem && editingItem.id) {
      const updated = menuItems.map((item) =>
        item.id === editingItem.id ? { ...item, ...itemData } : item
      );
      onUpdateMenuItems(updated);
    } else {
      const newItem: MenuItem = {
        id: `custom-${Date.now()}`,
        name: itemData.name || 'New Special Dish',
        urduName: itemData.urduName || '',
        category: itemData.category || 'Karahi & Handi',
        description: itemData.description || 'Freshly prepared signature dish.',
        price: itemData.price || 'Inquire at counter',
        isPopular: itemData.isPopular || false,
        isChefSpecial: itemData.isChefSpecial || false,
        isSpicy: itemData.isSpicy || false,
        branches: [branch.id],
        image:
          itemData.image ||
          'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      };
      onUpdateMenuItems([...menuItems, newItem]);
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this dish from the menu?')) {
      const updated = menuItems.filter((item) => item.id !== id);
      onUpdateMenuItems(updated);
    }
  };

  return (
    <div
      id="full-menu-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Utensils className="w-3 h-3 text-red-500" />
              Complete Menu & Price Manager
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              {branch.name}
            </h2>
            <p className="text-xs text-white/50">
              Easily update dish names, descriptions, Urdu names, and prices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingItem({
                  id: '',
                  name: '',
                  urduName: '',
                  category: 'Karahi & Handi',
                  description: '',
                  price: 'Rs. ',
                  branches: [branch.id],
                  image: '',
                });
              }}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dish</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white border border-white/10 hover:bg-white/10 transition"
              aria-label="Close Full Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Karahi, Soup, Kebab..."
              className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-red-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-900 text-white/50 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Dish Grid */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[50vh]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-xs">
              No dishes found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="p-3 bg-neutral-900 border border-white/10 hover:border-white/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={dish.customUploadedImage || dish.image}
                    alt={dish.name}
                    className="w-14 h-14 object-cover border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-serif font-bold text-white">
                        {dish.name}
                      </h4>
                      {dish.urduName && (
                        <span className="text-white/40 text-xs font-serif">
                          {dish.urduName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/50 line-clamp-1 mt-0.5">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-black border border-white/10 text-white/60">
                        {dish.category}
                      </span>
                      <span className="text-xs font-bold text-red-500">
                        {dish.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setEditingItem(dish)}
                    className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white/70 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1"
                    title="Edit Dish"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(dish.id)}
                    className="p-2 bg-neutral-800 hover:bg-red-950 text-white/40 hover:text-red-400 border border-white/10"
                    title="Delete Dish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${branch.whatsapp}?text=Hello%20Murshad%20Restaurant%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20order%20or%20inquire%20about%20${encodeURIComponent(dish.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Total Dishes in Catalogue: {menuItems.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white uppercase text-[10px] tracking-widest font-bold transition"
          >
            Done Viewing
          </button>
        </div>

        {/* Edit/Add Modal Sub-drawer */}
        {editingItem && (
          <MenuEditDrawer
            item={editingItem}
            categories={categories.filter((c) => c !== 'All')}
            currentBranchId={branch.id}
            onSave={handleSaveItem}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
};

interface MenuEditDrawerProps {
  item: MenuItem;
  categories: string[];
  currentBranchId: 'gujar-khan' | 'kallar-syedan';
  onSave: (data: Partial<MenuItem>) => void;
  onClose: () => void;
}

const MenuEditDrawer: React.FC<MenuEditDrawerProps> = ({
  item,
  categories,
  currentBranchId,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(item.name);
  const [urduName, setUrduName] = useState(item.urduName || '');
  const [category, setCategory] = useState(item.category || categories[0]);
  const [description, setDescription] = useState(item.description || '');
  const [price, setPrice] = useState(item.price || 'Inquire at counter');
  const [image, setImage] = useState(item.image || '');
  const [isChefSpecial, setIsChefSpecial] = useState(item.isChefSpecial || false);
  const [isSpicy, setIsSpicy] = useState(item.isSpicy || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      urduName,
      category,
      description,
      price,
      image:
        image ||
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isChefSpecial,
      isSpicy,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0A0A0A] border border-white/20 p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white p-1"
          aria-label="Close Editor"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-serif font-bold text-white mb-1">
          {item.id ? 'Edit Dish Details & Price' : 'Add New Dish'}
        </h3>
        <p className="text-xs text-white/40 mb-4">
          Changes will be saved to your local catalog and updated across the site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
              Dish Name (English) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Special Mutton Karahi"
              className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
              Urdu Name (Optional)
            </label>
            <input
              type="text"
              value={urduName}
              onChange={(e) => setUrduName(e.target.value)}
              placeholder="مثلاً مٹن کڑاہی"
              className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none text-right font-serif"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
                Price (Optional / e.g. Rs. 1,800)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Rs. ... or Inquire"
                className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
              Description *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingredients, preparation style..."
              className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">
              Dish Image (Upload file or paste URL)
            </label>
            <div className="space-y-1.5">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-[11px] text-white/50 file:mr-2 file:py-1 file:px-2.5 file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-red-600 cursor-pointer"
              />
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Or https://... image URL"
                className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 text-white text-[11px] focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-xs text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={isChefSpecial}
                onChange={(e) => setIsChefSpecial(e.target.checked)}
                className="accent-red-600"
              />
              <span>Chef Special Badge</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
                className="accent-red-600"
              />
              <span>Desi Spicy</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 text-white/60 text-xs font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider"
            >
              Save Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

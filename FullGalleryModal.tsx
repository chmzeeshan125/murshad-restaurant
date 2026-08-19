import React, { useState } from 'react';
import { BranchInfo, GalleryItem } from '../types';
import { Camera, Plus, X, Sparkles, Trash2, Upload } from 'lucide-react';

interface FullGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchInfo;
  galleryItems: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
}

export const FullGalleryModal: React.FC<FullGalleryModalProps> = ({
  isOpen,
  onClose,
  branch,
  galleryItems,
  onUpdateGallery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Food' | 'Charcoal BBQ' | 'Ambience' | 'Exterior'>('Food');
  const [newUrl, setNewUrl] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Food', 'Charcoal BBQ', 'Ambience', 'Exterior'];

  const filteredItems = galleryItems.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl && !newTitle) return;
    const newItem: GalleryItem = {
      id: `custom-photo-${Date.now()}`,
      url: newUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      title: newTitle || 'Murshad Restaurant Special',
      category: newCategory,
      branchId: branch.id,
    };
    onUpdateGallery([newItem, ...galleryItems]);
    setNewTitle('');
    setNewUrl('');
    setShowUploadForm(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Delete this photo from the gallery?')) {
      onUpdateGallery(galleryItems.filter((i) => i.id !== id));
    }
  };

  return (
    <div
      id="full-gallery-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-left max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Camera className="w-3 h-3 text-red-500" />
              Full Photo Gallery & Asset Hub
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              Murshad Restaurant Photography
            </h2>
            <p className="text-xs text-white/50">
              Browse original photographs or add newly captured restaurant images.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{showUploadForm ? 'Close Form' : 'Upload Photo'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white border border-white/10 hover:bg-white/10 transition"
              aria-label="Close Gallery"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upload Form (If toggled) */}
        {showUploadForm && (
          <form
            onSubmit={handleAddPhoto}
            className="mb-5 p-4 bg-neutral-900 border border-white/15 space-y-3"
          >
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Add New Photo to Gallery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] uppercase text-white/60 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sizzling Dumba Karahi"
                  className="w-full px-3 py-1.5 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/60 mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-black border border-white/10 text-white text-xs focus:border-red-600 focus:outline-none"
                >
                  <option value="Food">Food</option>
                  <option value="Charcoal BBQ">Charcoal BBQ</option>
                  <option value="Ambience">Ambience</option>
                  <option value="Exterior">Exterior</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/60 mb-1">
                  File Upload or URL *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-[10px] text-white/50 file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-neutral-800 file:text-white cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider"
              >
                Save Photo
              </button>
            </div>
          </form>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-900 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[55vh]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-neutral-900 border border-white/10 overflow-hidden"
            >
              <img
                src={item.url}
                alt={item.title}
                onClick={() => setSelectedPhoto(item)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeletePhoto(item.id)}
                    className="p-1 bg-black/80 hover:bg-red-950 text-white/50 hover:text-red-400 border border-white/10"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold block">
                    {item.category}
                  </span>
                  <h5 className="text-[11px] font-serif font-bold text-white line-clamp-1">
                    {item.title}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox view */}
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

        {/* Bottom */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Total Images: {filteredItems.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white uppercase text-[10px] tracking-widest font-bold transition"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};

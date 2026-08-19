import React from 'react';
import { BranchInfo, ReviewItem } from '../types';
import { Star, X, ExternalLink, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

interface FullReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchInfo;
  reviews: ReviewItem[];
}

export const FullReviewsModal: React.FC<FullReviewsModalProps> = ({
  isOpen,
  onClose,
  branch,
  reviews,
}) => {
  if (!isOpen) return null;

  const branchReviews = reviews.filter((r) => r.branchId === branch.id);

  return (
    <div
      id="full-reviews-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-auto bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden text-left max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-neutral-900 border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3 h-3 text-red-500" />
              Customer Reviews & Feedback
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              {branch.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-red-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-red-500" />
                <span>{branch.googleRating.toFixed(1)} / 5.0</span>
              </div>
              <span className="text-white/40 text-xs">({branch.reviewCount} total Google reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={branch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
            >
              <span>Write Review</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white border border-white/10 hover:bg-white/10 transition"
              aria-label="Close Reviews"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[55vh]">
          {branchReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-neutral-900 border border-white/10 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-black border border-white/10 text-red-500 flex items-center justify-center font-serif font-bold text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white">
                      {rev.author}
                    </h4>
                    <span className="text-[10px] text-white/40 block">
                      {rev.relativeTime} • {rev.diningType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-red-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-red-500" />
                  ))}
                </div>
              </div>

              <p className="text-white/70 text-xs italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Google Review
                </span>
                <span>Branch: {branch.shortName}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Official reviews from Google Maps.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white uppercase text-[10px] tracking-widest font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { BranchInfo, ReviewItem } from '../types';
import { Star, MessageSquare, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  branch: BranchInfo;
  reviews: ReviewItem[];
  onOpenFullReviewsModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  branch,
  reviews,
  onOpenFullReviewsModal,
}) => {
  const branchReviews = reviews.filter((r) => r.branchId === branch.id);
  const featuredReview = branchReviews[0] || reviews[0];

  return (
    <section id="reviews" className="py-14 sm:py-16 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-neutral-900 border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          
          {/* Left: Google Rating Badge & Summary */}
          <div className="lg:w-5/12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-white/10 text-red-500 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-red-500" />
              Verified Guest Impressions
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              Rated <span className="text-red-600 font-bold">{branch.googleRating.toFixed(1)} / 5.0</span> on Google
            </h3>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Based on over <strong className="text-white">{branch.reviewCount} verified reviews</strong> for {branch.name}. Celebrated for live charcoal cooking and family dining comfort.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition inline-flex items-center gap-1.5 shadow"
              >
                <span>Google Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenFullReviewsModal}
                className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black text-white/80 hover:text-black font-bold text-xs uppercase tracking-widest transition"
              >
                Read Reviews ({branchReviews.length})
              </button>
            </div>
          </div>

          {/* Right: Featured Authentic Review */}
          {featuredReview && (
            <div className="lg:w-7/12 w-full p-5 bg-black/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-neutral-800 border border-white/10 text-red-500 flex items-center justify-center font-serif font-bold text-sm">
                      {featuredReview.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-white">
                        {featuredReview.author}
                      </h4>
                      <span className="text-[10px] text-white/40 block">
                        {featuredReview.relativeTime} • {featuredReview.diningType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-red-500">
                    {[...Array(featuredReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    ))}
                  </div>
                </div>

                <p className="text-white/70 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;{featuredReview.comment}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Local Diner
                </span>
                <span>{branch.shortName}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

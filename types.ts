export type BranchId = 'gujar-khan' | 'kallar-syedan';

export interface BranchInfo {
  id: BranchId;
  name: string;
  shortName: string;
  city: string;
  tagline: string;
  address: string;
  postalCode?: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  whatsappFormatted: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  googleRating: number;
  reviewCount: string;
  reviewCountNum: number;
  pricePerPerson: string;
  openingHours: string;
  is24Hours: boolean;
  knownDishes: string[];
  features: string[];
  description: string;
  coverImage: string;
  landmark: string;
}

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: string;
  description: string;
  price: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isSpicy?: boolean;
  branches: BranchId[];
  image: string;
  customUploadedImage?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  diningType: string;
  comment: string;
  branchId: BranchId;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  branchId: BranchId;
  branchName: string;
  verified: boolean;
  dishMentioned?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  alt?: string;
  caption?: string;
  branchId?: BranchId | 'both';
}

export interface BranchFeatureItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  isHighlight?: boolean;
}

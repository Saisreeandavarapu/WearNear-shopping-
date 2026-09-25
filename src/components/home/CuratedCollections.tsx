import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';
import { PRODUCTS } from '../../data/mockData';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

interface CuratedCollection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  editorialImage: string;
  filterCategorySlug: string;
  tags: string[];
}

const COLLECTIONS: CuratedCollection[] = [
  {
    id: 'weekend-essentials',
    name: 'Weekend Essentials',
    tagline: 'Effortless Ease & Relaxed Silhouettes',
    description: 'Breezy linens, relaxed fits, and unstructured separates sourced from independent neighborhood boutiques.',
    editorialImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 'dresses',
    tags: ['Relaxed', 'Linen', 'Boutique Exclusive']
  },
  {
    id: 'everyday-streetwear',
    name: 'Everyday Streetwear',
    tagline: 'Modern Urban Energy',
    description: 'Oversized silhouettes, drop shoulders, and premium heavyweight cottons crafted for high daily rotation.',
    editorialImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 't-shirts',
    tags: ['Streetwear', 'Raw Denim', 'Drop Shoulder']
  },
  {
    id: 'workwear-refresh',
    name: 'Workwear Refresh',
    tagline: 'Sharp Tailoring for Modern Routines',
    description: 'Crisp Oxford button-downs, breathable blazers, and clean tailored trousers from nearby fashion houses.',
    editorialImage: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 'formal-wear',
    tags: ['Tailored', 'Poplin', 'Minimalist']
  },
  {
    id: 'festive-finds',
    name: 'Festive Finds',
    tagline: 'Artisanal Elegance & Vibrant Silks',
    description: 'Embroidered kurtis, banarasi silks, and celebratory accessories hand-selected from traditional local craftsmen.',
    editorialImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 'ethnic-wear',
    tags: ['Handloom', 'Silk', 'Festive']
  },
  {
    id: 'minimal-wardrobe',
    name: 'Minimal Wardrobe',
    tagline: 'Understated Luxury & Neutral Tones',
    description: 'Timeless monochrome basics designed for endless capsule styling with zero fast-fashion excess.',
    editorialImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 'casual-wear',
    tags: ['Capsule', 'Monochrome', 'Sustainable']
  },
  {
    id: 'seasonal-picks',
    name: 'Seasonal Picks',
    tagline: 'Curated by Local Stylists This Week',
    description: 'Top trending styles trending across your neighborhood shopping district this season.',
    editorialImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80&auto=format&fit=crop',
    filterCategorySlug: 'trending',
    tags: ['Trending', '30-Min Delivery', 'New Arrival']
  }
];

export const CuratedCollections: React.FC = () => {
  const navigate = useNavigate();
  const [activeCollectionId, setActiveCollectionId] = useState(COLLECTIONS[0].id);

  const activeCollection = COLLECTIONS.find((c) => c.id === activeCollectionId) || COLLECTIONS[0];
  const collectionProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="py-5 sm:py-12 bg-brand-cream max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 border-b border-brand-border">
      {/* Header section with subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-2.5 sm:gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 text-brand-blue">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Lookbooks</span>
          </div>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-editorial font-bold text-brand-text tracking-tight">
            Curated Fashion Collections
          </h2>
          <p className="text-[11px] sm:text-sm text-brand-muted mt-0.5 sm:mt-1 font-normal">
            Carefully assembled capsule aesthetics sourced from local designers and neighborhood boutiques
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          showArrow
          onClick={() => navigate('/categories')}
          className="self-start md:self-auto text-xs py-1.5 px-3 sm:py-2 sm:px-4"
        >
          Explore All Collections
        </Button>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-3 mb-3.5 sm:mb-6 scroll-smooth">
        {COLLECTIONS.map((collection) => {
          const isActive = collection.id === activeCollectionId;
          return (
            <button
              key={collection.id}
              onClick={() => setActiveCollectionId(collection.id)}
              className={`px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-300 border shadow-subtle active:scale-[0.96] cursor-pointer ${
                isActive
                  ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                  : 'bg-brand-card text-brand-text border-brand-border hover:border-brand-blue'
              }`}
            >
              {collection.name}
            </button>
          );
        })}
      </div>

      {/* Lookbook Display Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCollection.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl sm:rounded-3xl bg-brand-card border border-brand-border p-3 sm:p-6 md:p-8 shadow-card overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            {/* Left: Editorial Moodboard Image & Story */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-subtle border border-white/60">
                <img
                  src={activeCollection.editorialImage}
                  alt={activeCollection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Content on Image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <div className="flex flex-wrap gap-1.5 mb-1.5 sm:mb-2">
                    {activeCollection.tags.map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-editorial font-bold leading-snug drop-shadow-sm">
                    {activeCollection.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/90 line-clamp-2 mt-0.5 sm:mt-1 font-normal">
                    {activeCollection.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Curated Matching Pieces */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    Lookbook Spotlight
                  </span>
                </div>
                <h4 className="text-base sm:text-xl font-editorial font-bold text-brand-text">
                  {activeCollection.tagline}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted mt-0.5 sm:mt-1 leading-relaxed max-w-xl">
                  {activeCollection.description}
                </p>
              </div>

              {/* Product Cards for this lookbook */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3">
                {collectionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Action Link */}
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-[11px] sm:text-xs text-brand-muted">
                  Delivered in 30–45 mins from nearby boutiques
                </span>
                <button
                  onClick={() => navigate('/trending')}
                  className="text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

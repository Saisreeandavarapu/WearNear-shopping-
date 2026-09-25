import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategorySection } from '../components/category/CategorySection';
import { HeroBanner } from '../components/home/HeroBanner';
import { TrustBenefits } from '../components/home/TrustBenefits';
import { StoreGallery } from '../components/home/StoreGallery';
import { ProductSection } from '../components/product/ProductSection';
import { CuratedCollections } from '../components/home/CuratedCollections';
import { BrandStatement } from '../components/home/BrandStatement';
import { HowItWorksTimeline } from '../components/home/HowItWorksTimeline';
import { PRODUCTS, COUPONS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Tag, Percent } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { genderMode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products by selected category and gender
  const baseProducts = PRODUCTS.filter(
    (p) => p.gender === genderMode || p.gender === 'unisex' || p.isTrending
  );

  const filteredTrending =
    selectedCategory === 'all'
      ? baseProducts.filter((p) => p.isTrending || true)
      : PRODUCTS.filter((p) => p.categorySlug.toLowerCase() === selectedCategory.toLowerCase());

  const trendingProducts = filteredTrending.length > 0 ? filteredTrending : baseProducts;
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const recommendedProducts = PRODUCTS.slice(4, 14);

  return (
    <div className="min-h-screen bg-brand-cream pb-20 md:pb-12 text-brand-text">
      {/* 1. Category Navigation with Minimal Outline Icons */}
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => setSelectedCategory(slug)}
      />

      {/* 2. Redesigned Premium Hero Banner */}
      <HeroBanner />

      {/* 3. Shopping Benefits (Local Stores, Fast Delivery, Authentic Products) */}
      <TrustBenefits />

      {/* 4. Trending Products Section (with Desktop Hover-to-Add-to-Cart & Mobile Touch Button) */}
      <ProductSection
        title="Trending Near You"
        subtitle="Discover styles from stores around your neighborhood."
        tag="Hyperlocal Hotlist"
        products={trendingProducts}
        viewAllLink="/trending"
        limit={10}
      />

      {/* 5. Featured Stores Section within 3 KM */}
      <StoreGallery />

      {/* 6. Special Offers & Promotional Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
        <div className="relative rounded-2xl sm:rounded-3xl bg-brand-card border border-brand-border p-3.5 sm:p-8 lg:p-10 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-center">
            <div className="lg:col-span-8 space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/20 text-[9px] sm:text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Boutique Welcome Offer</span>
              </span>
              <h3 className="text-lg sm:text-3xl lg:text-4xl font-editorial font-bold text-brand-text leading-tight">
                Get 50% Off Your First Local Order
              </h3>
              <p className="text-[11px] sm:text-sm text-brand-muted max-w-xl leading-relaxed">
                Use code <strong className="font-mono text-brand-blue font-bold">WEAR50</strong> at checkout to save up to ₹500 on all boutique pieces with free 30-minute delivery to your doorstep.
              </p>
              <div className="pt-0.5 sm:pt-2 flex flex-wrap gap-1 sm:gap-2">
                {COUPONS.map((cpn) => (
                  <span
                    key={cpn.code}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 bg-brand-cream/80 border border-brand-border rounded-lg sm:rounded-xl text-[9.5px] sm:text-xs font-bold text-brand-text"
                  >
                    <Percent className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-blue" />
                    <span>{cpn.code} — {cpn.description}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-2 sm:gap-3">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={() => navigate('/offers')}
                className="w-full sm:w-auto text-xs py-2 sm:text-sm sm:py-2.5"
              >
                View All Offers
              </Button>
              <span className="text-[9.5px] sm:text-[11px] text-brand-muted">Valid across all participating stores today</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals Section */}
      <ProductSection
        title="New Season Drops"
        subtitle="Fresh weekly boutique drops available for 30–45 minute local delivery."
        tag="Just Arrived"
        products={newArrivals}
        viewAllLink="/new-arrivals"
        limit={10}
      />

      {/* 8. Curated Collections & Lookbooks */}
      <CuratedCollections />

      {/* 9. Recommended Products */}
      <ProductSection
        title="Recommended For You"
        subtitle="Handpicked pieces matching your neighborhood aesthetic."
        tag="Personalized Edit"
        products={recommendedProducts}
        viewAllLink="/categories"
        limit={10}
      />

      {/* 10. Brand Manifesto (Desktop/Tablet only) */}
      <BrandStatement className="hidden md:block" />

      {/* 11. How WearNear Works Timeline (Desktop/Tablet only) */}
      <HowItWorksTimeline className="hidden md:block" />

      {/* 12. Doorstep Try & Fit Reassurance (Desktop/Tablet only) */}
      <section className="hidden md:block max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
        <div className="rounded-2xl sm:rounded-3xl bg-brand-card border border-brand-border p-3.5 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-subtle">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <span className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-blue bg-white border border-brand-border px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full inline-block">
              Zero Commitment · Instant Peace of Mind
            </span>
            <h3 className="text-base sm:text-2xl lg:text-3xl font-editorial font-bold text-brand-text leading-tight">
              Experience 10-Minute Doorstep Try &amp; Fit
            </h3>
            <p className="text-[11px] sm:text-sm text-brand-muted max-w-xl leading-relaxed">
              Order multiple sizes or matching separates from your nearby boutique. Try them on in your room while the courier waits. Keep what fits and hand the rest back immediately.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/stores')}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl sm:rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Find Nearby Boutiques
          </button>
        </div>
      </section>
    </div>
  );
};

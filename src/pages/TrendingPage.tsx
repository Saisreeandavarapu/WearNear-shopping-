import React from 'react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Flame } from 'lucide-react';

export const TrendingPage: React.FC = () => {
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending);

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-10">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-brand-blue text-brand-blue" />
            <span>Hyperlocal Hotlist</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-editorial font-bold text-brand-text tracking-tight">
            Trending Near You 🔥
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5 sm:mt-1">
            Most loved and fast-moving boutique pieces in your city right now
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivalsPage: React.FC = () => {
  const newProducts = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-10">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span>Weekly Fresh Drops</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-editorial font-bold text-brand-text tracking-tight">
            New Season Arrivals
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5 sm:mt-1">
            Just unboxed in neighborhood fashion studios and ready for same-day delivery
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

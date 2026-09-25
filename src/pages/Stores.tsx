import React, { useState } from 'react';
import { STORES } from '../data/mockData';
import { StoreCard } from '../components/ui/StoreCard';
import { useApp } from '../context/AppContext';
import { MapPin, Store, Clock, ShieldCheck } from 'lucide-react';

export const Stores: React.FC = () => {
  const { currentLocation, setIsLocationModalOpen } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'speed'>('distance');

  const categories = ['all', 'Women', 'Men', 'Footwear', 'Accessories', 'Ethnic', 'Winter'];

  let filteredStores = STORES.filter((store) => {
    if (filterCategory === 'all') return true;
    return store.categories.includes(filterCategory);
  });

  if (sortBy === 'distance') {
    filteredStores.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === 'rating') {
    filteredStores.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'speed') {
    filteredStores.sort((a, b) => a.deliveryMin - b.deliveryMin);
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-12 text-brand-text">
      {/* Header Banner */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-10">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
                <Store className="w-4 h-4" />
                <span>Hyperlocal Marketplace</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-editorial font-bold text-brand-text tracking-tight">
                Fashion Boutiques Near You
              </h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 flex flex-wrap items-center gap-1.5">
                <span>Showing verified shops delivering to</span>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="font-bold text-brand-text underline underline-offset-2 hover:text-brand-blue inline-flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  {currentLocation.split(',')[0]}
                </button>
              </p>
            </div>

            {/* Quick stats pills */}
            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <div className="flex-1 sm:flex-initial px-3 py-1.5 bg-white rounded-xl border border-brand-border text-[11px] sm:text-xs font-bold text-brand-text shadow-sm flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-blue" />
                <span>Avg. 28 min</span>
              </div>
              <div className="flex-1 sm:flex-initial px-3 py-1.5 bg-white rounded-xl border border-brand-border text-[11px] sm:text-xs font-bold text-brand-text shadow-sm flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                <span>Verified Outlets</span>
              </div>
            </div>
          </div>

          {/* Filter and Sort Bar */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-3.5 px-3.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all shrink-0 ${
                    filterCategory === cat
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-white text-brand-text border border-brand-border hover:border-brand-blue'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs">
              <span className="text-brand-muted font-medium shrink-0">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-brand-border rounded-xl px-3 py-1.5 font-bold text-brand-text focus:outline-none focus:border-brand-blue shadow-sm text-xs"
              >
                <option value="distance">Nearest Distance (km)</option>
                <option value="speed">Fastest Delivery (mins)</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

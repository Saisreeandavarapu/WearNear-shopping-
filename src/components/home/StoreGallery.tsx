import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STORES } from '../../data/mockData';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight, Star, MapPin, Clock, Sparkles } from 'lucide-react';

export const StoreGallery: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');

  const neighborhoods = ['All', 'Indiranagar', 'Koramangala', 'Lavelle Road', 'HSR Layout'];

  const filteredStores =
    selectedNeighborhood === 'All'
      ? STORES
      : STORES.filter((s) => s.address.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const featuredStore = filteredStores[0] || STORES[0];
  const otherStores = filteredStores.slice(1);

  return (
    <section className="relative max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-5 sm:py-12 border-b border-brand-border bg-brand-cream">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 gap-2.5 sm:gap-4">
        <div>
          <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-0.5 sm:mb-1">
            Hyperlocal Storefronts
          </span>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-editorial font-extrabold text-brand-text tracking-tight">
            LOCAL STORES WITHIN 3 KM
          </h2>
          <p className="text-[11px] sm:text-sm text-brand-muted mt-0.5 sm:mt-1 max-w-lg font-normal">
            Independent fashion boutiques and designer storefronts with instant 30–45 minute local courier delivery.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="secondary"
            size="sm"
            showArrow
            onClick={() => navigate('/stores')}
          >
            All 45+ Stores
          </Button>

          {/* Scroll Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-subtle cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-subtle cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Neighborhood Filter Chips */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-1.5 sm:pb-3 mb-3 sm:mb-6">
        {neighborhoods.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setSelectedNeighborhood(n)}
            className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedNeighborhood === n
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-brand-card text-brand-text border border-brand-border hover:border-brand-blue'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Horizontally Flowing Store Cards */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-2.5 sm:gap-5 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
      >
        {/* Featured Flagship Card */}
        <motion.div
          onClick={() => navigate(`/store/${featuredStore.id}`)}
          whileHover={{ y: -3 }}
          className="min-w-[240px] xs:min-w-[280px] sm:min-w-[380px] md:min-w-[440px] bg-brand-card rounded-2xl sm:rounded-3xl border border-brand-border overflow-hidden cursor-pointer shadow-subtle flex flex-col justify-between group shrink-0"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream/60">
            <img
              src={featuredStore.image}
              alt={featuredStore.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-text shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-blue" />
                Featured Boutique
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-brand-blue text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {featuredStore.deliveryMin}m
              </span>
            </div>

            <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold text-brand-text flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{featuredStore.rating}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-blue-light">
                {featuredStore.distanceKm} km away · {featuredStore.address.split(',')[1] || 'Indiranagar'}
              </p>
              <h3 className="text-lg sm:text-2xl font-editorial font-bold text-white drop-shadow-sm truncate">
                {featuredStore.name}
              </h3>
            </div>
          </div>

          <div className="p-3 sm:p-5 flex items-center justify-between bg-brand-card border-t border-brand-border/60">
            <div>
              <p className="text-xs text-brand-muted line-clamp-1">{featuredStore.tagLine}</p>
              <p className="text-[11px] font-semibold text-brand-blue mt-0.5 sm:mt-1">{featuredStore.promotion}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </motion.div>

        {/* Other Stores */}
        {otherStores.map((store) => (
          <motion.div
            key={store.id}
            onClick={() => navigate(`/store/${store.id}`)}
            whileHover={{ y: -3 }}
            className="min-w-[190px] xs:min-w-[220px] sm:min-w-[260px] bg-brand-card rounded-2xl sm:rounded-3xl border border-brand-border overflow-hidden cursor-pointer shadow-subtle flex flex-col justify-between group shrink-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream/60">
              <img
                src={store.image}
                alt={store.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1">
                <span className="bg-white/95 backdrop-blur-sm text-brand-text text-[8.5px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-sm">
                  <Clock className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-brand-blue" />
                  {store.deliveryMin}m
                </span>
                <span className="bg-white/95 backdrop-blur-sm text-brand-text text-[8.5px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-sm">
                  <MapPin className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-brand-blue" />
                  {store.distanceKm} km
                </span>
              </div>

              <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 bg-neutral-900/90 text-white text-[8.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{store.rating}</span>
              </div>

              {/* Bottom Store Name */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 text-white">
                <h4 className="text-xs sm:text-base font-editorial font-bold text-white truncate">
                  {store.name}
                </h4>
                <p className="text-[9px] sm:text-[10px] text-neutral-300 truncate mt-0.5">
                  {store.categories.join(' · ')}
                </p>
              </div>
            </div>

            <div className="p-2 sm:p-3.5 flex items-center justify-between bg-brand-card border-t border-brand-border/60">
              <span className="text-[9.5px] sm:text-[11px] font-medium text-brand-muted truncate max-w-[120px] sm:max-w-[170px]">
                {store.address.split(',')[0]}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-brand-blue group-hover:underline">
                Enter →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

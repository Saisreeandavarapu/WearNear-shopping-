import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store } from '../../types';
import { Star, MapPin, Clock, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  compact?: boolean;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, compact = false }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/store/${store.id}`)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-brand-card rounded-2xl border border-brand-border hover:border-brand-blue overflow-hidden cursor-pointer transition-all duration-300 shadow-subtle flex flex-col active:border-brand-blue"
    >
      {/* Cover Image */}
      <div className={`relative w-full ${compact ? 'h-24 sm:h-28' : 'h-28 sm:h-36'} bg-brand-cream/60 overflow-hidden`}>
        <img
          src={store.image}
          alt={store.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Delivery Time & Distance Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-sm text-brand-text text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <Clock className="w-2.5 h-2.5 text-brand-blue" />
            {store.deliveryMin} mins
          </span>
          <span className="bg-white/95 backdrop-blur-sm text-brand-text text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
            <MapPin className="w-2.5 h-2.5 text-brand-blue" />
            {store.distanceKm} km
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10 pointer-events-none">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>{store.rating}</span>
        </div>

        {/* Verified boutique pill */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-medium drop-shadow-sm pointer-events-none">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Verified Partner</span>
        </div>
      </div>

      {/* Store Information */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-grow justify-between bg-brand-card">
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-bold text-brand-text text-xs sm:text-sm group-hover:text-brand-blue transition-colors line-clamp-1">
              {store.name}
            </h3>
            <div className="w-6 h-6 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <p className="text-[11px] text-brand-muted mt-0.5 line-clamp-1">{store.tagLine}</p>
        </div>

        {/* Store Offer / Categories */}
        <div className="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between text-[10px] sm:text-[11px]">
          {store.promotion ? (
            <div className="flex items-center gap-1 text-brand-blue font-semibold truncate">
              <Tag className="w-3 h-3 shrink-0" />
              <span className="truncate">{store.promotion}</span>
            </div>
          ) : (
            <div className="text-brand-muted truncate">
              {store.categories.join(' • ')}
            </div>
          )}
          <span className="text-emerald-700 font-bold shrink-0 ml-1">Open</span>
        </div>
      </div>
    </motion.div>
  );
};

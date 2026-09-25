import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STORES, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Tag,
  Phone,
  Share2,
  ChevronRight
} from 'lucide-react';

export const StoreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useApp();
  const [selectedCategory] = useState<string>('all');

  const store = STORES.find((s) => s.id === id) || STORES[0];
  const storeProducts = PRODUCTS.filter((p) => p.storeId === store.id || p.storeName === store.name);

  const displayProducts = selectedCategory === 'all'
    ? (storeProducts.length > 0 ? storeProducts : PRODUCTS.slice(0, 4))
    : storeProducts.filter((p) => p.categorySlug.toLowerCase() === selectedCategory.toLowerCase());

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Store link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-12 text-brand-text">
      {/* Breadcrumb */}
      <div className="bg-brand-cream-dark/40 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs text-brand-muted flex items-center gap-1.5 sm:gap-2">
          <Link to="/" className="hover:text-brand-blue font-medium transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-border" />
          <Link to="/stores" className="hover:text-brand-blue font-medium transition-colors">Stores</Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-border" />
          <span className="text-brand-text font-bold truncate">{store.name}</span>
        </div>
      </div>

      {/* Store Hero Banner */}
      <div className="relative h-36 sm:h-56 md:h-64 bg-brand-text overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Store Header Card */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-4 sm:p-7 shadow-card border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-cream border-2 border-white shadow-md shrink-0">
              <img src={store.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text truncate">{store.name}</h1>
                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Verified
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 line-clamp-1">{store.tagLine}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-[11px] sm:text-xs text-brand-muted">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  <span>{store.address} ({store.distanceKm} km)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  <span>{store.deliveryMin} mins</span>
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <span>{store.rating} ({store.reviewsCount})</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-brand-border w-full md:w-auto">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-brand-border hover:bg-brand-cream text-brand-text transition-colors shrink-0"
              aria-label="Share Store"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href="tel:+918012345678"
              className="flex-1 md:flex-initial justify-center px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Boutique</span>
            </a>
          </div>
        </div>

        {/* Store Active Promotion Banner */}
        {store.promotion && (
          <div className="mt-3.5 sm:mt-4 p-3 sm:p-3.5 rounded-xl bg-brand-blue-light/70 border border-brand-blue/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-brand-blue">
            <div className="flex items-center gap-2 font-semibold">
              <Tag className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Store Special: {store.promotion}</span>
            </div>
            <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-bold text-brand-blue bg-white px-2.5 py-0.5 rounded-full border border-brand-blue/20 shrink-0">
              Applied at checkout
            </span>
          </div>
        )}

        {/* Store Catalog Section */}
        <div className="mt-6 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Inventory</span>
              <h2 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text tracking-tight">
                Collection in Stock
              </h2>
            </div>
            <span className="text-xs text-brand-muted font-medium">
              {displayProducts.length} items ready for immediate dispatch
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

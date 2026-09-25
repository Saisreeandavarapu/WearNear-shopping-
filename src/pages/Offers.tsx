import React from 'react';
import { COUPONS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { useApp } from '../context/AppContext';
import { Sparkles, Copy } from 'lucide-react';

export const Offers: React.FC = () => {
  const { applyCoupon, showToast } = useApp();

  const discountedProducts = PRODUCTS.filter((p) => p.isBestOffer || (p.discountPercent && p.discountPercent > 30));

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast(`Coupon code ${code} copied!`, 'success');
      applyCoupon(code);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-12 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-10">
        <div className="max-w-2xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue border border-brand-blue/30 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Local Deals &amp; Discounts</span>
          </span>
          <h1 className="text-xl sm:text-4xl font-editorial font-bold text-brand-text tracking-tight">
            Offers &amp; Exclusive Deals
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1.5 sm:mt-2">
            Enjoy up to 50% off boutique selections and complimentary local express delivery
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-10">
        {/* Active Coupons Grid */}
        <h2 className="text-base sm:text-lg font-editorial font-bold text-brand-text mb-3 sm:mb-4">Available Boutique Promo Codes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {COUPONS.map((cpn) => (
            <div
              key={cpn.code}
              className="p-3.5 sm:p-5 rounded-2xl bg-brand-card border-2 border-dashed border-brand-border flex flex-col justify-between shadow-subtle"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-extrabold text-sm sm:text-base text-brand-blue bg-brand-blue-light px-2.5 sm:px-3 py-1 rounded-lg border border-brand-blue/20">
                    {cpn.code}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Active</span>
                </div>
                <p className="text-xs font-bold text-brand-text mt-1">{cpn.description}</p>
                <p className="text-[11px] text-brand-muted mt-0.5">Min. Order ₹{cpn.minOrder}</p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-brand-border flex justify-end">
                <button
                  onClick={() => handleCopyCode(cpn.code)}
                  className="px-3.5 py-1.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-brand-blue-dark flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy &amp; Apply</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discounted Products Grid */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text">
            Top Discounted Boutique Picks
          </h2>
          <span className="text-xs text-brand-muted font-semibold">{discountedProducts.length} items</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-4">
          {discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

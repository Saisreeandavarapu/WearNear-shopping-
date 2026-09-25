import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, addToCart } = useApp();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Saved Items</span>
            <h1 className="text-xl sm:text-3xl font-editorial font-bold text-brand-text tracking-tight flex items-center gap-2 mt-0.5">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 text-red-500" />
              <span>My Wishlist</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5 sm:mt-1">
              {wishlistProducts.length} saved boutique items ready for instant doorstep delivery
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p));
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Cart</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-brand-border max-w-lg mx-auto p-6 sm:p-8 shadow-subtle">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-brand-blue/20">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-brand-blue" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-text">Your wishlist is empty</h3>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto leading-relaxed">
              Save your favorite dresses, shirts, and sneakers from local boutiques to track discounts and fast 30-min delivery.
            </p>
            <button
              onClick={() => navigate('/trending')}
              className="mt-5 sm:mt-6 px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Trending Near You</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ProductImage } from './ProductImage';
import { WishlistButton } from './WishlistButton';
import { AddToCartButton } from './AddToCartButton';
import { VariantSelector } from './VariantSelector';
import { CartToast } from './CartToast';
import { MapPin, Clock, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
  aspectRatio?: 'portrait' | 'square';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  aspectRatio = 'portrait',
}) => {
  const navigate = useNavigate();
  const { addToCart, showToast } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isVariantOpen, setIsVariantOpen] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    product.colors?.[0] || { name: 'Default', hex: '#191919' }
  );
  const [selectedSizeForToast, setSelectedSizeForToast] = useState<string | undefined>(undefined);

  const isOutOfStock = !product.inStock || product.stockCount <= 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOutOfStock) {
      showToast(`"${product.name}" is currently out of stock`, 'error');
      return;
    }

    // If product has multiple sizes, open variant selector modal
    const hasMultipleSizes = product.sizes && product.sizes.length > 1;

    if (hasMultipleSizes) {
      setIsVariantOpen(true);
      return;
    }

    // Otherwise add directly with defaults
    executeAddToCart(product.sizes?.[0] || 'Standard', selectedColor);
  };

  const executeAddToCart = (size: string, color?: { name: string; hex: string }) => {
    const chosenColor = color || selectedColor;
    addToCart(product, size, chosenColor, 1);
    setSelectedSizeForToast(size);
    setIsAdded(true);
    setShowCartToast(true);

    setTimeout(() => setIsAdded(false), 1600);
    setTimeout(() => setShowCartToast(false), 3500);
  };

  return (
    <>
      <motion.div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`group relative bg-brand-card rounded-xl sm:rounded-2xl border border-brand-border hover:border-brand-blue transition-all duration-300 shadow-subtle hover:shadow-card flex flex-col overflow-hidden cursor-pointer select-none ${className}`}
      >
        {/* Media / Image Area */}
        <div className="relative w-full bg-brand-cream/60 overflow-hidden">
          {/* Fashion Product Image */}
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            aspectRatio={aspectRatio}
            isHovered={isHovered}
          />

          {/* Top Badges (Distance, Discount, Stock) */}
          <div className="absolute top-1 sm:top-2.5 left-1 sm:left-2.5 flex flex-col gap-0.5 sm:gap-1.5 items-start z-10 pointer-events-none">
            {isOutOfStock ? (
              <span className="bg-neutral-800 text-white text-[7.5px] sm:text-[9px] font-extrabold px-1 sm:px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                Out of Stock
              </span>
            ) : product.discountPercent ? (
              <span className="bg-brand-blue text-white text-[7.5px] sm:text-[9px] font-extrabold px-1 sm:px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                {product.discountPercent}% OFF
              </span>
            ) : null}

            {product.distanceKm !== undefined && (
              <span className="flex items-center gap-0.5 sm:gap-1 bg-white/95 backdrop-blur-sm px-1 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold text-brand-text border border-brand-border shadow-subtle">
                <MapPin className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-brand-blue" />
                <span>{product.distanceKm} km</span>
              </span>
            )}
          </div>

          {/* Top Right: Wishlist Button */}
          <div className="absolute top-1 right-1 sm:top-2.5 sm:right-2.5 z-20 transition-transform duration-200 group-hover:scale-105">
            <WishlistButton productId={product.id} size="sm" />
          </div>

          {/* Bottom Left: Delivery ETA pill */}
          {product.deliveryMin && !isOutOfStock && (
            <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 bg-white/95 backdrop-blur-sm text-brand-text border border-brand-border text-[7.5px] sm:text-[9px] font-semibold px-1 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-subtle pointer-events-none">
              <Clock className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-brand-blue" />
              <span>{product.deliveryMin}m</span>
            </div>
          )}

          {/* Desktop Hover: Slide-up Royal Blue Add To Cart Button */}
          {!isOutOfStock && (
            <AddToCartButton
              onClick={handleAddToCartClick}
              isHovered={isHovered}
              isAdded={isAdded}
              variant="desktop-hover"
              className="hidden md:block"
            />
          )}
        </div>

        {/* Content Details Area */}
        <div className="p-2 sm:p-3 md:p-3.5 flex flex-col flex-grow justify-between bg-brand-card border-t border-brand-border/60">
          <div>
            {/* Store & Rating row */}
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <p className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-muted truncate">
                {product.storeName}
              </p>
              {product.rating && (
                <span className="flex items-center gap-0.5 text-[8.5px] sm:text-[10px] font-bold text-brand-text shrink-0">
                  <Star className="w-2 sm:w-2.5 h-2 sm:h-2.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </span>
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-[11px] sm:text-[13px] text-brand-text line-clamp-1 group-hover:text-brand-blue transition-colors leading-snug">
              {product.name}
            </h3>

            {/* Color Swatch Dots */}
            {product.colors && product.colors.length > 1 && (
              <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c);
                    }}
                    className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full border transition-all ${
                      selectedColor.name === c.name ? 'ring-1 sm:ring-1.5 ring-brand-blue ring-offset-0.5 sm:ring-offset-1 scale-110' : 'border-black/20 opacity-80'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price & Mobile Add To Cart Action */}
          <div className="mt-1.5 sm:mt-2.5 flex items-center justify-between gap-1">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap min-w-0">
              <span className="font-extrabold text-brand-text text-xs sm:text-sm truncate">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[8.5px] sm:text-xs text-brand-muted line-through truncate">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Mobile Touch-Friendly Action Button */}
            {!isOutOfStock && (
              <div className="md:hidden shrink-0">
                <AddToCartButton
                  onClick={handleAddToCartClick}
                  isAdded={isAdded}
                  variant="mobile-action"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Variant Selector Modal (if size selection needed) */}
      <VariantSelector
        product={product}
        isOpen={isVariantOpen}
        onClose={() => setIsVariantOpen(false)}
        onConfirm={(size, color) => executeAddToCart(size, color)}
      />

      {/* Confirmation Toast */}
      <CartToast
        product={product}
        size={selectedSizeForToast}
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
      />
    </>
  );
};

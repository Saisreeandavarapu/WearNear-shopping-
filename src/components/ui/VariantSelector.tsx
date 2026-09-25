import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types';
import { X, Check, ShoppingBag } from 'lucide-react';

interface VariantSelectorProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (size: string, color: { name: string; hex: string }) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: 'Default', hex: '#191919' }
  );

  const handleConfirm = () => {
    onConfirm(selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full sm:max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl border border-brand-border p-4 sm:p-6 shadow-2xl z-10 text-brand-text"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-cream border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header: Product Preview */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-brand-border pr-8">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-20 rounded-xl object-cover bg-brand-cream/50 border border-brand-border"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                  {product.storeName}
                </p>
                <h3 className="font-bold text-brand-text text-sm leading-snug line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-extrabold text-sm text-brand-text">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-brand-muted line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                    Select Size
                  </span>
                  <span className="text-[11px] font-semibold text-brand-blue">
                    Selected: {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-blue text-white border border-brand-blue shadow-sm'
                            : 'bg-brand-cream/50 text-brand-text border border-brand-border hover:border-brand-blue'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                    Select Color
                  </span>
                  <span className="text-[11px] font-medium text-brand-muted">
                    {selectedColor.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-blue-light border-brand-blue text-brand-blue font-bold'
                            : 'bg-brand-cream/50 border-brand-border text-brand-text hover:border-brand-blue'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Confirm Button */}
            <div className="mt-6 pt-3 border-t border-brand-border">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>CONFIRM &amp; ADD TO CART</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

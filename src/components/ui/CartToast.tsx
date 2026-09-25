import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

interface CartToastProps {
  product: Product | null;
  size?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({
  product,
  size,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-24 md:bottom-8 right-4 left-4 md:left-auto md:w-96 z-50 pointer-events-auto bg-brand-text text-white rounded-2xl p-3.5 shadow-2xl border border-brand-text flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-11 h-13 rounded-lg overflow-hidden bg-white/10 shrink-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-4 h-4 bg-brand-blue rounded-bl flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-light">
                Added to Bag
              </p>
              <h4 className="text-xs font-bold text-white truncate">
                {product.name}
              </h4>
              <p className="text-[11px] text-white/70">
                ₹{product.price.toLocaleString()} {size ? `· Size ${size}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/cart');
              }}
              className="px-3 py-1.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-dark font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <span>View Bag</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-lg text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

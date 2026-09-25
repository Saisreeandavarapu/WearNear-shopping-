import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  className = '',
  size = 'md',
}) => {
  const { toggleWishlist, isInWishlist } = useApp();
  const isFavorited = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-8 sm:h-8',
    lg: 'w-10 h-10',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`rounded-md bg-white/95 backdrop-blur-sm border border-[#DDD7CA] hover:border-[#293FC1] flex items-center justify-center text-[#191919] hover:text-[#293FC1] transition-all duration-200 shadow-subtle z-20 cursor-pointer ${sizeClasses} ${className}`}
    >
      <motion.div
        animate={{ scale: isFavorited ? [1, 1.35, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`${iconSizes} transition-colors ${
            isFavorited ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#191919] group-hover:text-[#293FC1]'
          }`}
          strokeWidth={1.8}
        />
      </motion.div>
    </motion.button>
  );
};

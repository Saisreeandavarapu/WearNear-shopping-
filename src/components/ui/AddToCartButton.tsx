import React from 'react';
import { Plus, ShoppingBag, Check } from 'lucide-react';

interface AddToCartButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isHovered?: boolean;
  isAdded?: boolean;
  className?: string;
  variant?: 'desktop-hover' | 'mobile-action';
  disabled?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  isHovered = false,
  isAdded = false,
  className = '',
  variant = 'desktop-hover',
  disabled = false,
}) => {
  if (variant === 'desktop-hover') {
    return (
      <div
        className={`absolute bottom-3 left-3 right-3 z-20 transition-all duration-300 transform ${
          isHovered
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
        } ${className}`}
      >
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`group/btn w-full py-2.5 px-3 rounded-lg font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243FBA] ${
            isAdded
              ? 'bg-[#16A34A] text-white'
              : 'bg-[#243FBA] hover:bg-[#172B82] text-white hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0'
          } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>ADDED TO BAG</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:rotate-90 group-hover/btn:scale-110" />
              <span>ADD TO CART</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Mobile Action Variant: Clean compact touch-accessible button
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isAdded ? 'Added to cart' : 'Add to cart'}
      className={`group/btn w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer shadow-sm select-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243FBA] ${
        isAdded
          ? 'bg-[#16A34A] text-white'
          : 'bg-[#243FBA] text-white hover:bg-[#172B82]'
      } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`}
    >
      {isAdded ? (
        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
      ) : (
        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
      )}
    </button>
  );
};

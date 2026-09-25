import React from 'react';
import { LucideIcon, ArrowRight, ArrowDown, Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  arrowDirection?: 'right' | 'down';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  showArrow = false,
  arrowDirection = 'right',
  fullWidth = false,
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'group inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243FBA] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] sm:text-xs gap-1.5',
    md: 'px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#243FBA] hover:bg-[#172B82] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 border border-[#243FBA]',
    secondary:
      'bg-[#FFFCF5] hover:bg-[#F5F0E6] text-[#191919] hover:text-[#243FBA] border border-[#DDD7CA] hover:border-[#243FBA] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 shadow-subtle',
    outline:
      'bg-transparent hover:bg-[#243FBA] text-[#243FBA] hover:text-white border border-[#243FBA] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 shadow-subtle',
    ghost:
      'bg-transparent hover:bg-[#243FBA]/10 text-[#191919] hover:text-[#243FBA] border border-transparent',
    danger:
      'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm hover:-translate-y-0.5 active:scale-[0.98]',
  };

  const ArrowIcon = arrowDirection === 'down' ? ArrowDown : ArrowRight;

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:scale-105" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:scale-105" />
          )}
          {showArrow && (
            <ArrowIcon
              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                arrowDirection === 'right'
                  ? 'group-hover:translate-x-1'
                  : 'group-hover:translate-y-0.5'
              }`}
            />
          )}
        </>
      )}
    </button>
  );
};

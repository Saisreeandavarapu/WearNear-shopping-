import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { Product } from '../../types';
import { ProductGrid } from './ProductGrid';
import { Button } from '../ui/Button';

interface ProductSectionProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  products: Product[];
  viewAllLink?: string;
  limit?: number;
  className?: string;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title = 'TRENDING NEAR YOU',
  subtitle = 'Discover styles from stores around your neighborhood.',
  tag = 'Hyperlocal Hotlist',
  products,
  viewAllLink = '/trending',
  limit = 10,
  className = '',
}) => {
  const navigate = useNavigate();
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className={`py-4 sm:py-10 bg-brand-cream border-b border-brand-border ${className}`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-8 gap-1.5 sm:gap-4">
          <div>
            {tag && (
              <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-bold text-brand-blue uppercase tracking-wider mb-0.5 sm:mb-1">
                <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-brand-blue text-brand-blue" />
                <span>{tag}</span>
              </div>
            )}
            <h2 className="text-base sm:text-2xl lg:text-3xl font-editorial font-extrabold tracking-tight text-brand-text">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] sm:text-sm text-brand-muted mt-0.5 sm:mt-1 font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {viewAllLink && (
            <Button
              variant="secondary"
              size="sm"
              showArrow
              onClick={() => navigate(viewAllLink)}
              className="shrink-0 self-start sm:self-auto"
            >
              View All
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={displayedProducts} />
      </div>
    </section>
  );
};

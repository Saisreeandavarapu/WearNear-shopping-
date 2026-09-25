import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 'standard' | 'compact';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className = '',
  columns = 'standard',
}) => {
  const gridClasses =
    columns === 'compact'
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4'
      : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4';

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

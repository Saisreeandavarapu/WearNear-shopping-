import React from 'react';
import { ArrowUpDown, SlidersHorizontal, X } from 'lucide-react';

export interface FilterState {
  category: string;
  priceRange: string;
  sizes: string[];
  colors: string[];
  brands: string[];
  store: string;
  inStockOnly: boolean;
  sortBy: 'recommended' | 'newest' | 'price_low' | 'price_high';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onOpenMobileDrawer: () => void;
  activeFilterCount: number;
  totalProductsCount: number;
  availableBrands?: string[];
  availableStores?: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onOpenMobileDrawer,
  activeFilterCount,
  totalProductsCount,
  availableBrands = ['Zara Urban', 'H&M', 'FabIndia', 'Levi’s', 'Nike Local', 'Vogue Studio'],
  availableStores = ['StyleHub Boutique', 'TrendKart Studio', 'Urban Threads', 'Heritage Silks'],
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as FilterState['sortBy'],
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      priceRange: e.target.value,
    });
  };

  const handleStockToggle = () => {
    onFilterChange({
      ...filters,
      inStockOnly: !filters.inStockOnly,
    });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onFilterChange({
      ...filters,
      brands: val ? [val] : [],
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: 'all',
      priceRange: 'all',
      sizes: [],
      colors: [],
      brands: [],
      store: 'all',
      inStockOnly: false,
      sortBy: 'recommended',
    });
  };

  return (
    <div className="w-full bg-[#FFFCF5] border-y border-[#DDD7CA] py-3 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Side: Desktop Quick Filter Dropdowns */}
        <div className="hidden md:flex items-center gap-2.5 flex-wrap">
          {/* Price Range Filter */}
          <select
            value={filters.priceRange}
            onChange={handlePriceChange}
            className="px-3 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA] text-xs font-medium text-[#191919] hover:border-[#243FBA] focus:outline-none cursor-pointer"
          >
            <option value="all">Price: All</option>
            <option value="under_1000">Under ₹1,000</option>
            <option value="1000_2500">₹1,000 – ₹2,500</option>
            <option value="2500_5000">₹2,500 – ₹5,000</option>
            <option value="above_5000">₹5,000+</option>
          </select>

          {/* Brand Filter */}
          <select
            value={filters.brands[0] || ''}
            onChange={handleBrandChange}
            className="px-3 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA] text-xs font-medium text-[#191919] hover:border-[#243FBA] focus:outline-none cursor-pointer"
          >
            <option value="">Brand: All</option>
            {availableBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* In Stock Only Toggle */}
          <button
            type="button"
            onClick={handleStockToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              filters.inStockOnly
                ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:border-[#243FBA]'
            }`}
          >
            In Stock Only
          </button>

          {/* Reset Action */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenMobileDrawer}
            className="px-3.5 py-2 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA] text-xs font-bold text-[#191919] flex items-center gap-2 cursor-pointer shadow-subtle hover:border-[#243FBA]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#243FBA]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#243FBA] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs text-[#686868]">
            {totalProductsCount} styles
          </span>
        </div>

        {/* Right Side: Sorting & Product Count */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-xs text-[#686868]">
            Showing {totalProductsCount} items
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#686868] hidden sm:inline" />
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="px-3 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DDD7CA] text-xs font-semibold text-[#191919] hover:border-[#243FBA] focus:outline-none cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="newest">Sort: Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, RotateCcw } from 'lucide-react';
import { FilterState } from './FilterBar';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalProductsCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  totalProductsCount,
}) => {
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige', hex: '#E8D8C8' },
    { name: 'Royal Blue', hex: '#243FBA' },
    { name: 'Navy', hex: '#172B82' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Red', hex: '#EF4444' },
  ];
  const brandOptions = ['Zara Urban', 'H&M', 'FabIndia', 'Levi’s', 'Nike Local', 'Vogue Studio'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹1,000', value: 'under_1000' },
    { label: '₹1,000 – ₹2,500', value: '1000_2500' },
    { label: '₹2,500 – ₹5,000', value: '2500_5000' },
    { label: 'Above ₹5,000', value: 'above_5000' },
  ];

  const toggleSize = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const toggleColor = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const toggleBrand = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const clearAll = () => {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#FFFCF5] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden border-l border-[#DDD7CA]"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#DDD7CA] flex items-center justify-between bg-[#FFFCF5]">
              <div>
                <h3 className="text-base font-bold text-[#191919]">Filters &amp; Sort</h3>
                <p className="text-xs text-[#686868] mt-0.5">
                  Refine {totalProductsCount} boutique styles
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5F0E6] border border-[#DDD7CA] flex items-center justify-center text-[#686868] hover:text-[#191919] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Filter Content */}
            <div className="p-4 sm:p-5 flex-grow overflow-y-auto space-y-6">
              {/* Availability Filter */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
                  Availability
                </span>
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#DDD7CA] bg-[#F5F0E6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) =>
                      onFilterChange({ ...filters, inStockOnly: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#243FBA] focus:ring-0 accent-[#243FBA]"
                  />
                  <span className="text-xs font-medium text-[#191919]">
                    Show In-Stock Only (Instant 30m Dispatch)
                  </span>
                </label>
              </div>

              {/* Price Range */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((pr) => (
                    <button
                      key={pr.value}
                      type="button"
                      onClick={() => onFilterChange({ ...filters, priceRange: pr.value })}
                      className={`p-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                        filters.priceRange === pr.value
                          ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                          : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919]'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
                  Sizes
                </span>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((sz) => {
                    const active = filters.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        className={`min-w-[42px] px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#243FBA] text-white border-[#243FBA]'
                            : 'bg-[#F5F0E6] text-[#191919] border-[#DDD7CA] hover:border-[#243FBA]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
                  Colors
                </span>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((col) => {
                    const active = filters.colors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => toggleColor(col.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                            : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:border-[#243FBA]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        {active && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
                  Brands &amp; Boutiques
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {brandOptions.map((b) => {
                    const active = filters.brands.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBrand(b)}
                        className={`p-2 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                            : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:border-[#243FBA]'
                        }`}
                      >
                        <span className="truncate">{b}</span>
                        {active && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pb-6 sm:pb-4 border-t border-[#DDD7CA] bg-[#FFFCF5] flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="w-1/3 py-2.5 sm:py-3 rounded-xl border border-[#DDD7CA] text-xs font-bold uppercase tracking-wider text-[#191919] hover:bg-[#F5F0E6] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-2/3 py-2.5 sm:py-3 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Apply ({totalProductsCount})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { ChevronRight, SlidersHorizontal, ArrowUpDown, X, Check, RotateCcw } from 'lucide-react';
import { CategorySection } from '../components/category/CategorySection';

export const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating' | 'fastest'>('popular');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const category = CATEGORIES.find((c) => c.slug === slug) || {
    id: 'unknown',
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Collection',
    slug: slug || 'all',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    itemCount: 40
  };

  const allAvailableBrands = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  }, []);

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setPriceRange('all');
    setSelectedSizes([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setMaxDistance(10);
    setSortBy('popular');
  };

  const hasActiveFilters =
    priceRange !== 'all' ||
    selectedSizes.length > 0 ||
    selectedBrands.length > 0 ||
    inStockOnly ||
    maxDistance < 10;

  // Filter products
  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category match
      if (slug && slug !== 'all' && p.categorySlug.toLowerCase() !== slug.toLowerCase()) {
        return false;
      }

      // Distance
      if (p.distanceKm > maxDistance) return false;

      // Price Range
      if (priceRange === 'under_1000' && p.price >= 1000) return false;
      if (priceRange === '1000_2500' && (p.price < 1000 || p.price > 2500)) return false;
      if (priceRange === '2500_5000' && (p.price < 2500 || p.price > 5000)) return false;
      if (priceRange === 'above_5000' && p.price < 5000) return false;

      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Stock
      if (inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    });

    // Fallback if specific slug has no seeded items
    if (result.length === 0 && !hasActiveFilters) {
      result = PRODUCTS.slice(0, 12);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fastest') return a.deliveryMin - b.deliveryMin;
      return 0; // popular / default
    });

    return result;
  }, [slug, maxDistance, priceRange, selectedSizes, selectedBrands, inStockOnly, sortBy, hasActiveFilters]);

  const displayedProducts = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#F5F0E6] pb-20 md:pb-16 text-[#191919]">
      {/* Category Icon Navigation Strip */}
      <CategorySection selectedCategory={slug || 'all'} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-[#686868]">
          <Link to="/" className="hover:text-[#243FBA] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDD7CA]" />
          <Link to="/categories" className="hover:text-[#243FBA] transition-colors">Categories</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDD7CA]" />
          <span className="font-semibold text-[#191919] truncate max-w-[150px]">{category.name}</span>
        </nav>
      </div>

      {/* Category Header */}
      <div className="bg-[#FFFCF5] border-y border-[#DDD7CA] py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#243FBA] bg-[#E8ECFF] border border-[#243FBA]/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full inline-block mb-1 sm:mb-2 shadow-subtle">
                Hyperlocal Department
              </span>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-extrabold text-[#191919] tracking-tight">
                {category.name}
              </h1>
              <p className="text-[11px] sm:text-sm text-[#686868] mt-0.5 sm:mt-1 max-w-xl">
                Browse verified boutique apparel available for 30–45 minute doorstep delivery.
              </p>
            </div>

            {/* Quick Actions & Sort Control */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 md:pt-0">
              <button
                type="button"
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] hover:border-[#243FBA] text-xs font-semibold text-[#191919] hover:text-[#243FBA] shadow-subtle cursor-pointer transition-colors active:scale-95"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#243FBA]" />
                <span>Filters {hasActiveFilters && `(${selectedSizes.length + selectedBrands.length + (priceRange !== 'all' ? 1 : 0)})`}</span>
              </button>

              <div className="flex items-center gap-1.5 bg-[#FFFCF5] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-[#DDD7CA] text-xs shadow-subtle">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#686868]" />
                <span className="text-[#686868] hidden xs:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="font-bold text-[#191919] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="popular">Recommended</option>
                  <option value="fastest">Fastest Delivery</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mt-3 pt-2.5 border-t border-[#DDD7CA] flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-[#686868] font-medium text-[11px] sm:text-xs">Active:</span>
              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#FFFCF5] border border-[#DDD7CA] rounded-full text-[11px] sm:text-xs font-semibold text-[#191919]">
                  Price: {priceRange.replace('_', ' ').toUpperCase()}
                  <button type="button" onClick={() => setPriceRange('all')} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedSizes.map((size) => (
                <span key={size} className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#FFFCF5] border border-[#DDD7CA] rounded-full text-[11px] sm:text-xs font-semibold text-[#191919]">
                  Size: {size}
                  <button type="button" onClick={() => toggleSize(size)} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {selectedBrands.map((brand) => (
                <span key={brand} className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#FFFCF5] border border-[#DDD7CA] rounded-full text-[11px] sm:text-xs font-semibold text-[#191919]">
                  {brand}
                  <button type="button" onClick={() => toggleBrand(brand)} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#FFFCF5] border border-[#DDD7CA] rounded-full text-[11px] sm:text-xs font-semibold text-[#191919]">
                  In Stock Only
                  <button type="button" onClick={() => setInStockOnly(false)} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#243FBA] hover:underline ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout with Filter Drawer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {showFilterDrawer && (
          <div className="mb-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FFFCF5] border border-[#DDD7CA] shadow-card animate-slide-up">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#DDD7CA] mb-4 sm:mb-5">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#191919]">Refine Selection</h3>
              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="text-xs font-bold text-[#686868] hover:text-[#191919] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Price Filter */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#686868] mb-2 sm:mb-3">Price Range</p>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'All Prices', val: 'all' },
                    { label: 'Under ₹1,000', val: 'under_1000' },
                    { label: '₹1,000 – ₹2,500', val: '1000_2500' },
                    { label: '₹2,500 – ₹5,000', val: '2500_5000' },
                    { label: 'Above ₹5,000', val: 'above_5000' },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setPriceRange(p.val)}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        priceRange === p.val
                          ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                          : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:bg-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#686868] mb-2 sm:mb-3">Available Sizes</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {sizeOptions.map((sz) => {
                    const isSelected = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        className={`min-w-[38px] px-2 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#243FBA] border-[#243FBA] text-white shadow-sm'
                            : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:border-[#243FBA]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#686868] mb-2 sm:mb-3">Local Brands</p>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {allAvailableBrands.map((b) => {
                    const isSelected = selectedBrands.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBrand(b)}
                        className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#E8ECFF] border-[#243FBA] text-[#243FBA] font-bold'
                            : 'bg-[#F5F0E6] border-[#DDD7CA] text-[#191919] hover:bg-white'
                        }`}
                      >
                        <span>{b}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#243FBA]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Proximity / In-Stock */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#686868] mb-2 sm:mb-3">Store Proximity</p>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[#686868] block mb-1">Max Distance: <strong className="text-[#191919]">{maxDistance} km</strong></span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(Number(e.target.value))}
                      className="w-full accent-[#243FBA]"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-2 border-t border-[#DDD7CA]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#243FBA] rounded w-4 h-4"
                    />
                    <span className="font-semibold text-[#191919]">In Stock for Immediate Dispatch</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs text-[#686868]">
          <span>Showing <strong>{displayedProducts.length}</strong> of <strong>{filtered.length}</strong> local products</span>
          <span className="hidden sm:inline">All items delivered locally via courier in 30-45 mins</span>
        </div>

        {/* Products Grid: 2 columns on mobile */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#FFFCF5] border border-[#DDD7CA]">
            <p className="text-base sm:text-lg font-bold text-[#191919]">No products match your current filters</p>
            <p className="text-xs sm:text-sm text-[#686868] mt-1.5 max-w-md mx-auto">
              Try expanding your search radius or clearing active size and price filters to discover more items.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={resetFilters}
              className="mt-4"
            >
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Controlled Pagination / Load More */}
        {visibleCount < filtered.length && (
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              variant="secondary"
              size="md"
              showArrow
              arrowDirection="down"
              onClick={() => setVisibleCount((prev) => prev + 12)}
            >
              Load More Styles ({filtered.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

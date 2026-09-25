import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ui/ProductCard';
import { useApp } from '../context/AppContext';
import { Search, X } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { searchQuery, setSearchQuery } = useApp();

  const [inputVal, setInputVal] = useState(queryParam || searchQuery);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(6000);

  useEffect(() => {
    if (queryParam) {
      setInputVal(queryParam);
      setSearchQuery(queryParam);
    }
  }, [queryParam, setSearchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(inputVal.trim() ? { q: inputVal.trim() } : {});
  };

  const results = PRODUCTS.filter((p) => {
    const matchesQuery =
      !inputVal.trim() ||
      p.name.toLowerCase().includes(inputVal.toLowerCase()) ||
      p.brand.toLowerCase().includes(inputVal.toLowerCase()) ||
      p.categorySlug.toLowerCase().includes(inputVal.toLowerCase()) ||
      p.storeName.toLowerCase().includes(inputVal.toLowerCase());

    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    const matchesPrice = p.price <= selectedMaxPrice;

    return matchesQuery && matchesBrand && matchesPrice;
  });

  const allBrands = ['all', ...Array.from(new Set(PRODUCTS.map((p) => p.brand)))];

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-12 text-brand-text">
      {/* Search Header Bar */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search clothes, footwear, local stores, brands..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-2.5 sm:py-3.5 bg-white border border-brand-border rounded-xl sm:rounded-2xl text-xs sm:text-base placeholder:text-brand-muted focus:outline-none focus:border-brand-blue shadow-card transition-all"
            />
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
            {inputVal && (
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  setSearchParams({});
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text p-1"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </form>

          {/* Quick Trending Searches */}
          <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs -mx-3.5 px-3.5 pb-1">
            <span className="text-brand-muted font-medium shrink-0 text-[11px] sm:text-xs">Popular:</span>
            {['Linen Dress', 'Oxford Shirt', 'Sneakers', 'Tote Bag', 'Denim Jacket', 'Watch'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setInputVal(tag);
                  setSearchParams({ q: tag });
                }}
                className="px-2.5 py-1 bg-white hover:bg-brand-blue-light hover:text-brand-blue rounded-lg border border-brand-border text-brand-text text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors shrink-0"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Results Info & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-brand-border">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Catalog Search</span>
            <h2 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text">
              {inputVal ? `Results for "${inputVal}"` : 'All Available Nearby Products'}
            </h2>
            <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5">Found {results.length} authentic items</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs w-full sm:w-auto">
            {/* Brand Filter */}
            <div className="flex-1 sm:flex-initial flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border shadow-sm">
              <span className="text-brand-muted font-medium text-[11px] sm:text-xs">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent font-bold text-brand-text text-xs focus:outline-none flex-1"
              >
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'all' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-1 sm:flex-initial flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border shadow-sm">
              <span className="text-brand-muted font-medium text-[11px] sm:text-xs">Under:</span>
              <select
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="bg-transparent font-bold text-brand-text text-xs focus:outline-none flex-1"
              >
                <option value={2000}>₹2,000</option>
                <option value={4000}>₹4,000</option>
                <option value={6000}>₹6,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-4 mt-3 sm:mt-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-brand-border max-w-lg mx-auto p-6 sm:p-8 shadow-subtle mt-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-brand-blue/20">
              <Search className="w-6 h-6 sm:w-7 sm:h-7 text-brand-blue" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-text">No matching local products found</h3>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto leading-relaxed">
              Try checking your spelling or use more general terms like &ldquo;shirt&rdquo;, &ldquo;dress&rdquo;, or &ldquo;sneakers&rdquo;.
            </p>
            <button
              onClick={() => {
                setInputVal('');
                setSelectedBrand('all');
                setSelectedMaxPrice(6000);
                setSearchParams({});
              }}
              className="mt-5 sm:mt-6 px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

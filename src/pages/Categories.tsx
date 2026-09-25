import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE_CATEGORIES } from '../components/category/CategorySection';
import { Sparkles, Search, X } from 'lucide-react';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = HOMEPAGE_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-cream pb-20 md:pb-12 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-blue mb-2.5 shadow-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue" />
            <span>Curated Fashion Departments</span>
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-editorial font-bold text-brand-text tracking-tight">
            All Fashion Categories
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-md mx-auto">
            Browse handpicked clothing, footwear, and accessories from local boutique curators
          </p>

          {/* Quick Search */}
          <div className="mt-4 sm:mt-5 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Filter categories (e.g. Sarees, Sneakers, Jackets)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 sm:py-2.5 bg-white border border-brand-border rounded-full text-xs text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-blue shadow-sm"
            />
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-muted absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2" />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Grid - Icon Based */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.slug === 'all') navigate('/');
                  else navigate(`/category/${cat.slug}`);
                }}
                className="group relative flex flex-col items-center justify-center p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-brand-card sm:hover:bg-brand-blue border border-brand-border sm:hover:border-brand-blue text-brand-text sm:hover:text-white transition-all duration-300 shadow-subtle sm:hover:shadow-card active:scale-[0.97] cursor-pointer select-none"
              >
                {/* Icon Container */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-brand-cream/80 sm:group-hover:bg-white/20 text-brand-text sm:group-hover:text-white flex items-center justify-center transition-all duration-300 border border-brand-border/60 sm:group-hover:border-transparent mb-1.5 sm:mb-2.5 shadow-inner">
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-300 sm:group-hover:scale-110" strokeWidth={1.8} />
                </div>

                <h3 className="font-bold text-[11px] sm:text-sm tracking-tight text-center text-brand-text sm:group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[8.5px] sm:text-[10px] text-brand-muted sm:group-hover:text-brand-blue-light transition-colors mt-0.5">
                  Explore →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

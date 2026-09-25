import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory?: (slug: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory = 'all',
  onSelectCategory
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accentColor, accentBgLight, genderMode } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      if (location.pathname === '/') {
        // on homepage, can just set query or filter
        navigate(slug === 'all' ? '/' : `/category/${slug}`);
      } else {
        navigate(`/category/${slug}`);
      }
    }
  };

  // Filter or prioritize categories based on genderMode if applicable
  const displayCategories = CATEGORIES;

  return (
    <div className="relative bg-white border-b border-[#E5E7EB] py-3 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
        {/* Left Scroll Arrow (Desktop) */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll categories left"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Categories Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth px-1"
        >
          {displayCategories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`flex flex-col items-center gap-1.5 shrink-0 group/item transition-all duration-200 focus:outline-none`}
              >
                {/* Image/Icon Tile */}
                <div
                  style={{
                    borderColor: isSelected ? accentColor : 'transparent',
                    backgroundColor: isSelected ? accentBgLight : '#F7F7FA'
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1 border-2 flex items-center justify-center transition-all duration-200 group-hover/item:scale-105 shadow-subtle overflow-hidden`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Category Label */}
                <span
                  style={{ color: isSelected ? accentColor : undefined }}
                  className={`text-[11px] sm:text-xs font-medium text-center whitespace-nowrap max-w-[72px] truncate transition-colors ${
                    isSelected ? 'font-bold' : 'text-neutral-700 group-hover/item:text-neutral-900'
                  }`}
                  title={cat.name}
                >
                  {cat.name}
                </span>

                {/* Active Indicator Underline */}
                {isSelected && (
                  <div
                    style={{ backgroundColor: accentColor }}
                    className="w-4 h-1 rounded-full -mt-1 animate-pulse"
                  />
                )}
              </button>
            );
          })}

          {/* View All Categories Link Tile */}
          <button
            onClick={() => navigate('/categories')}
            className="flex flex-col items-center gap-1.5 shrink-0 group/item transition-all duration-200 focus:outline-none pr-2"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1 border-2 border-dashed border-gray-300 bg-[#F7F7FA] group-hover/item:border-neutral-900 group-hover/item:bg-neutral-100 flex flex-col items-center justify-center transition-all duration-200 group-hover/item:scale-105 shadow-subtle">
              <span className="text-[11px] font-bold text-neutral-800">40+</span>
              <span className="text-[9px] font-semibold text-gray-500 uppercase">All</span>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-700 group-hover/item:text-neutral-900 whitespace-nowrap">
              View All
            </span>
          </button>
        </div>

        {/* Right Scroll Arrow (Desktop) */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll categories right"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

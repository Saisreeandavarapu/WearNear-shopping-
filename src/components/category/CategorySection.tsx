import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  User,
  Smile,
  Shirt,
  Layers,
  Wand2,
  Scissors,
  Flower2,
  Feather,
  Crown,
  Footprints,
  Activity,
  ShoppingBag,
  Gem,
  Watch,
  Glasses,
  Palette,
  Dumbbell,
  Shield,
  Disc,
  Briefcase,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { CategoryItem } from './CategoryItem';
import type { CategoryData } from './CategoryItem';

export const HOMEPAGE_CATEGORIES: CategoryData[] = [
  { id: 'cat-all', name: 'All', slug: 'all', icon: Sparkles },
  { id: 'cat-women', name: 'Women', slug: 'women', icon: Heart },
  { id: 'cat-men', name: 'Men', slug: 'men', icon: User },
  { id: 'cat-kids', name: 'Kids', slug: 'kids', icon: Smile },
  { id: 'cat-shirts', name: 'Shirts', slug: 'shirts', icon: Shirt },
  { id: 'cat-tshirts', name: 'T-Shirts', slug: 't-shirts', icon: Layers },
  { id: 'cat-dresses', name: 'Dresses', slug: 'dresses', icon: Wand2 },
  { id: 'cat-jeans', name: 'Jeans', slug: 'jeans', icon: Scissors },
  { id: 'cat-kurtis', name: 'Kurtis', slug: 'kurtis', icon: Flower2 },
  { id: 'cat-sarees', name: 'Sarees', slug: 'sarees', icon: Feather },
  { id: 'cat-ethnic', name: 'Ethnic Wear', slug: 'ethnic-wear', icon: Crown },
  { id: 'cat-footwear', name: 'Footwear', slug: 'footwear', icon: Footprints },
  { id: 'cat-sneakers', name: 'Sneakers', slug: 'sneakers', icon: Activity },
  { id: 'cat-bags', name: 'Bags', slug: 'bags', icon: ShoppingBag },
  { id: 'cat-jewellery', name: 'Jewellery', slug: 'jewellery', icon: Gem },
  { id: 'cat-watches', name: 'Watches', slug: 'watches', icon: Watch },
  { id: 'cat-accessories', name: 'Accessories', slug: 'accessories', icon: Glasses },
  { id: 'cat-beauty', name: 'Beauty', slug: 'beauty', icon: Palette },
  { id: 'cat-sportswear', name: 'Sportswear', slug: 'sportswear', icon: Dumbbell },
  { id: 'cat-jackets', name: 'Jackets', slug: 'jackets', icon: Shield },
  { id: 'cat-hoodies', name: 'Hoodies', slug: 'hoodies', icon: Disc },
  { id: 'cat-formal', name: 'Formal Wear', slug: 'formal-wear', icon: Briefcase },
  { id: 'cat-party', name: 'Party Wear', slug: 'party-wear', icon: PartyPopper },
];

interface CategorySectionProps {
  selectedCategory?: string;
  onSelectCategory?: (slug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [checkScroll]);

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === 'left' ? -260 : 260,
      behavior: 'smooth',
    });
  };

  const handleSelect = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
      return;
    }

    if (slug === 'all') {
      navigate('/');
      return;
    }

    navigate(`/category/${slug}`);
  };

  return (
    <section className="relative w-full select-none border-b border-brand-border bg-brand-cream py-1.5 sm:py-3.5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
              className="
                absolute -left-3.5 top-1/2 z-20 hidden
                h-8 w-8 -translate-y-1/2 items-center justify-center
                rounded-full border border-brand-border bg-white
                text-brand-text shadow-md transition-colors duration-200
                hover:border-brand-blue hover:bg-brand-blue hover:text-white
                md:flex cursor-pointer
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Scrollable Categories Strip */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="
              no-scrollbar flex items-center gap-1 sm:gap-2.5 md:gap-3
              overflow-x-auto scroll-smooth px-0.5 py-0.5 sm:py-1
            "
          >
            {HOMEPAGE_CATEGORIES.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.slug}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
              className="
                absolute -right-3.5 top-1/2 z-20 hidden
                h-8 w-8 -translate-y-1/2 items-center justify-center
                rounded-full border border-brand-border bg-white
                text-brand-text shadow-md transition-colors duration-200
                hover:border-brand-blue hover:bg-brand-blue hover:text-white
                md:flex cursor-pointer
              "
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
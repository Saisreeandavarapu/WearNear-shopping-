import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
}

interface CategoryItemProps {
  category: CategoryData;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  const Icon = category.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category.slug)}
      whileTap={{ scale: 0.94 }}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center shrink-0 p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 focus:outline-none cursor-pointer sm:hover:-translate-y-0.5 sm:hover:shadow-md select-none ${
        isSelected
          ? 'bg-[#243FBA] text-white border border-[#243FBA] shadow-md ring-2 ring-[#243FBA] ring-offset-1 sm:ring-offset-2 ring-offset-[#F5F0E6]'
          : 'bg-[#FFFCF5] sm:hover:bg-[#243FBA] text-[#191919] sm:hover:text-white border border-[#DDD7CA] sm:hover:border-[#243FBA] shadow-subtle'
      }`}
    >
      {/* Icon Container */}
      <div
        className={`w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-[#F5F0E6] text-[#191919] sm:group-hover:bg-white/20 sm:group-hover:text-white border border-[#DDD7CA]/60 sm:group-hover:border-transparent'
        }`}
      >
        <Icon
          className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors duration-200 text-current"
          strokeWidth={isSelected ? 2.2 : 1.9}
        />
      </div>

      {/* Category Name Label */}
      <span
        className={`mt-1 sm:mt-1.5 text-[9px] sm:text-[11px] md:text-xs tracking-tight transition-colors duration-200 text-center whitespace-nowrap max-w-[58px] sm:max-w-[80px] md:max-w-[88px] truncate ${
          isSelected
            ? 'font-bold text-white'
            : 'font-semibold text-[#191919] sm:group-hover:text-white'
        }`}
        title={category.name}
      >
        {category.name}
      </span>

      {/* Distinct Active Selected Indicator */}
      {isSelected ? (
        <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5 sm:mt-1 shadow-sm" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-transparent mt-0.5 sm:mt-1" />
      )}
    </motion.button>
  );
};

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
      className={`group relative flex flex-col items-center shrink-0 p-1 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none cursor-pointer sm:hover:-translate-y-0.5 sm:hover:shadow-md select-none ${
        isSelected
          ? 'bg-[#243FBA] text-white border border-[#243FBA] shadow-md ring-2 ring-[#243FBA] ring-offset-1 sm:ring-offset-2 ring-offset-[#F5F0E6]'
          : 'bg-[#FFFCF5] sm:hover:bg-[#243FBA] text-[#191919] sm:hover:text-white border border-[#DDD7CA] sm:hover:border-[#243FBA] shadow-subtle'
      }`}
    >
      {/* Icon Container */}
      <div
        className={`w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-[#F5F0E6] text-[#191919] sm:group-hover:bg-white/20 sm:group-hover:text-white border border-[#DDD7CA]/60 sm:group-hover:border-transparent'
        }`}
      >
        <Icon
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-colors duration-200 text-current"
          strokeWidth={isSelected ? 2.2 : 1.9}
        />
      </div>

      {/* Category Name Label */}
      <span
        className={`mt-0.5 sm:mt-1 text-[8.5px] sm:text-[10px] md:text-[11px] tracking-tight transition-colors duration-200 text-center whitespace-nowrap max-w-[54px] sm:max-w-[74px] md:max-w-[82px] truncate ${
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

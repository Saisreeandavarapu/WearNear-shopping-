import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/mockData';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EditorialCategories: React.FC = () => {
  const navigate = useNavigate();
  const { accentColor } = useApp();

  // Highlight key collections
  const womenCat = CATEGORIES.find((c) => c.slug === 'women') || CATEGORIES[1];
  const menCat = CATEGORIES.find((c) => c.slug === 'men') || CATEGORIES[2];
  const footwearCat = CATEGORIES.find((c) => c.slug === 'footwear') || CATEGORIES[4];

  // Secondary compact categories
  const secondaryCategories = CATEGORIES.filter(
    (c) => c.slug !== 'all' && c.slug !== 'women' && c.slug !== 'men' && c.slug !== 'footwear'
  ).slice(0, 6);

  return (
    <section className="relative max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-5 sm:py-14 border-b border-brand-border">
      {/* Vertical Section Indicator for Desktop */}
      <div className="hidden lg:flex absolute left-2 top-14 z-10 flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brand-muted [writing-mode:vertical-rl] rotate-180">
          02 — SHOP THE EDIT
        </span>
        <div className="w-[1px] h-12 bg-brand-border" />
      </div>

      <div className="lg:pl-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-2 sm:gap-4">
          <div>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue block mb-0.5 sm:mb-1">
              Curated Departments
            </span>
            <h2 className="text-lg sm:text-3xl md:text-4xl font-editorial font-bold text-brand-text tracking-tight">
              WHAT ARE YOU LOOKING FOR?
            </h2>
            <p className="text-[11px] sm:text-sm text-brand-muted mt-0.5 sm:mt-1 max-w-lg">
              Explore handpicked edits across apparel, footwear, and accessories from neighborhood boutiques.
            </p>
          </div>

          <button
            onClick={() => navigate('/categories')}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-text hover:text-brand-blue transition-colors group cursor-pointer self-start md:self-auto"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Magazine Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-6">
          {/* Large Hero Tile: Women (7 cols, tall aspect) */}
          <motion.div
            onClick={() => navigate(`/category/${womenCat.slug}`)}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-7 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/10] md:aspect-[7/5] bg-neutral-100 cursor-pointer border border-brand-border shadow-subtle"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=85&auto=format&fit=crop"
              alt="Women Collection"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            
            <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase">
                Primary Edit · 260+ Styles
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between gap-2">
              <div>
                <p className="text-[9px] sm:text-xs uppercase tracking-widest text-neutral-300 font-medium">Boutique Edit</p>
                <h3 className="text-lg sm:text-3xl md:text-4xl font-editorial font-bold tracking-tight">
                  WOMEN
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-neutral-200 mt-0.5 sm:mt-1 max-w-sm line-clamp-1">
                  Contemporary silhouettes, dresses, silks &amp; tailored separates
                </p>
              </div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white text-brand-text flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-lg shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2 Medium Stacked Tiles (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-6">
            {/* Tile 2: Men */}
            <motion.div
              onClick={() => navigate(`/category/${menCat.slug}`)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] bg-neutral-100 cursor-pointer border border-brand-border shadow-subtle"
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85&auto=format&fit=crop"
                alt="Men Collection"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[8.5px] sm:text-[9px] font-bold tracking-widest uppercase">
                  210+ Pieces
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-xl md:text-2xl font-editorial font-bold tracking-tight">
                    MEN
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-neutral-300 line-clamp-1">Clean tailoring, streetwear &amp; everyday staples</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-brand-text flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shrink-0">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>

            {/* Tile 3: Footwear & Accessories */}
            <motion.div
              onClick={() => navigate(`/category/${footwearCat.slug}`)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] bg-neutral-100 cursor-pointer border border-brand-border shadow-subtle"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85&auto=format&fit=crop"
                alt="Footwear & Leather"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[8.5px] sm:text-[9px] font-bold tracking-widest uppercase">
                  130+ Styles
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-end justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-xl md:text-2xl font-editorial font-bold tracking-tight">
                    FOOTWEAR &amp; LEATHER
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-neutral-300 line-clamp-1">Sneakers, handcrafted loafers &amp; boots</p>
                </div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-brand-text flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shrink-0">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Compact Category Navigation Strip Underneath */}
        <div className="mt-3.5 sm:mt-6 pt-3.5 sm:pt-6 border-t border-brand-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-3">
          {secondaryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="group flex flex-col p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-brand-cream border border-brand-border hover:border-brand-blue hover:bg-white transition-all text-left cursor-pointer active:scale-95"
            >
              <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
                <span className="text-[11px] sm:text-xs font-bold text-brand-text group-hover:text-brand-blue transition-colors truncate">
                  {cat.name}
                </span>
                <ArrowUpRight className="w-3 h-3 text-brand-muted group-hover:text-brand-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <span className="text-[9px] sm:text-[10px] text-brand-muted">
                {cat.itemCount} nearby styles
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

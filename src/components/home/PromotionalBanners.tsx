import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PromotionalBanners: React.FC = () => {
  const navigate = useNavigate();
  const { accentColor } = useApp();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-5">
        {/* Banner 1: UP TO 50% OFF Local Fashion Fest */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl overflow-hidden bg-neutral-900 min-h-[135px] sm:min-h-[210px] p-3.5 sm:p-5 flex flex-col justify-between group shadow-card"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop"
            alt="Local Fashion Fest"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-400 bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Up to 50% Off
            </span>
            <h3 className="text-sm sm:text-xl font-extrabold text-white mt-1 leading-tight">
              Local Fashion Fest
            </h3>
            <p className="text-[10px] sm:text-[11px] text-neutral-300 mt-0.5">Exclusive prices from neighborhood boutiques.</p>
          </div>

          <div className="relative z-10 pt-2 sm:pt-3">
            <motion.button
              onClick={() => navigate('/offers')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-white text-neutral-900 font-bold text-[10px] sm:text-[11px] rounded-full hover:bg-neutral-100 flex items-center gap-1 transition-colors shadow"
            >
              <span>Explore Offers</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>

        {/* Banner 2: It's Not Just Fashion — It's Your Neighborhood */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl overflow-hidden bg-neutral-900 min-h-[135px] sm:min-h-[210px] p-3.5 sm:p-5 flex flex-col justify-between group shadow-card"
        >
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop"
            alt="Neighborhood Boutiques"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-blue-200 bg-brand-blue/30 border border-brand-blue/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-blue-light" /> Hyperlocal Curations
            </span>
            <h3 className="text-sm sm:text-xl font-extrabold text-white mt-1 leading-tight">
              It&apos;s Not Just Fashion — It&apos;s Your Neighborhood
            </h3>
            <p className="text-[10px] sm:text-[11px] text-neutral-300 mt-0.5">Support local creators and curated studios.</p>
          </div>

          <div className="relative z-10 pt-2 sm:pt-3">
            <motion.button
              onClick={() => navigate('/stores')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-brand-blue text-white font-bold text-[10px] sm:text-[11px] rounded-full hover:bg-brand-blue-dark flex items-center gap-1 transition-colors shadow"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>

        {/* Banner 3: Same City. Same Day. */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="relative rounded-2xl overflow-hidden bg-[#171717] min-h-[135px] sm:min-h-[210px] p-3.5 sm:p-5 flex flex-col justify-between group shadow-card border border-neutral-800"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop"
            alt="Express Delivery"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 30-45 Mins Express
            </span>
            <h3 className="text-sm sm:text-xl font-extrabold text-white mt-1 leading-tight">
              Same City. Same Day.
            </h3>
            <p className="text-[10px] sm:text-[11px] text-neutral-300 mt-0.5 italic">
              &ldquo;Because style waits for no one.&rdquo;
            </p>
          </div>

          <div className="relative z-10 pt-2 sm:pt-3">
            <motion.button
              onClick={() => navigate('/trending')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-neutral-800 border border-neutral-700 text-white font-bold text-[10px] sm:text-[11px] rounded-full hover:bg-neutral-700 flex items-center gap-1 transition-colors shadow"
            >
              <span>Shop Express</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

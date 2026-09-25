import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BrandStatementProps {
  className?: string;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <section className={`relative bg-[#172B82] text-white py-8 sm:py-16 md:py-24 overflow-hidden border-y border-brand-border ${className}`}>
      {/* Editorial Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] text-[18vw] font-editorial font-extrabold select-none pointer-events-none whitespace-nowrap">
        WEARNEAR
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue-light mb-3 sm:mb-6"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue-light" />
          <span>The WearNear Manifesto</span>
        </motion.div>

        {/* Serif Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial font-normal tracking-tight leading-[1.18] sm:leading-[1.12] mb-3 sm:mb-8 max-w-4xl mx-auto"
        >
          GOOD STYLE DOESN'T{' '}
          <span className="italic font-light text-brand-blue-light">
            HAVE TO TRAVEL FAR.
          </span>
        </motion.h2>

        {/* Narrative Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal mb-6 sm:mb-10 px-2"
        >
          Discover curated fashion from independent stores right around your block.
          We eliminate the multi-day shipping wait with instant 30–45 minute local courier dispatch and authentic boutique garments you can try before you keep.
        </motion.p>

        {/* Key Hyperlocal Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-10 border-t border-white/20 text-left max-w-4xl mx-auto"
        >
          <div className="p-2 sm:p-0">
            <p className="text-xl sm:text-3xl font-editorial font-bold text-white mb-0.5 sm:mb-1">30–45m</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-blue-light font-bold">Doorstep Speed</p>
            <p className="text-[10px] sm:text-[11px] text-white/70 mt-0.5 sm:mt-1 leading-tight">Direct delivery from local storefronts.</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-xl sm:text-3xl font-editorial font-bold text-white mb-0.5 sm:mb-1">10-Min</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-blue-light font-bold">Try &amp; Fit Trial</p>
            <p className="text-[10px] sm:text-[11px] text-white/70 mt-0.5 sm:mt-1 leading-tight">Try sizes at home while courier waits.</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-xl sm:text-3xl font-editorial font-bold text-white mb-0.5 sm:mb-1">45+</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-blue-light font-bold">Local Boutiques</p>
            <p className="text-[10px] sm:text-[11px] text-white/70 mt-0.5 sm:mt-1 leading-tight">Vetted independent fashion houses.</p>
          </div>
          <div className="p-2 sm:p-0">
            <p className="text-xl sm:text-3xl font-editorial font-bold text-white mb-0.5 sm:mb-1">100%</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-blue-light font-bold">Authentic Tags</p>
            <p className="text-[10px] sm:text-[11px] text-white/70 mt-0.5 sm:mt-1 leading-tight">Original boutique tags &amp; quality.</p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <button
            onClick={() => navigate('/stores')}
            className="px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-white text-[#172B82] hover:bg-brand-cream font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Stores Near You</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

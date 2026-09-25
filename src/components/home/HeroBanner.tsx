import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const { genderMode } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimerRef = useRef<any>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPaused, currentSlide]);

  const slide = HERO_SLIDES[currentSlide];
  const primaryImage = genderMode === 'men' ? slide.menImage : slide.image;
  const secondaryImage = genderMode === 'men' ? slide.menSecondaryImage : slide.secondaryImage;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-1.5 sm:pt-4 pb-1.5 sm:pb-4"
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-brand-card border border-brand-border overflow-hidden shadow-subtle min-h-0 sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-between">
        {/* Soft Ambient Royal Blue Accent Lighting */}
        <div className="absolute top-0 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-cream-dark/40 rounded-full blur-2xl pointer-events-none" />

        {/* Main Grid Content */}
        <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-3.5 sm:p-8 lg:p-12 flex-grow gap-3.5 sm:gap-6 lg:gap-8">
          {/* Left Column: Typography & CTAs (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start pr-0 lg:pr-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + genderMode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full"
              >
                {/* Campaign Label Badge */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white border border-brand-border text-[9px] sm:text-[11px] font-bold tracking-widest text-brand-blue uppercase shadow-subtle flex items-center gap-1 sm:gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-blue" />
                    <span>Your Style. Your Neighborhood.</span>
                  </span>
                  <span className="text-[9px] sm:text-xs text-brand-muted tracking-wider uppercase font-semibold">
                    {slide.district}
                  </span>
                </div>

                {/* Editorial Headline */}
                <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial font-extrabold text-brand-text tracking-tight leading-[1.14] sm:leading-[1.08] mb-2 sm:mb-4">
                  <span>{slide.titleLine1}</span>
                  <br />
                  <span className="italic font-normal text-brand-blue">
                    {slide.titleLine2}
                  </span>
                </h1>

                {/* Supporting Description */}
                <p className="text-[11px] sm:text-sm md:text-base text-brand-muted max-w-xl mb-3 sm:mb-6 leading-relaxed font-normal">
                  {slide.description}
                </p>

                {/* Primary & Secondary Buttons */}
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <Button
                    variant="primary"
                    size="sm"
                    showArrow
                    onClick={() => navigate(slide.ctaLink || '/stores')}
                    className="shadow-md hover:shadow-lg sm:text-sm sm:py-2.5 sm:px-5"
                  >
                    {slide.ctaText || 'Shop Now'}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/stores')}
                    className="sm:text-sm sm:py-2.5 sm:px-5"
                  >
                    {slide.secondaryText || 'Explore Stores'}
                  </Button>
                </div>

                {/* Hyperlocal Proof Points */}
                <div className="pt-2 sm:pt-4 border-t border-brand-border/70 flex flex-wrap items-center gap-2.5 sm:gap-6 text-[10px] sm:text-xs text-brand-muted">
                  <div className="flex items-center gap-1.5 font-medium text-brand-text">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-blue shrink-0" />
                    <span>30–45 min local delivery</span>
                  </div>
                  <span className="hidden sm:inline text-brand-border">•</span>
                  <div className="flex items-center gap-1.5 font-medium text-brand-text">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Genuine boutique tags</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Fashion Campaign Imagery (5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + genderMode + '-media'}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative w-full max-w-sm sm:max-w-md mx-auto"
              >
                {/* Desktop & Tablet: Layered Composition */}
                <div className="hidden sm:block relative">
                  {/* Primary Portrait Card */}
                  <div className="relative aspect-[3/4] w-[84%] rounded-2xl overflow-hidden shadow-card border-2 border-white bg-white">
                    <img
                      src={primaryImage}
                      alt="WearNear Editorial Campaign"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Overlapping Secondary Accessory Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 15, y: 15 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                    className="absolute -bottom-3 right-0 w-[48%] aspect-square rounded-2xl overflow-hidden shadow-float border-2 border-white bg-white group cursor-pointer"
                    onClick={() => navigate('/trending')}
                  >
                    <img
                      src={secondaryImage}
                      alt="Curated Detail"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-brand-blue-light">
                        Neighborhood Drop
                      </p>
                      <p className="text-[11px] font-bold truncate">Explore Look →</p>
                    </div>
                  </motion.div>

                  {/* Location Stamp */}
                  <div className="absolute -top-3 left-3 bg-white px-3 py-1 rounded-full border border-brand-border shadow-subtle flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-brand-text">
                      {slide.editorialIndex} · {slide.district}
                    </span>
                  </div>
                </div>

                {/* Mobile: Compact Single Refined Editorial Frame (Prevents tall stacking) */}
                <div className="sm:hidden relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-card border border-brand-border bg-white">
                  <img
                    src={primaryImage}
                    alt="WearNear Editorial"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Floating District Tag on Mobile Image */}
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full border border-brand-border shadow-sm flex items-center gap-1 text-[8.5px] font-bold text-brand-text uppercase tracking-wider">
                    <MapPin className="w-2.5 h-2.5 text-brand-blue" />
                    <span>{slide.district}</span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                    <span className="text-[10px] font-bold drop-shadow-sm truncate max-w-[140px]">
                      {slide.accentTag || 'Verified Local Drop'}
                    </span>
                    <span className="text-[8.5px] font-bold bg-brand-blue text-white px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      30m Delivery
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Bottom Control Strip */}
        <div className="relative z-20 px-3 sm:px-8 lg:px-12 py-2 sm:py-3 bg-brand-cream/50 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted hidden sm:inline">
              Curated Slide
            </span>
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-5 sm:w-6 h-1 sm:h-1.5 rounded-full bg-brand-blue'
                      : 'w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-brand-border hover:bg-brand-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-brand-muted ml-1">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer shadow-subtle active:scale-90"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer shadow-subtle active:scale-90"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

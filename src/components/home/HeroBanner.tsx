import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants
} from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface SlideData {
  id: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  genderTarget?: 'women' | 'men';
  image: string;
  imageAlt: string;
  layout: 'text-left' | 'image-left';
  badge?: string;
  accentTag?: string;
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    eyebrow: 'NEW SEASON',
    headingLine1: 'Fresh Styles.',
    headingLine2: 'Closer to You.',
    description: 'Discover the latest fashion from stores around you.',
    ctaText: 'Shop New Arrivals',
    ctaLink: '/new-arrivals',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'WearNear New Season Campaign',
    layout: 'text-left',
    badge: 'Trending Locally',
    accentTag: '30-45m Dispatch'
  },
  {
    id: 'slide-2',
    eyebrow: "WOMEN'S EDIT",
    headingLine1: 'Your Style.',
    headingLine2: 'Your Way.',
    description: 'Explore trending looks from nearby fashion stores.',
    ctaText: 'Shop Women',
    ctaLink: '/categories',
    genderTarget: 'women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=85&auto=format&fit=crop',
    imageAlt: "Women's Blue Fashion Editorial",
    layout: 'image-left',
    badge: 'Curated Boutique',
    accentTag: 'Try at Home'
  },
  {
    id: 'slide-3',
    eyebrow: "MEN'S COLLECTION",
    headingLine1: 'Everyday.',
    headingLine2: 'Elevated.',
    description: 'Find modern essentials from local stores near you.',
    ctaText: 'Shop Men',
    ctaLink: '/categories',
    genderTarget: 'men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85&auto=format&fit=crop',
    imageAlt: "Men's Modern Essentials",
    layout: 'text-left',
    badge: 'Neighborhood Atelier',
    accentTag: 'Premium Quality'
  },
  {
    id: 'slide-4',
    eyebrow: 'LOCAL FINDS',
    headingLine1: 'Great Fashion.',
    headingLine2: 'Right Nearby.',
    description: 'Discover styles available at stores around you.',
    ctaText: 'Explore Stores',
    ctaLink: '/stores',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Indiranagar Boutique Storefront',
    layout: 'image-left',
    badge: '35+ Verified Boutiques',
    accentTag: 'Zero Delivery Delay'
  },
  {
    id: 'slide-5',
    eyebrow: 'FAST DELIVERY',
    headingLine1: 'Style Today.',
    headingLine2: 'Wear Today.',
    description: 'Shop nearby fashion and get it delivered quickly.',
    ctaText: 'Start Shopping',
    ctaLink: '/trending',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Express Local Fashion Courier',
    layout: 'text-left',
    badge: 'Hyperlocal Express',
    accentTag: '30–45 Mins'
  },
  {
    id: 'slide-6',
    eyebrow: 'LIMITED PICKS',
    headingLine1: 'Your Next',
    headingLine2: 'Favorite Look.',
    description: "Explore limited fashion finds before they're gone.",
    ctaText: 'Explore Now',
    ctaLink: '/trending',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Limited Edition Blue Boutique Drop',
    layout: 'image-left',
    badge: 'Exclusive Archive',
    accentTag: 'Limited Stock'
  }
];

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const { setGenderMode } = useApp();
  const prefersReducedMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = SLIDES.length;

  const goToSlide = useCallback((newIndex: number, newDirection?: number) => {
    setDirection(newDirection ?? (newIndex > currentIndex ? 1 : -1));
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer (4.5s), pauses on hover, focus, or touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const handleCtaClick = (slide: SlideData) => {
    if (slide.genderTarget) {
      setGenderMode(slide.genderTarget);
    }
    navigate(slide.ctaLink);
  };

  const activeSlide = SLIDES[currentIndex];

  // Animation variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 30 : -30,
      scale: prefersReducedMotion ? 1 : 0.985
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -30 : 30,
      scale: prefersReducedMotion ? 1 : 0.985,
      transition: {
        duration: prefersReducedMotion ? 0.25 : 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="WearNear Promotional Fashion Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2.5 sm:mt-5 mb-4 sm:mb-8 select-none focus:outline-none"
    >
      {/* Outer Banner Card Container (Compact Height: 230-280px mobile, 340-420px tablet, 440-500px desktop) */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#FFFCF5] border border-[#DDD7CA] overflow-hidden shadow-card h-[240px] xs:h-[260px] sm:h-[380px] lg:h-[460px] flex flex-col justify-between">

        {/* Subtle Background Architectural Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(#172B82 0.75px, transparent 0.75px), radial-gradient(#DDD7CA 0.75px, #FFFCF5 0.75px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
          aria-hidden="true"
        />

        {/* Ambient Soft Blue Radial Accent */}
        <div
          className="absolute top-0 right-1/4 w-80 h-80 bg-[#172B82]/[0.04] rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Animated Banner Slide Content */}
        <div className="relative w-full h-full flex-grow overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={(_, info) => {
                setIsPaused(false);
                if (info.offset.x < -40 || info.velocity.x < -300) {
                  handleNext();
                } else if (info.offset.x > 40 || info.velocity.x > 300) {
                  handlePrev();
                }
              }}
              onTouchStart={(e) => {
                touchStartXRef.current = e.touches[0].clientX;
                setIsPaused(true);
              }}
              onTouchEnd={(e) => {
                setIsPaused(false);
                if (touchStartXRef.current === null) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartXRef.current - touchEndX;
                if (diff > 45) {
                  handleNext();
                } else if (diff < -45) {
                  handlePrev();
                }
                touchStartXRef.current = null;
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Responsive Layout Grid (Supports alternating layouts: Text-Left vs Image-Left) */}
              <div
                className={`w-full h-full grid grid-cols-12 items-stretch ${activeSlide.layout === 'image-left' ? 'direction-ltr' : ''
                  }`}
              >

                {/* ======================================================== */}
                {/* TEXT CONTENT PANE (45–55% desktop width, 50-55% mobile) */}
                {/* ======================================================== */}
                <div
                  className={`col-span-7 sm:col-span-6 lg:col-span-6 flex flex-col justify-center p-3.5 xs:p-4 sm:p-8 lg:p-14 z-10 ${activeSlide.layout === 'image-left'
                      ? 'order-2 lg:order-2 pl-2 sm:pl-8 lg:pl-12'
                      : 'order-1 lg:order-1 pr-2 sm:pr-8 lg:pr-12'
                    }`}
                >
                  {/* 1. Eyebrow Badge */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-1.5 mb-1.5 sm:mb-3"
                  >
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 border border-[#DDD7CA] text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold tracking-[0.18em] text-[#172B82] uppercase shadow-subtle">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#243FBA]" />
                      <span>{activeSlide.eyebrow}</span>
                    </span>
                    {activeSlide.badge && (
                      <span className="hidden sm:inline-block text-[9.5px] lg:text-[11px] font-bold text-[#686868] uppercase tracking-wider">
                        · {activeSlide.badge}
                      </span>
                    )}
                  </motion.div>

                  {/* 2. Main Heading */}
                  <motion.h2
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-editorial font-extrabold text-[#191919] tracking-tight leading-[1.08] sm:leading-[1.06] mb-1 sm:mb-3"
                  >
                    <span>{activeSlide.headingLine1}</span>
                    <br />
                    <span className="text-[#172B82] italic">
                      {activeSlide.headingLine2}
                    </span>
                  </motion.h2>

                  {/* 3. Supporting Description */}
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base text-[#686868] max-w-sm mb-2.5 sm:mb-6 line-clamp-2 sm:line-clamp-none font-normal leading-relaxed"
                  >
                    {activeSlide.description}
                  </motion.p>

                  {/* 4. Action CTA Button */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => handleCtaClick(activeSlide)}
                      className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-[#172B82] hover:bg-[#243FBA] text-white text-[10.5px] xs:text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <span>{activeSlide.ctaText}</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                </div>

                {/* ======================================================== */}
                {/* FASHION PHOTOGRAPHY PANE (45–55% desktop width)          */}
                {/* ======================================================== */}
                <div
                  className={`col-span-5 sm:col-span-6 lg:col-span-6 relative h-full overflow-hidden ${activeSlide.layout === 'image-left'
                      ? 'order-1 lg:order-1'
                      : 'order-2 lg:order-2'
                    }`}
                >
                  {/* Image Container with Subtle Zoom on Hover */}
                  <div className="relative w-full h-full overflow-hidden bg-[#F5F0E6] group">
                    <motion.img
                      initial={prefersReducedMotion ? false : { scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      src={activeSlide.image}
                      alt={activeSlide.imageAlt}
                      loading={currentIndex === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center sm:object-top transition-transform duration-700 ease-out group-hover:scale-103"
                    />

                    {/* Subtle Gradient Blend to harmoniously join image and background */}
                    <div
                      className={`absolute inset-0 pointer-events-none ${activeSlide.layout === 'image-left'
                          ? 'bg-gradient-to-r from-transparent via-transparent to-[#FFFCF5]/90 sm:to-[#FFFCF5]/60'
                          : 'bg-gradient-to-l from-transparent via-transparent to-[#FFFCF5]/90 sm:to-[#FFFCF5]/60'
                        }`}
                      aria-hidden="true"
                    />

                    {/* Mobile & Tablet Accent Badge */}
                    {activeSlide.accentTag && (
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#DDD7CA] shadow-subtle text-[8px] xs:text-[9px] sm:text-[10.5px] font-bold text-[#172B82] tracking-wider uppercase">
                        {activeSlide.accentTag}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP SUBTLE ARROW CONTROLS (Near Banner Edges)        */}
        {/* ======================================================== */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-[#172B82] border border-[#DDD7CA] hover:border-[#172B82] text-[#172B82] hover:text-white items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-90"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-[#172B82] border border-[#DDD7CA] hover:border-[#172B82] text-[#172B82] hover:text-white items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-90"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* ======================================================== */}
        {/* BOTTOM PAGINATION INDICATORS STRIP                       */}
        {/* ======================================================== */}
        <div className="relative z-20 px-4 sm:px-8 py-2 sm:py-3 bg-[#FFFCF5]/90 border-t border-[#DDD7CA]/70 flex items-center justify-between text-[10px] sm:text-xs text-[#686868]">

          {/* Active / Total counter label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#172B82] animate-pulse" />
            <span className="font-bold text-[#172B82] uppercase tracking-wider text-[9px] sm:text-[10px]">
              0{currentIndex + 1} / 0{totalSlides}
            </span>
            <span className="hidden sm:inline text-[#DDD7CA]">·</span>
            <span className="hidden sm:inline font-medium text-[#191919]">
              {activeSlide.badge || 'Local Fashion'}
            </span>
          </div>

          {/* Animated Pagination Indicators */}
          <div
            role="tablist"
            aria-label="Slide indicators"
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {SLIDES.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}: ${slide.eyebrow}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive
                      ? 'w-6 sm:w-8 bg-[#172B82]'
                      : 'w-1.5 sm:w-2 bg-[#DDD7CA] hover:bg-[#686868]'
                    }`}
                />
              );
            })}
          </div>

          {/* Quick link to stores on right */}
          <div className="hidden xs:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => navigate('/stores')}
              className="text-[9.5px] sm:text-[11px] font-bold text-[#172B82] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Nearby Boutiques</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

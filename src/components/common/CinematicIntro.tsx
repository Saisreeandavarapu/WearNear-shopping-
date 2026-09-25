import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Zap } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  minDurationSeconds?: number;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  minDurationSeconds = 5,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(minDurationSeconds);
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock body scroll while cinematic intro is active
    document.body.style.overflow = 'hidden';

    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 30);

    // Live countdown interval
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto complete after minDurationSeconds
    const autoEnterTimer = setTimeout(() => {
      handleEnter();
    }, minDurationSeconds * 1000);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(mountTimer);
      clearInterval(interval);
      clearTimeout(autoEnterTimer);
    };
  }, [minDurationSeconds]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const progressPercent = ((minDurationSeconds - secondsRemaining) / minDurationSeconds) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to WearNear"
      className={`fixed inset-0 z-[99999] bg-[#F5F0E6] text-[#191919] flex flex-col justify-between overflow-hidden select-none transition-all duration-500 ease-out ${
        isMounted && !isExiting
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
      {/* Background Soft Royal Blue Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#243FBA]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#243FBA]/8 rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 left-1/3 w-[600px] h-[400px] bg-[#DDD7CA]/50 rounded-full blur-[160px]" />
      </div>

      {/* Top Header Bar: Logo, Campaign Badge, Enter Button */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Authentic WearNear Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 bg-[#FFFCF5]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#DDD7CA] shadow-subtle"
        >
          <img
            src="/image.png"
            alt="WearNear"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </motion.div>

        {/* Enter WearNear Button with Circular Progress / Timer */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleEnter}
            aria-label="Enter WearNear"
            className="flex items-center gap-2 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Enter WearNear</span>
            <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-bold flex items-center justify-center">
              {secondsRemaining > 0 ? secondsRemaining : '✓'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Campaign Editorial Composition */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col items-center text-center my-auto">
        {/* Campaign Label Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8ECFF] border border-[#243FBA]/30 shadow-subtle"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#243FBA]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#243FBA]">
            YOUR STYLE · YOUR NEIGHBORHOOD
          </span>
        </motion.div>

        {/* Main Headline: “New Styles. At Your Doorstep.” */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#191919] uppercase tracking-tight leading-[1.05] max-w-3xl"
        >
          New Styles.{' '}
          <span className="italic font-normal text-[#243FBA] block sm:inline">
            At Your Doorstep.
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 sm:mt-5 text-sm sm:text-base text-[#686868] max-w-lg leading-relaxed font-normal"
        >
          Discover fashion from stores around your neighborhood. Delivered straight to your door in 30–45 minutes.
        </motion.p>

        {/* Beautiful Fashion Campaign Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 sm:mt-8 relative w-full max-w-md aspect-[16/9] rounded-2xl overflow-hidden border border-[#DDD7CA] shadow-card bg-[#FFFCF5]"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85&auto=format&fit=crop"
            alt="WearNear Fashion Campaign"
            className="w-full h-full object-cover object-top filter brightness-[0.97]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-serif font-bold text-sm tracking-wide drop-shadow">
              Neighborhood Boutique Drops
            </span>
            <span className="bg-[#243FBA] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              30m Delivery
            </span>
          </div>
        </motion.div>

        {/* Subtle Animated Loading Indicator & Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#686868]">
            <div className="w-2 h-2 rounded-full bg-[#243FBA] animate-ping" />
            <span>Connecting to your nearest boutique storefronts...</span>
          </div>
        </motion.div>
      </main>

      {/* Bottom Progress Bar Indicating 5s Duration */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-5 sm:pb-7 flex flex-col gap-2">
        <div className="w-full bg-[#DDD7CA] h-1.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-[#243FBA] rounded-full transition-all duration-1000 ease-linear"
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#686868] font-medium">
          <span>WEARNEAR · LOCAL FASHION MARKETPLACE</span>
          <span>
            {secondsRemaining > 0
              ? `Entering in ${secondsRemaining}s...`
              : 'Entering WearNear now...'}
          </span>
        </div>
      </footer>
    </div>
  );
};

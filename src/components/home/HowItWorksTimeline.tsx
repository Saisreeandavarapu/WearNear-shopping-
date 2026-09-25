import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShoppingBag, PackageCheck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Neighborhood Edits',
    description: 'Browse real-time inventories and curated capsule collections from independent fashion boutiques within 3–5 km.',
    icon: MapPin,
  },
  {
    step: '02',
    title: 'CHOOSE',
    subtitle: 'Try & Fit Selection',
    description: 'Select your preferred styles. Choose Doorstep Try & Fit to test multiple sizes in the comfort of your living room.',
    icon: ShoppingBag,
  },
  {
    step: '03',
    title: 'ORDER',
    subtitle: 'Boutique Prep',
    description: 'Your neighborhood store prepares and packs your garments with original designer tags and quality seals intact.',
    icon: PackageCheck,
  },
  {
    step: '04',
    title: 'RECEIVE',
    subtitle: '30–45 Min Arrival',
    description: 'Your dedicated local courier arrives at your door. Try your pieces on, keep what fits, and hand back whatever doesn’t.',
    icon: Sparkles,
  },
];

interface HowItWorksTimelineProps {
  className?: string;
}

export const HowItWorksTimeline: React.FC<HowItWorksTimelineProps> = ({ className = '' }) => {
  return (
    <section className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14 border-b border-brand-border bg-brand-cream ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14">
        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-muted block mb-0.5 sm:mb-1">
          Simple &amp; Seamless
        </span>
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-editorial font-bold text-brand-text tracking-tight">
          HOW WEARNEAR WORKS
        </h2>
        <p className="text-[11px] sm:text-sm text-brand-muted mt-1 font-normal">
          From the boutique window to your living room mirror in four straightforward steps.
        </p>
      </div>

      {/* 4-Step Timeline Container */}
      <div className="relative">
        {/* Desktop Horizontal Connecting Line */}
        <div className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-brand-border z-0" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 relative z-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-start md:items-center text-left md:text-center group p-2.5 sm:p-0 rounded-xl bg-brand-card/60 sm:bg-transparent border border-brand-border/40 sm:border-0"
              >
                {/* Step Circle with Serif Number */}
                <div className="relative mb-2 sm:mb-4 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-card border border-brand-border flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue-light transition-colors duration-300 shadow-subtle">
                    <span className="font-editorial text-sm sm:text-lg font-bold text-brand-text group-hover:text-brand-blue transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-blue shadow-sm">
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                </div>

                {/* Content */}
                <span className="text-[8.5px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-0.5 sm:mb-1">
                  {step.subtitle}
                </span>
                <h3 className="text-xs sm:text-base font-editorial font-bold text-brand-text tracking-tight mb-0.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-brand-muted leading-relaxed max-w-xs font-normal">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Store, Zap, ShieldCheck } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Store,
      title: 'Local Stores',
      description: 'Discover independent boutiques around your block.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Direct courier delivery in 30–45 minutes.',
    },
    {
      icon: ShieldCheck,
      title: 'Authentic Products',
      description: '100% genuine verified boutique apparel & tags.',
    },
  ];

  return (
    <section className="hidden md:block max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        {benefits.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-brand-card border border-brand-border shadow-subtle hover:border-brand-blue/40 transition-colors"
            >
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0 shadow-subtle">
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-blue" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-[11px] sm:text-sm">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-brand-muted leading-tight sm:leading-snug mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

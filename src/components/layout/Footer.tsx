import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Clock, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { replayCinematicIntro } = useApp();

  return (
    <footer className="hidden md:block bg-[#F5F0E6] border-t border-[#DDD7CA] pt-12 pb-12 text-[#686868] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Prop Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pb-8 sm:pb-12 border-b border-[#DDD7CA]">
          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-0 rounded-xl bg-brand-card sm:bg-transparent border sm:border-0 border-brand-border/60">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] flex items-center justify-center text-[#243FBA] shadow-subtle shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#243FBA]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-[#191919]">30-45 Min Delivery</p>
              <p className="text-[10px] sm:text-[11px] text-[#686868]">From local boutiques</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-0 rounded-xl bg-brand-card sm:bg-transparent border sm:border-0 border-brand-border/60">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] flex items-center justify-center text-[#243FBA] shadow-subtle shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#243FBA]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-[#191919]">100% Genuine</p>
              <p className="text-[10px] sm:text-[11px] text-[#686868]">Verified brand tags</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-0 rounded-xl bg-brand-card sm:bg-transparent border sm:border-0 border-brand-border/60">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] flex items-center justify-center text-[#243FBA] shadow-subtle shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-[#243FBA]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-[#191919]">Instant Doorstep Trial</p>
              <p className="text-[10px] sm:text-[11px] text-[#686868]">Easy size exchange</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-0 rounded-xl bg-brand-card sm:bg-transparent border sm:border-0 border-brand-border/60">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FFFCF5] border border-[#DDD7CA] flex items-center justify-center text-[#243FBA] shadow-subtle shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#243FBA]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-[#191919]">Hyperlocal First</p>
              <p className="text-[10px] sm:text-[11px] text-[#686868]">Support local shops</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 py-8 sm:py-12">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/image.png"
                alt="WearNear - Your Style. Your Neighborhood."
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#686868] leading-relaxed max-w-sm font-normal">
              WearNear connects you with nearby fashion boutiques and stores. Discover curated looks, try them on at home, and receive local deliveries in 30-45 minutes.
            </p>
            <p className="text-xs font-medium text-[#191919]">
              Tagline: <span className="font-bold text-[#191919]">&ldquo;Your Style. Your Neighborhood.&rdquo;</span>
            </p>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#191919] mb-2.5 sm:mb-3">Categories</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li><Link to="/category/women" className="hover:text-[#243FBA] transition-colors">Women&apos;s Wear</Link></li>
              <li><Link to="/category/men" className="hover:text-[#243FBA] transition-colors">Men&apos;s Wear</Link></li>
              <li><Link to="/category/footwear" className="hover:text-[#243FBA] transition-colors">Sneakers &amp; Boots</Link></li>
              <li><Link to="/category/accessories" className="hover:text-[#243FBA] transition-colors">Boutique Accessories</Link></li>
              <li><Link to="/category/ethnic" className="hover:text-[#243FBA] transition-colors">Handcrafted Ethnic</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#191919] mb-2.5 sm:mb-3">Discover</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li><Link to="/stores" className="hover:text-[#243FBA] transition-colors">Nearby Stores</Link></li>
              <li><Link to="/trending" className="hover:text-[#243FBA] transition-colors">Trending Near You</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-[#243FBA] transition-colors">New Season Drops</Link></li>
              <li><Link to="/offers" className="hover:text-[#243FBA] transition-colors">Special Offers</Link></li>
              <li><Link to="/orders/track" className="hover:text-[#243FBA] transition-colors">Live Order Tracking</Link></li>
              <li>
                <button
                  type="button"
                  onClick={replayCinematicIntro}
                  className="hover:text-[#243FBA] transition-colors text-left flex items-center gap-1.5 font-medium text-[#243FBA]"
                >
                  <Sparkles className="w-3 h-3 text-[#243FBA]" />
                  <span>Cinematic Intro</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#191919] mb-2.5 sm:mb-3">Help &amp; Policies</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs">
              <li><Link to="/support" className="hover:text-[#243FBA] transition-colors">Help Center &amp; FAQs</Link></li>
              <li><Link to="/returns" className="hover:text-[#243FBA] transition-colors">Return &amp; Refund Policy</Link></li>
              <li><Link to="/support" className="hover:text-[#243FBA] transition-colors">Shipping &amp; Delivery Policy</Link></li>
              <li><Link to="/support" className="hover:text-[#243FBA] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-[#243FBA] transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-[#DDD7CA] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#686868] text-center sm:text-left">
          <p>© {new Date().getFullYear()} WearNear Technologies Inc. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#243FBA] text-[#243FBA] mx-0.5" />
            <span>for local neighborhood fashion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, STORES } from '../../data/mockData';
import {
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  Bell,
  User,
  X,
  ChevronDown,
  Sparkles,
  Store as StoreIcon,
} from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const {
    genderMode,
    setGenderMode,
    currentLocation,
    setIsLocationModalOpen,
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Detect scroll state for smooth compact header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categorySlug.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4)
    : [];

  const storeResults = searchQuery.trim()
    ? STORES.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/categories' },
    { label: 'STORES', path: '/stores' },
    { label: 'DISCOVER', path: '/trending' },
    { label: 'OFFERS', path: '/offers' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#DDD7CA] ${isScrolled ? 'shadow-subtle' : ''
        }`}
    >
      {/* Top Banner Bar for Fast Local Guarantee */}
      <div className="bg-[#172B82] text-white text-[9px] sm:text-[11px] py-0.5 sm:py-1.5 px-2.5 sm:px-3 text-center font-medium tracking-wider uppercase flex items-center justify-center gap-1 sm:gap-2 select-none">
        <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#E8ECFF] shrink-0" />
        <span className="truncate">LOCAL FASHION · NEARBY BOUTIQUES · 30-45 MIN DELIVERY</span>
        <Link to="/offers" className="underline font-bold hover:text-white ml-1 text-[#E8ECFF] shrink-0 hidden xs:inline">
          OFFERS
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 gap-1 xs:gap-2 sm:gap-6 ${
            isScrolled ? 'h-[54px] sm:h-16 py-1 sm:py-0' : 'h-[62px] sm:h-18 lg:h-20 py-1.5 sm:py-0'
          }`}
        >
          {/* Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 min-w-0">
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 shrink-0"
              aria-label="WearNear Home"
            >
              <img
                src="/image.png"
                alt="WearNear"
                className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-auto object-contain rounded-full shrink-0"
              />

              <span className="sm:hidden font-editorial font-bold text-[16px] xs:text-[18px] tracking-tight text-[#172B82] leading-none whitespace-nowrap">
                WearNear
              </span>
            </Link>

            {/* Gender Switcher (Women / Men) */}
            <div className="hidden lg:flex items-center p-0.5 bg-[#FFFCF5] rounded-md border border-[#DDD7CA] text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setGenderMode('women')}
                className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                  genderMode === 'women'
                    ? 'bg-[#243FBA] text-white shadow-subtle'
                    : 'text-[#686868] hover:text-[#191919]'
                }`}
              >
                WOMEN
              </button>
              <button
                type="button"
                onClick={() => setGenderMode('men')}
                className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                  genderMode === 'men'
                    ? 'bg-[#243FBA] text-white shadow-subtle'
                    : 'text-[#686868] hover:text-[#191919]'
                }`}
              >
                MEN
              </button>
            </div>
          </div>

          {/* Center: Editorial Uppercase Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-xs font-bold uppercase tracking-[0.18em] text-[#191919] hover:text-[#243FBA] transition-colors relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#243FBA] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right: Location, Search, Wishlist, Cart & Profile */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 shrink-0">
            {/* Location Selector Button */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#FFFCF5] hover:bg-white border border-[#DDD7CA] hover:border-[#243FBA] text-left transition-colors max-w-[72px] xs:max-w-[95px] sm:max-w-[145px] md:max-w-[170px] shadow-subtle cursor-pointer active:scale-95 shrink-0"
            >
              <MapPin className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-[#243FBA] shrink-0" />
              <div className="truncate text-left leading-tight">
                <span className="text-[7px] sm:text-[9px] text-[#686868] uppercase font-bold block leading-none">Deliver To</span>
                <span className="text-[9px] sm:text-[11px] font-bold text-[#191919] truncate block mt-0.5">
                  {currentLocation.split(',')[0]}
                </span>
              </div>
              <ChevronDown className="w-2 sm:w-3 h-2 sm:h-3 text-[#686868] shrink-0 ml-0.5 hidden xs:inline" />
            </button>

            {/* Desktop Compact Search */}
            <div ref={searchContainerRef} className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search styles..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 lg:w-44 focus:w-60 pl-8 pr-7 py-1.5 bg-[#FFFCF5] border border-[#DDD7CA] focus:border-[#243FBA] rounded-full text-xs placeholder:text-[#686868] focus:outline-none transition-all duration-300 shadow-subtle text-[#191919]"
                />
                <Search className="w-3.5 h-3.5 text-[#686868] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#686868] hover:text-[#191919]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 right-0 w-80 bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] shadow-card overflow-hidden z-50 animate-fade-in">
                  {searchResults.length > 0 ? (
                    <div className="p-3">
                      <p className="text-[10px] font-bold text-[#686868] uppercase tracking-wider mb-2">
                        Suggested Items
                      </p>
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/product/${item.id}`);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F5F0E6] cursor-pointer transition-colors"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-9 h-11 object-cover rounded-lg bg-neutral-100"
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-[#191919] truncate">{item.name}</p>
                            <p className="text-[10px] text-[#686868] truncate">
                              ₹{item.price.toLocaleString()} · {item.storeName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {storeResults.length > 0 && (
                    <div className="p-3 border-t border-[#DDD7CA] bg-[#F5F0E6]/50">
                      <p className="text-[10px] font-bold text-[#686868] uppercase tracking-wider mb-2">
                        Nearby Boutiques
                      </p>
                      {storeResults.map((store) => (
                        <div
                          key={store.id}
                          onClick={() => {
                            navigate(`/store/${store.id}`);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white cursor-pointer transition-colors text-xs font-semibold text-[#191919]"
                        >
                          <StoreIcon className="w-3.5 h-3.5 text-[#243FBA]" />
                          <span className="truncate">{store.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-2.5 bg-[#F5F0E6] border-t border-[#DDD7CA] text-center">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-[#243FBA] hover:underline"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FFFCF5] hover:bg-white border border-[#DDD7CA] hover:border-[#243FBA] hover:text-[#243FBA] flex items-center justify-center text-[#191919] relative transition-all duration-200 shadow-subtle cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#243FBA]" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#FFFCF5] rounded-xl border border-[#DDD7CA] shadow-card p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#DDD7CA]">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#191919]">
                      Notifications
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-[#686868] hover:text-[#191919]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-[#E8ECFF] border border-[#243FBA]/20 text-[#191919]">
                      <p className="font-bold text-[#243FBA]">Doorstep Dispatch Active</p>
                      <p className="text-[11px] text-[#686868] mt-0.5">
                        Free delivery on all local boutique orders above ₹799.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FFFCF5] hover:bg-white border border-[#DDD7CA] hover:border-[#243FBA] hover:text-[#243FBA] flex items-center justify-center text-[#191919] relative transition-all duration-200 shadow-subtle hover:-translate-y-0.5 active:scale-95 shrink-0"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] sm:w-4 sm:h-4 px-0.5 rounded-full bg-[#243FBA] text-white text-[8px] sm:text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button with Count in Royal Blue */}
            <Link
              to="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="flex items-center gap-1 sm:gap-2 px-2 xs:px-2.5 sm:px-3.5 py-1.5 h-8 sm:h-auto rounded-lg sm:rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white transition-all duration-200 shadow-md active:scale-95 hover:-translate-y-0.5 font-bold shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold leading-none">{cartCount}</span>
            </Link>

            {/* Account / Profile Action (Desktop) */}
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:flex w-9 h-9 rounded-lg bg-[#FFFCF5] hover:bg-white border border-[#DDD7CA] hover:border-[#243FBA] hover:text-[#243FBA] items-center justify-center text-[#191919] transition-all duration-200 shadow-subtle hover:-translate-y-0.5 active:scale-95"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

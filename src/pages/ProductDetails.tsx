import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, SAMPLE_REVIEWS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Check,
  ChevronRight,
  Share2,
  X
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    currentLocation,
    showToast
  } = useApp();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-cream pb-32 sm:pb-16 text-brand-text">
      {/* Breadcrumbs */}
      <div className="border-b border-brand-border bg-white/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs text-brand-muted flex items-center gap-1.5 sm:gap-2">
          <Link to="/" className="hover:text-brand-blue font-medium transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-border shrink-0" />
          <Link to={`/category/${product.categorySlug}`} className="hover:text-brand-blue capitalize font-medium transition-colors">
            {product.categorySlug}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-border shrink-0" />
          <span className="text-brand-text font-bold truncate max-w-[150px] sm:max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-y-auto shrink-0 no-scrollbar py-0.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-11 h-14 sm:w-20 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    activeImageIndex === idx ? 'border-brand-blue scale-102 shadow-sm' : 'border-brand-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image Viewport */}
            <div className="relative flex-1 aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-brand-border shadow-subtle group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-brand-text hover:text-red-500 hover:border-brand-blue active:scale-95 transition-all z-10 border border-brand-border cursor-pointer"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                aria-label="Share product"
                className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-brand-text hover:text-brand-blue transition-all z-10 border border-brand-border"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Hyperlocal Store Dispatch Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-brand-border shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] sm:text-xs font-bold text-brand-text truncate">
                      Dispatched from {product.storeName}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">
                      {product.distanceKm} km away • Delivery in {product.deliveryMin} mins
                    </p>
                  </div>
                </div>
                <Link
                  to={`/store/${product.storeId}`}
                  className="text-[11px] sm:text-xs font-bold text-brand-blue hover:text-brand-blue-dark hover:underline shrink-0 ml-2"
                >
                  Visit Store
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border border-brand-border shadow-subtle">
              {/* Store & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-brand-text">
                  <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-brand-border">•</span>
                  <span className="text-brand-muted font-medium text-[11px] sm:text-xs">{product.ratingCount} reviews</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-editorial font-extrabold text-brand-text tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 sm:mt-4 flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-base text-brand-muted line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {product.discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-brand-muted mt-1">Inclusive of all local boutique taxes &amp; duties</p>

              {/* Color Selection */}
              <div className="mt-5 pt-4 border-t border-brand-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-text uppercase tracking-wider">
                    Color: <span className="font-semibold text-brand-muted capitalize">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 transition-all ${
                        selectedColor.name === c.name ? 'ring-2 ring-brand-blue ring-offset-2' : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div
                        style={{ backgroundColor: c.hex }}
                        className="w-full h-full rounded-full border border-brand-border shadow-inner"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-text uppercase tracking-wider">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'bg-brand-cream/50 text-brand-text border border-brand-border hover:border-brand-blue'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Stock Info */}
              <div className="mt-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-brand-text uppercase tracking-wider">Qty:</span>
                  <div className="flex items-center border border-brand-border rounded-lg bg-brand-cream/40 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-brand-text hover:bg-brand-blue hover:text-white font-bold transition-colors cursor-pointer select-none"
                    >
                      -
                    </button>
                    <span className="px-2.5 font-bold text-xs">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 py-1 text-brand-text hover:bg-brand-blue hover:text-white font-bold transition-colors cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs truncate">
                  {product.stockCount <= 5 ? (
                    <span className="text-red-600 font-semibold truncate">
                      Only {product.stockCount} left in store!
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 truncate">
                      <Check className="w-3.5 h-3.5 shrink-0" /> In stock locally
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Estimation Card */}
              <div className="mt-5 p-3 sm:p-4 rounded-xl bg-brand-cream/60 border border-brand-border space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-brand-text font-semibold truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span className="truncate">Deliver to: <strong className="text-brand-text">{currentLocation.split(',')[0]}</strong></span>
                  </div>
                  <span className="text-brand-blue font-bold bg-brand-blue-light px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] shrink-0">
                    Fast 30 Mins
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-brand-muted">
                  Order within <strong>14m</strong> for hyper-speed neighborhood delivery today.
                </p>
              </div>

              {/* Primary Action Buttons (Desktop / Tablet) */}
              <div className="hidden sm:grid grid-cols-2 gap-3 mt-6">
                <Button
                  variant="primary"
                  size="md"
                  icon={ShoppingBag}
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  icon={Zap}
                  onClick={handleBuyNow}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-5 pt-4 border-t border-brand-border text-[11px] sm:text-xs text-brand-muted">
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  <span>10-min doorstep trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Genuine tags</span>
                </div>
              </div>
            </div>

            {/* Description & Accordion Tabs */}
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-2xl border border-brand-border shadow-subtle">
              <div className="flex items-center gap-4 sm:gap-6 border-b border-brand-border pb-2 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 whitespace-nowrap transition-colors ${
                    activeTab === 'details' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 whitespace-nowrap transition-colors ${
                    activeTab === 'care' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  Material &amp; Care
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 whitespace-nowrap transition-colors ${
                    activeTab === 'reviews' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  Reviews ({product.ratingCount})
                </button>
              </div>

              <div className="py-3 sm:py-4 text-xs text-brand-text leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-2.5">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-brand-muted">
                      {product.details.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'care' && (
                  <ul className="list-disc pl-4 space-y-1.5 text-brand-muted">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-2.5">
                    {SAMPLE_REVIEWS.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-xl bg-brand-cream/40 border border-brand-border">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-brand-text text-xs">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-1.5 rounded">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{rev.rating}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-brand-muted">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products from Local Stores */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-10 border-t border-brand-border">
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Hyperlocal Recommendations</span>
                <h3 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text">
                  More from Nearby Boutiques
                </h3>
              </div>
              <Link to={`/category/${product.categorySlug}`} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFFCF5] hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 hover:border-brand-blue text-xs font-bold transition-all duration-200 shadow-subtle group shrink-0">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar for Mobile Viewports (Positioned above MobileBottomNav) */}
      <div className="sm:hidden fixed bottom-13 sm:bottom-14 left-0 right-0 z-30 bg-brand-card/95 backdrop-blur-md border-t border-brand-border p-2 flex items-center gap-2 shadow-float">
        <Button
          variant="primary"
          size="sm"
          icon={ShoppingBag}
          onClick={handleAddToCart}
          className="flex-1 py-2 text-xs"
        >
          Add to Cart
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={Zap}
          onClick={handleBuyNow}
          className="flex-1 py-2 text-xs truncate"
        >
          Buy Now • ₹{product.price}
        </Button>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-float border border-brand-border max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h4 className="font-bold text-sm sm:text-base text-brand-text">Size Chart &amp; Fit Guide</h4>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream text-brand-muted hover:text-brand-text cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="py-3 sm:py-4 text-xs space-y-3">
              <p className="text-brand-muted">All measurements are in inches. Standard regular fit.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-brand-border text-xs">
                  <thead>
                    <tr className="bg-brand-cream/60">
                      <th className="p-2 border border-brand-border text-brand-text font-bold">Size</th>
                      <th className="p-2 border border-brand-border text-brand-text font-bold">Bust/Chest</th>
                      <th className="p-2 border border-brand-border text-brand-text font-bold">Waist</th>
                      <th className="p-2 border border-brand-border text-brand-text font-bold">Length</th>
                    </tr>
                  </thead>
                  <tbody className="text-brand-muted">
                    <tr><td className="p-2 border border-brand-border font-bold text-brand-text">S</td><td className="p-2 border border-brand-border">36"</td><td className="p-2 border border-brand-border">30"</td><td className="p-2 border border-brand-border">27"</td></tr>
                    <tr><td className="p-2 border border-brand-border font-bold text-brand-text">M</td><td className="p-2 border border-brand-border">38"</td><td className="p-2 border border-brand-border">32"</td><td className="p-2 border border-brand-border">28"</td></tr>
                    <tr><td className="p-2 border border-brand-border font-bold text-brand-text">L</td><td className="p-2 border border-brand-border">40"</td><td className="p-2 border border-brand-border">34"</td><td className="p-2 border border-brand-border">29"</td></tr>
                    <tr><td className="p-2 border border-brand-border font-bold text-brand-text">XL</td><td className="p-2 border border-brand-border">42"</td><td className="p-2 border border-brand-border">36"</td><td className="p-2 border border-brand-border">30"</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="p-2.5 sm:p-3 bg-brand-blue-light/70 border border-brand-blue/20 rounded-xl text-brand-blue font-medium text-[11px] sm:text-xs">
                Tip: If unsure, choose your standard size. Our local delivery partner allows you to try on both sizes at your doorstep!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COUPONS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import {
  Trash2,
  Tag,
  Clock,
  ShieldCheck,
  Check,
  ShoppingBag
} from 'lucide-react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    currentLocation
  } = useApp();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (code: string) => {
    setCouponError('');
    const result = applyCoupon(code);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponCodeInput('');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-20 md:pb-16 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Your Bag</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-editorial font-bold text-brand-text tracking-tight mt-0.5">
              Shopping Cart
            </h1>
            <p className="text-xs text-brand-muted mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
              <span>Local delivery to:</span>
              <span className="font-semibold text-brand-text truncate">{currentLocation.split(',')[0]}</span>
            </p>
          </div>
          <span className="text-xs font-bold text-brand-text bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-brand-border shadow-sm shrink-0">
            {cart.length} items
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {/* Delivery ETA pill */}
              <div className="p-3 bg-brand-blue-light/70 border border-brand-blue/30 rounded-xl sm:rounded-2xl flex items-center justify-between text-xs text-brand-blue">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>Doorstep delivery ready in 25-35 minutes</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-white px-2 py-0.5 rounded-full border border-brand-blue/20 shrink-0 ml-1">
                  Express
                </span>
              </div>

              {/* Items Card */}
              <div className="space-y-2.5 sm:space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-brand-border shadow-subtle flex gap-2.5 sm:gap-4 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 sm:w-24 sm:h-28 rounded-lg sm:rounded-xl bg-brand-cream/50 overflow-hidden shrink-0 border border-brand-border">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-xs sm:text-sm font-bold text-brand-text hover:text-brand-blue line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-muted hover:text-red-500 p-1 shrink-0 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 truncate">
                          From: <strong className="text-brand-text font-semibold">{item.product.storeName}</strong> ({item.product.distanceKm} km)
                        </p>

                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-brand-muted mt-1">
                          <span className="bg-brand-cream px-1.5 py-0.5 rounded font-semibold text-brand-text border border-brand-border text-[10px] sm:text-[11px]">
                            Size: {item.selectedSize}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] sm:text-[11px]">
                            <span
                              style={{ backgroundColor: item.selectedColor.hex }}
                              className="w-2.5 h-2.5 rounded-full border border-brand-border inline-block"
                            />
                            <span className="capitalize">{item.selectedColor.name}</span>
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-brand-border">
                        {/* Qty */}
                        <div className="flex items-center border border-brand-border rounded-lg bg-brand-cream/40">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs font-bold text-brand-text hover:text-brand-blue cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-brand-text">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs font-bold text-brand-text hover:text-brand-blue cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-extrabold text-brand-text text-xs sm:text-base">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[10px] sm:text-xs text-brand-muted line-through block">
                              ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping button */}
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark"
                >
                  &larr; Continue shopping from nearby boutiques
                </Link>
              </div>
            </div>

            {/* Right: Coupon & Price Summary Card */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              {/* Coupon Code Section */}
              <div className="p-3 sm:p-5 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                    Apply Local Coupon
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="p-2.5 sm:p-3 bg-brand-blue-light/50 border border-brand-blue/30 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1 font-bold text-brand-blue">
                        <Check className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Code &ldquo;{appliedCoupon.code}&rdquo; Applied</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-brand-blue/80 mt-0.5">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon (e.g. WEAR50)"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        className="flex-1 min-w-0 px-3 py-2 bg-brand-cream/30 border border-brand-border rounded-xl text-xs font-bold uppercase placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-brand-blue"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApplyCoupon(couponCodeInput)}
                        className="shrink-0"
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-[10px] sm:text-[11px] text-red-500 font-medium mt-1">{couponError}</p>
                    )}

                    {/* Quick Suggestions */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {COUPONS.map((cpn) => (
                        <button
                          key={cpn.code}
                          type="button"
                          onClick={() => handleApplyCoupon(cpn.code)}
                          className="px-2 py-0.5 sm:py-1 bg-brand-cream/60 hover:bg-brand-blue-light border border-dashed border-brand-blue/40 rounded-lg text-[9px] sm:text-[10px] font-bold text-brand-blue transition-colors cursor-pointer"
                        >
                          {cpn.code} ({cpn.discountPercent}% OFF)
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="p-3.5 sm:p-6 rounded-2xl bg-white border border-brand-border shadow-subtle space-y-2.5 sm:space-y-4">
                <h3 className="font-editorial font-bold text-sm sm:text-base text-brand-text pb-2 sm:pb-3 border-b border-brand-border">
                  Price Breakdown
                </h3>

                <div className="space-y-2 text-xs text-brand-muted">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-brand-text">₹{cartSubtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Local Express Delivery</span>
                    <span>
                      {cartDeliveryFee === 0 ? (
                        <strong className="text-emerald-700 uppercase font-bold">FREE</strong>
                      ) : (
                        `₹${cartDeliveryFee}`
                      )}
                    </span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Coupon Savings</span>
                      <span>-₹{cartDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-muted">
                    <span>Boutique Handling &amp; GST (5%)</span>
                    <span>₹{Math.round(cartSubtotal * 0.05).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-brand-border flex justify-between items-baseline">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-brand-text">Total Payable</span>
                    <p className="text-[9px] sm:text-[10px] text-emerald-700 font-semibold">Inclusive of all local charges</p>
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-brand-text">
                    ₹{(cartFinalTotal + Math.round(cartSubtotal * 0.05)).toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  showArrow
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-brand-muted pt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Doorstep try-on guarantee &amp; contactless delivery</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-brand-border max-w-lg mx-auto p-6 sm:p-8 shadow-subtle">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-3 border border-brand-blue/20">
              <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-brand-blue" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-brand-text">Your shopping cart is empty</h3>
            <p className="text-xs text-brand-muted mt-1.5 max-w-xs mx-auto leading-relaxed">
              Add trending dresses, casual sneakers, and boutique shirts to place your fast 30-min doorstep order.
            </p>
            <Button
              variant="primary"
              size="md"
              showArrow
              onClick={() => navigate('/')}
              className="mt-5"
            >
              Start Shopping Local
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

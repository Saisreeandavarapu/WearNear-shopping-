import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import {
  MapPin,
  Plus,
  CreditCard,
  Clock,
  Lock,
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartFinalTotal,
    addresses,
    selectedAddress,
    setSelectedAddressId,
    addAddress,
    createOrder
  } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('priya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);

  // New Address form
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrArea, setNewAddrArea] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrPincode, setNewAddrPincode] = useState('560038');
  const [newAddrType, setNewAddrType] = useState<'Home' | 'Work' | 'Other'>('Home');

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrLine || !newAddrPincode) return;
    addAddress({
      name: newAddrName,
      phone: newAddrPhone || '+91 98765 43210',
      addressLine: newAddrLine,
      area: newAddrArea || 'Indiranagar',
      city: newAddrCity,
      pincode: newAddrPincode,
      type: newAddrType,
      isDefault: false
    });
    setIsNewAddressModalOpen(false);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const paymentLabel =
        paymentMethod === 'upi'
          ? `UPI (${upiId})`
          : paymentMethod === 'card'
          ? 'Card ending in 4242'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : 'Net Banking';
      const order = createOrder(paymentLabel);
      navigate(`/orders/confirmation/${order.id}`);
    }, 1800);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-4 text-center text-brand-text">
        <h2 className="text-lg sm:text-xl font-bold font-editorial">Your cart is currently empty</h2>
        <p className="text-xs text-brand-muted mt-1">Add items from nearby stores to checkout</p>
        <Button
          variant="primary"
          size="md"
          showArrow
          onClick={() => navigate('/')}
          className="mt-4"
        >
          Return to Shopping
        </Button>
      </div>
    );
  }

  const tax = Math.round(cartSubtotal * 0.05);
  const grandTotal = cartFinalTotal + tax;

  return (
    <div className="min-h-screen bg-brand-cream pb-20 md:pb-16 text-brand-text">
      {/* Checkout Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-brand-border py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/image.png" alt="WearNear" className="h-7 sm:h-9 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light border border-brand-blue/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
              Simulated Checkout
            </span>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-brand-muted font-medium">
              <Lock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600 shrink-0" />
              <span>256-bit Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-4 sm:mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-3 text-[9.5px] sm:text-xs font-bold whitespace-nowrap">
            <div
              className={`flex items-center gap-1 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full ${
                currentStep >= 1 ? 'bg-brand-blue text-white' : 'bg-brand-cream-dark text-brand-muted'
              }`}
            >
              <span>1. Address</span>
            </div>
            <div className="w-3 sm:w-8 h-0.5 bg-brand-border shrink-0" />
            <div
              className={`flex items-center gap-1 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full ${
                currentStep >= 2 ? 'bg-brand-blue text-white' : 'bg-brand-cream-dark text-brand-muted'
              }`}
            >
              <span>2. Review</span>
            </div>
            <div className="w-3 sm:w-8 h-0.5 bg-brand-border shrink-0" />
            <div
              className={`flex items-center gap-1 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full ${
                currentStep >= 3 ? 'bg-brand-blue text-white' : 'bg-brand-cream-dark text-brand-muted'
              }`}
            >
              <span>3. Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Main Wizard Area */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-6">
            {/* STEP 1: Select Delivery Address */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-6 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                  <h2 className="font-editorial font-bold text-sm sm:text-base text-brand-text">
                    1. Delivery Address
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewAddressModalOpen(true)}
                  className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Address</span>
                </button>
              </div>

              {/* Address Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-3 sm:mt-4">
                {addresses.map((addr) => {
                  const isSelected = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-blue bg-brand-blue-light/20 shadow-sm'
                          : 'border-brand-border hover:border-brand-blue/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-brand-text truncate">{addr.name}</span>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-brand-cream text-brand-text rounded border border-brand-border shrink-0 ml-1">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">{addr.addressLine}</p>
                      <p className="text-xs text-brand-muted">
                        {addr.area}, {addr.city} - {addr.pincode}
                      </p>
                      <p className="text-[11px] text-brand-text mt-1.5 font-medium">📞 {addr.phone}</p>
                    </div>
                  );
                })}
              </div>

              {currentStep === 1 && (
                <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-brand-border flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    showArrow
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Review
                  </Button>
                </div>
              )}
            </div>

            {/* STEP 2: Order Items Review */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-6 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                  <h2 className="font-editorial font-bold text-sm sm:text-base text-brand-text">
                    2. Local Boutique Items ({cart.length})
                  </h2>
                </div>
                {currentStep > 2 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-brand-blue hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep >= 2 && (
                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5 sm:gap-3 py-2 border-b border-brand-border last:border-0">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-10 h-12 sm:w-12 sm:h-14 object-cover rounded-lg bg-brand-cream/50 border border-brand-border shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-bold text-brand-text truncate">{item.product.name}</p>
                        <p className="text-brand-muted text-[11px] truncate">
                          {item.product.storeName} • Size: {item.selectedSize} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-brand-text shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <div className="p-2.5 sm:p-3 bg-brand-blue-light/50 border border-brand-blue/30 rounded-xl text-xs text-brand-blue flex items-center justify-between">
                    <span className="truncate">⚡ Delivery in 25-35 mins to {selectedAddress.area}</span>
                    <span className="font-bold shrink-0 ml-1">Express</span>
                  </div>

                  {currentStep === 2 && (
                    <div className="pt-3 sm:pt-4 border-t border-brand-border flex justify-between items-center gap-2">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs text-brand-muted hover:text-brand-text font-semibold cursor-pointer"
                      >
                        &larr; Address
                      </button>
                      <Button
                        variant="primary"
                        size="sm"
                        showArrow
                        onClick={() => setCurrentStep(3)}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* STEP 3: Payment Method Selection */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-6 border border-brand-border shadow-subtle">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                  <h2 className="font-editorial font-bold text-sm sm:text-base text-brand-text">
                    3. Payment Method
                  </h2>
                </div>
              </div>

              {currentStep >= 3 && (
                <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                  {/* Option 1: UPI */}
                  <label
                    className={`flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-brand-blue bg-brand-blue-light/20' : 'border-brand-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 accent-brand-blue"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-brand-text truncate">UPI (Google Pay / PhonePe)</span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                          0% Fee
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-brand-muted mt-0.5">Pay securely using any UPI app</p>
                      {paymentMethod === 'upi' && (
                        <div className="mt-2.5">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter your UPI ID"
                            className="w-full sm:w-72 px-3 py-2 bg-white border border-brand-border rounded-lg text-xs font-semibold focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 2: Credit / Debit Card */}
                  <label
                    className={`flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-brand-blue bg-brand-blue-light/20' : 'border-brand-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-brand-blue"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-brand-text">Credit / Debit Card</span>
                        <span className="text-[10px] text-brand-muted">Visa, Mastercard</span>
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="mt-2.5 grid grid-cols-2 gap-2 max-w-sm">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="col-span-2 px-3 py-2 bg-white border border-brand-border rounded-lg text-xs font-mono focus:border-brand-blue"
                          />
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="px-3 py-2 bg-white border border-brand-border rounded-lg text-xs font-mono focus:border-brand-blue"
                          />
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="px-3 py-2 bg-white border border-brand-border rounded-lg text-xs font-mono focus:border-brand-blue"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-brand-blue bg-brand-blue-light/20' : 'border-brand-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-brand-blue"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-brand-text truncate">Cash on Delivery / Doorstep QR</span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-brand-text bg-brand-cream px-1.5 py-0.5 rounded border border-brand-border shrink-0">
                          Cash/QR
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-brand-muted mt-0.5">Pay via cash or UPI scan when rider arrives</p>
                    </div>
                  </label>

                  {/* Final Place Order Button */}
                  <div className="pt-3 sm:pt-4 border-t border-brand-border flex items-center justify-between gap-2">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-brand-muted hover:text-brand-text font-semibold cursor-pointer"
                    >
                      &larr; Back
                    </button>
                    <Button
                      variant="primary"
                      size="md"
                      isLoading={isProcessing}
                      onClick={handlePlaceOrder}
                    >
                      Place Order • ₹{grandTotal.toLocaleString()}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-brand-border shadow-subtle space-y-3 sm:space-y-4">
              <h3 className="font-editorial font-bold text-xs sm:text-sm text-brand-text pb-2.5 sm:pb-3 border-b border-brand-border">
                Order Total
              </h3>

              <div className="space-y-2 text-xs text-brand-muted">
                <div className="flex justify-between">
                  <span>Items ({cart.length})</span>
                  <span className="font-semibold text-brand-text">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fast Delivery</span>
                  <span>
                    {cartDeliveryFee === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `₹${cartDeliveryFee}`}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes (5%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-brand-border flex justify-between items-baseline">
                <span className="font-bold text-xs sm:text-sm text-brand-text">Grand Total</span>
                <span className="text-lg sm:text-xl font-extrabold text-brand-text">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Modal */}
      {isNewAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-float border border-brand-border max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <h3 className="text-sm sm:text-base font-editorial font-bold text-brand-text mb-3">Add Delivery Address</h3>
            <form onSubmit={handleSaveAddress} className="space-y-2.5 sm:space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-text block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Flat / House / Building</label>
                <input
                  type="text"
                  required
                  value={newAddrLine}
                  onChange={(e) => setNewAddrLine(e.target.value)}
                  placeholder="e.g. Flat 301, Magnolia Court"
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-brand-text block mb-1">Area / Locality</label>
                  <input
                    type="text"
                    value={newAddrArea}
                    onChange={(e) => setNewAddrArea(e.target.value)}
                    placeholder="e.g. Indiranagar"
                    className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="font-bold text-brand-text block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    placeholder="560038"
                    className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Address Type</label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewAddrType(t)}
                      className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg border text-xs font-bold ${
                        newAddrType === t ? 'border-brand-blue bg-brand-blue text-white' : 'border-brand-border text-brand-text bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewAddressModalOpen(false)}
                  className="px-3.5 py-1.5 border border-brand-border rounded-xl font-bold text-brand-muted hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Package,
  MapPin,
  Star,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Heart,
  HelpCircle
} from 'lucide-react';

export const Account: React.FC = () => {
  const navigate = useNavigate();
  const { addresses, orders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'reviews'>('orders');

  // Profile Edit State
  const [userName, setUserName] = useState('Priya Sharma');
  const [userEmail, setUserEmail] = useState('priya.sharma@example.com');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Review state
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your verified local review has been posted.', 'success');
    setShowReviewModal(false);
    setNewReviewText('');
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      {/* Top Banner */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-7">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-brand-blue border-2 border-white shadow-md flex items-center justify-center text-white text-xl sm:text-2xl font-editorial font-bold shrink-0">
                PS
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h1 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text truncate">{userName}</h1>
                  <span className="text-[10px] sm:text-[11px] font-bold bg-brand-blue-light text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded-full shrink-0">
                    VIP Member
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 truncate">{userEmail} • {userPhone}</p>
                <p className="text-[11px] sm:text-xs text-emerald-700 font-semibold mt-0.5 sm:mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> WearNear Verified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-white border border-brand-border hover:border-brand-blue rounded-xl text-xs font-bold text-brand-text transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => {
                  showToast('Signed out of WearNear session.', 'info');
                  navigate('/auth/login');
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Mobile Horizontal Tabs (<md) */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 -mx-3.5 px-3.5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-brand-text border border-brand-border'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'addresses'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-brand-text border border-brand-border'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Addresses ({addresses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-brand-text border border-brand-border'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Reviews</span>
          </button>
          <Link
            to="/wishlist"
            className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-white text-brand-text border border-brand-border flex items-center gap-1.5 shrink-0"
          >
            <Heart className="w-3.5 h-3.5 text-red-500" />
            <span>Wishlist</span>
          </Link>
          <Link
            to="/support"
            className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-white text-brand-text border border-brand-border flex items-center gap-1.5 shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-brand-blue" />
            <span>Support</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Navigation Sidebar (Desktop >= md) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-2 border border-brand-border shadow-subtle space-y-1 text-xs font-bold sticky top-24">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeTab === 'orders' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-text hover:bg-brand-cream'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeTab === 'addresses' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-text hover:bg-brand-cream'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses ({addresses.length})</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeTab === 'reviews' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-text hover:bg-brand-cream'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4" />
                  <span>My Reviews &amp; Ratings</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <Link
                to="/wishlist"
                className="w-full flex items-center justify-between p-3 rounded-xl text-brand-text hover:bg-brand-cream transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>My Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>

              <Link
                to="/support"
                className="w-full flex items-center justify-between p-3 rounded-xl text-brand-text hover:bg-brand-cream transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-brand-blue" />
                  <span>Help &amp; Support Tickets</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-editorial font-bold text-brand-text">Your Recent Orders</h2>
                  <Link to="/orders/track" className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark">
                    Live Tracking &rarr;
                  </Link>
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-3.5 sm:p-5 border border-brand-border shadow-subtle space-y-3 sm:space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-brand-border text-xs">
                        <div>
                          <p className="font-bold text-brand-text">Order #{ord.orderNumber}</p>
                          <p className="text-brand-muted text-[11px] mt-0.5">{ord.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                              ord.status === 'confirmed'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'out_for_delivery'
                                ? 'bg-brand-blue-light text-brand-blue'
                                : ord.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ord.status.replace('_', ' ')}
                          </span>
                          <span className="font-extrabold text-sm text-brand-text">
                            ₹{ord.finalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                              <img
                                src={item.product.images[0]}
                                alt=""
                                className="w-10 h-12 object-cover rounded-lg bg-brand-cream/50 border border-brand-border shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-brand-text truncate">{item.product.name}</p>
                                <p className="text-brand-muted text-[11px] truncate">
                                  {item.product.storeName} • Size: {item.selectedSize}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-text shrink-0">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-2.5 sm:pt-3 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                        <span className="text-brand-muted text-[11px] sm:text-xs">
                          Delivered to: <strong className="text-brand-text">{ord.address.area}</strong>
                        </span>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Link
                            to="/orders/track"
                            className="flex-1 sm:flex-initial text-center px-3.5 py-1.5 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
                          >
                            Track Delivery
                          </Link>
                          <button
                            onClick={() => setShowReviewModal(true)}
                            className="flex-1 sm:flex-initial text-center px-3 py-1.5 border border-brand-border rounded-full font-bold text-brand-text hover:bg-brand-cream transition-colors"
                          >
                            Write Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-editorial font-bold text-brand-text">Delivery Address Book</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-brand-text">{addr.name}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-brand-cream text-brand-text rounded border border-brand-border">
                            {addr.type}
                          </span>
                        </div>
                        <p className="text-xs text-brand-muted leading-relaxed">{addr.addressLine}</p>
                        <p className="text-xs text-brand-muted">{addr.area}, {addr.city} - {addr.pincode}</p>
                        <p className="text-xs text-brand-text mt-2 font-medium">📞 {addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-xs font-bold text-brand-blue">
                        <span>{addr.isDefault ? 'Default Address' : 'Secondary Address'}</span>
                        <button className="text-brand-muted hover:text-brand-text py-1 px-2">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-editorial font-bold text-brand-text">Your Boutique Reviews</h2>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
                  >
                    + Write Review
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-brand-text">Review for StyleHub Boutique</h4>
                      <p className="text-[10px] sm:text-[11px] text-brand-muted">Order WN-2026-8831 • Verified</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      ★ 5.0
                    </div>
                  </div>
                  <p className="text-xs text-brand-text leading-relaxed">
                    &ldquo;Arrived in literally 22 minutes! The fabric quality is exceptional, exactly as photographed in the boutique. Being able to buy from local boutiques online without waiting days is a game changer.&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-float border border-brand-border animate-in slide-in-from-bottom duration-200">
            <h3 className="text-sm sm:text-base font-editorial font-bold text-brand-text mb-3">Edit Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-text block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-bold hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-float border border-brand-border animate-in slide-in-from-bottom duration-200">
            <h3 className="text-sm sm:text-base font-editorial font-bold text-brand-text mb-1">Write Verified Review</h3>
            <p className="text-xs text-brand-muted mb-4">
              Share your feedback regarding boutique garment fit and delivery speed.
            </p>
            <form onSubmit={handlePostReview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-text block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className={`text-lg ${star <= newReviewRating ? 'text-amber-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="How was the dress/shirt fabric? Was the 30-min courier on time?"
                  className="w-full p-3 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-bold hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

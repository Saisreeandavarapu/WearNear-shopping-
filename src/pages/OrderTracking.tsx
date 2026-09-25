import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Package,
  Store,
  Navigation,
  X
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { orders, cancelOrder, showToast } = useApp();
  const [selectedOrderId] = useState<string>(orders[0]?.id || '');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueText, setIssueText] = useState('');

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    showToast('Your issue report has been sent to local dispatch team.', 'success');
    setIssueText('');
    setIsIssueModalOpen(false);
  };

  const handleCallRider = () => {
    showToast(`Connecting call to rider ${activeOrder.deliveryPartner.name}...`, 'info');
  };

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center text-brand-text">
        <Package className="w-12 h-12 text-brand-muted mb-3" />
        <h2 className="text-xl font-bold font-editorial">No active orders to track</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold text-brand-blue uppercase tracking-wider">
                Live Hyperlocal Dispatch
              </span>
              <span className="text-[10px] font-semibold text-brand-muted bg-brand-cream border border-brand-border px-2 py-0.5 rounded-full">
                Simulated Telemetry
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-editorial font-bold text-brand-text tracking-tight mt-1">
              Order #{activeOrder.orderNumber}
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">Placed on {activeOrder.date}</p>
          </div>

          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <button
              onClick={() => setIsIssueModalOpen(true)}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-white hover:bg-brand-cream border border-brand-border text-xs font-bold text-brand-text rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Report Issue</span>
            </button>

            {activeOrder.status !== 'cancelled' && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Live Map Mock & Partner details */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Interactive Hyperlocal Map Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border shadow-card">
              <div className="relative h-44 sm:h-80 bg-brand-cream/60 overflow-hidden">
                {/* Simulated Stylized Map Canvas */}
                <div className="absolute inset-0 bg-[#E8E4DA] opacity-80" />

                {/* Roads and city grid pattern */}
                <svg className="absolute inset-0 w-full h-full text-white/80" stroke="currentColor">
                  <path d="M-10,40 Q150,70 300,50 T600,120 T900,80" strokeWidth="12" fill="none" />
                  <path d="M80,-10 L160,400" strokeWidth="8" fill="none" stroke="#D1CCC1" />
                  <path d="M280,-10 L320,400" strokeWidth="10" fill="none" stroke="#D1CCC1" />
                  <path d="M-10,180 L800,210" strokeWidth="9" fill="none" stroke="#D1CCC1" />
                </svg>

                {/* Active Transit Route Line */}
                <svg className="absolute inset-0 w-full h-full" stroke="#243FBA">
                  <path
                    d="M 120,70 Q 220,130 380,180"
                    strokeWidth="5"
                    strokeDasharray="6,6"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>

                {/* Boutique Store Marker */}
                <div className="absolute top-[45px] sm:top-[60px] left-[65px] sm:left-[105px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-text text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Store className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[8.5px] sm:text-[10px] font-bold bg-white/95 px-1.5 sm:px-2 py-0.5 rounded shadow mt-0.5 whitespace-nowrap border border-brand-border">
                    Boutique
                  </span>
                </div>

                {/* Delivery Rider Marker (Animated in transit) */}
                <div className="absolute top-[90px] sm:top-[125px] left-[155px] sm:left-[245px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-float border-2 border-white">
                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 rotate-45" />
                  </div>
                  <span className="text-[8.5px] sm:text-[10px] font-bold bg-brand-blue text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow mt-0.5 whitespace-nowrap">
                    Ramesh (1.2 km)
                  </span>
                </div>

                {/* Customer Destination Marker */}
                <div className="absolute top-[130px] sm:top-[180px] left-[240px] sm:left-[380px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[8.5px] sm:text-[10px] font-bold bg-white/95 px-1.5 sm:px-2 py-0.5 rounded shadow mt-0.5 whitespace-nowrap border border-brand-border">
                    Your Doorstep
                  </span>
                </div>

                {/* Live Speed Tag */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-brand-border shadow-sm flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-brand-text">Arriving in ~18 mins</span>
                </div>
              </div>

              {/* Delivery Executive Profile */}
              <div className="p-3 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-t border-brand-border">
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  <img
                    src={activeOrder.deliveryPartner.photo}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border border-brand-border shadow-sm shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <h3 className="font-bold text-xs sm:text-sm text-brand-text">{activeOrder.deliveryPartner.name}</h3>
                      <span className="text-[9.5px] sm:text-[11px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                        ★ {activeOrder.deliveryPartner.rating}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-brand-muted mt-0.5">
                      {activeOrder.deliveryPartner.vehicle} • {activeOrder.deliveryPartner.vehicleNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCallRider}
                    className="flex-1 sm:flex-initial px-3.5 py-1.5 sm:px-4 sm:py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg sm:rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Partner</span>
                  </button>
                  <button
                    onClick={() => showToast('Opening instant chat with delivery courier...', 'info')}
                    className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-brand-border hover:bg-brand-cream text-brand-text transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Reassurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-brand-text">
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-brand-border flex items-center gap-2.5 sm:gap-3 shadow-subtle">
                <RotateCcw className="w-5 h-5 text-brand-blue shrink-0" />
                <div>
                  <p className="font-bold text-xs">10-Minute Fit &amp; Try</p>
                  <p className="text-[10px] sm:text-[11px] text-brand-muted">Try before courier departs</p>
                </div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-brand-border flex items-center gap-2.5 sm:gap-3 shadow-subtle">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-xs">Contactless Delivery</p>
                  <p className="text-[10px] sm:text-[11px] text-brand-muted">Verified sanitized dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Progress & Order Summary */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-brand-border shadow-card">
              <h3 className="font-editorial font-bold text-sm sm:text-base text-brand-text pb-3 sm:pb-4 border-b border-brand-border">
                Delivery Timeline
              </h3>

              <div className="mt-4 sm:mt-5 space-y-5 sm:space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border">
                {activeOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed || step.current ? 'bg-brand-blue border-white' : 'bg-brand-cream-dark border-brand-border'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4
                          className={`text-xs font-bold ${
                            step.completed || step.current ? 'text-brand-text' : 'text-brand-muted'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-brand-muted font-mono shrink-0">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items Snapshot */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-brand-border shadow-subtle text-xs">
              <h4 className="font-bold text-brand-text mb-3">Items in this Package</h4>
              <div className="space-y-2.5">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-2 py-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-brand-blue shrink-0">{item.quantity}x</span>
                      <span className="text-brand-text truncate">{item.product.name} ({item.selectedSize})</span>
                    </div>
                    <span className="font-extrabold text-brand-text shrink-0">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 sm:mt-4 pt-3 border-t border-brand-border flex justify-between font-extrabold text-xs sm:text-sm text-brand-text">
                <span>Total Amount Paid</span>
                <span className="text-brand-blue font-bold">₹{activeOrder.finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-float text-center border border-brand-border max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial font-bold text-base text-brand-text mb-2">Cancel Order?</h3>
            <p className="text-xs text-brand-muted mb-4">
              Are you sure? The boutique has already started preparing your authentic garments.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-brand-border font-bold text-xs hover:bg-brand-cream"
              >
                No, Keep Order
              </button>
              <button
                onClick={() => {
                  cancelOrder(activeOrder.id);
                  setIsCancelModalOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-float border border-brand-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-brand-border mb-3">
              <h3 className="font-bold text-sm text-brand-text">Report Delivery Issue</h3>
              <button onClick={() => setIsIssueModalOpen(false)} className="text-brand-muted hover:text-brand-text p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleReportIssue} className="space-y-3 text-xs">
              <p className="text-brand-muted">Describe the issue so our local dispatch team can intervene immediately.</p>
              <textarea
                rows={3}
                required
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="e.g. Rider is at the wrong gate, or need to delay delivery by 10 mins..."
                className="w-full p-3 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-bold hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors"
                >
                  Send to Support
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

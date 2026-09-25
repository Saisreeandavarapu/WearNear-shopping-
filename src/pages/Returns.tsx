import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';

export const Returns: React.FC = () => {
  const { orders, showToast } = useApp();
  const [selectedReason, setSelectedReason] = useState<string>('Size too loose / tight');
  const [requestType, setRequestType] = useState<'exchange' | 'return'>('exchange');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reasons = [
    'Size too loose / tight',
    'Fabric / Material quality not as expected',
    'Color shade difference',
    'Defective or damaged item',
    'Ordered multiple sizes to try at home'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast(`${requestType === 'exchange' ? 'Size Exchange' : 'Return'} request submitted! Courier pickup scheduled.`, 'success');
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-8">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
            <RotateCcw className="w-4 h-4" />
            <span>Doorstep Exchange &amp; Return</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-editorial font-bold text-brand-text tracking-tight">
            Local Try &amp; Exchange Center
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Exchange your size with a 30-min local courier or request an instant refund
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-5 sm:py-8">
        {!isSubmitted ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-border shadow-card space-y-5 sm:space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Request Type Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                  Choose Resolution
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setRequestType('exchange')}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all ${
                      requestType === 'exchange'
                        ? 'border-brand-blue bg-brand-blue-light/30'
                        : 'border-brand-border hover:border-brand-blue/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="font-bold text-xs sm:text-sm text-brand-text">Size / Fit Exchange</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                        Fastest • 30 Mins
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-brand-muted">
                      Rider will bring the alternative size directly from the local store.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('return')}
                    className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all ${
                      requestType === 'return'
                        ? 'border-brand-blue bg-brand-blue-light/30'
                        : 'border-brand-border hover:border-brand-blue/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="font-bold text-xs sm:text-sm text-brand-text">Return for Refund</span>
                      <span className="text-[10px] font-bold text-brand-blue bg-brand-blue-light px-2 py-0.5 rounded border border-brand-blue/20 shrink-0">
                        Instant Refund
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-brand-muted">
                      Rider picks up and money is credited to your UPI within 2 hours.
                    </p>
                  </button>
                </div>
              </div>

              {/* Order Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                  Select Order &amp; Product
                </label>
                <div className="p-3 sm:p-3.5 bg-brand-cream/40 border border-brand-border rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-brand-text">Order #{orders[0]?.orderNumber || 'WN-2026-8831'}</p>
                    <p className="text-brand-muted text-[11px] truncate">{orders[0]?.items[0]?.product.name || 'Summer Linen Breeze Dress'} (Size: M)</p>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                    Eligible for Exchange
                  </span>
                </div>
              </div>

              {/* Reason Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-2">
                  Select Reason
                </label>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        selectedReason === r ? 'border-brand-blue bg-brand-blue-light/20 font-bold' : 'border-brand-border bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        checked={selectedReason === r}
                        onChange={() => setSelectedReason(r)}
                        className="accent-brand-blue shrink-0"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-text mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Specify replacement size or instructions for local courier..."
                  className="w-full p-3 bg-brand-cream/40 border border-brand-border rounded-xl text-xs focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white font-bold text-xs rounded-full shadow-md hover:bg-brand-blue-dark flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Confirm {requestType === 'exchange' ? 'Exchange' : 'Return'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-brand-border shadow-card text-center space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-6 sm:ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-editorial font-bold text-brand-text">
              {requestType === 'exchange' ? 'Exchange Scheduled!' : 'Return Initiated!'}
            </h3>
            <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
              Our nearby delivery courier will arrive at your address within <strong>35 minutes</strong>. Keep the original tags intact for instant inspection.
            </p>

            <div className="p-3.5 sm:p-4 bg-brand-cream/40 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-2 border border-brand-border">
              <div className="flex justify-between">
                <span className="text-brand-muted">Service:</span>
                <strong className="text-brand-text capitalize">{requestType} Pickup</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Refund / Swap SLA:</span>
                <strong className="text-emerald-700 font-bold">Within 45 mins</strong>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

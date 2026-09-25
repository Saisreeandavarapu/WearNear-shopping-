import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Printer
} from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useApp();

  const order = orders.find((o) => o.id === id) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-cream py-6 sm:py-10 pb-20 md:pb-16 text-brand-text">
      <div className="max-w-3xl mx-auto px-3 sm:px-6">
        {/* Celebration Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-border shadow-card text-center relative overflow-hidden">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto mb-2.5 sm:mb-4 ring-6 sm:ring-8 ring-brand-blue-light/50 border border-brand-blue/20">
            <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-brand-blue" />
          </div>

          <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Order Confirmed</span>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-editorial font-bold text-brand-text tracking-tight mt-0.5">
            Order Placed Successfully!
          </h1>
          <p className="text-[11px] sm:text-sm text-brand-muted mt-0.5 sm:mt-1">
            Thank you for shopping local with WearNear. Boutique is packing your order now.
          </p>

          <div className="mt-4 sm:mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-brand-text bg-brand-cream/50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-brand-border">
            <div>
              <span className="text-brand-muted block text-[8.5px] sm:text-[10px] uppercase font-bold">Order Number</span>
              <strong className="text-[11px] sm:text-sm font-mono text-brand-text">{order.orderNumber}</strong>
            </div>
            <div className="h-5 sm:h-6 w-px bg-brand-border hidden xs:block" />
            <div>
              <span className="text-brand-muted block text-[8.5px] sm:text-[10px] uppercase font-bold">Estimated Arrival</span>
              <strong className="text-[11px] sm:text-sm text-emerald-700 flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {order.estimatedDeliveryTime}
              </strong>
            </div>
            <div className="h-5 sm:h-6 w-px bg-brand-border hidden xs:block" />
            <div>
              <span className="text-brand-muted block text-[8.5px] sm:text-[10px] uppercase font-bold">Total Paid</span>
              <strong className="text-[11px] sm:text-sm text-brand-text">₹{order.finalAmount.toLocaleString()}</strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Link
              to="/orders/track"
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-brand-blue text-white text-xs font-bold rounded-xl sm:rounded-full shadow-md hover:bg-brand-blue-dark flex items-center justify-center gap-1.5 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Track Live Delivery Status</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
            </Link>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-3.5 py-2 sm:py-3 bg-white border border-brand-border hover:bg-brand-cream text-brand-text text-xs font-bold rounded-xl sm:rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Print Invoice / Receipt</span>
            </button>
          </div>
        </div>

        {/* Order Details & Receipt Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-brand-border shadow-subtle mt-3.5 sm:mt-6 space-y-3.5 sm:space-y-6">
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-border">
            <div>
              <h3 className="font-editorial font-bold text-sm sm:text-base text-brand-text">Boutique Tax Invoice</h3>
              <p className="text-[11px] sm:text-xs text-brand-muted">{order.date}</p>
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
              Confirmed
            </span>
          </div>

          {/* Items */}
          <div className="space-y-2.5 sm:space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1.5 sm:py-2 border-b border-brand-border/60">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-9 h-11 sm:w-10 sm:h-12 rounded-lg object-cover bg-brand-cream/50 border border-brand-border shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-brand-text truncate">{item.product.name}</p>
                    <p className="text-[10px] sm:text-[11px] text-brand-muted truncate">
                      {item.product.storeName} • Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-brand-text shrink-0 ml-2">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-brand-muted pt-2 border-t border-brand-border">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-brand-text">₹{order.itemTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Local Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `₹${order.deliveryFee}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount Applied</span>
                <span>-₹{order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST &amp; Boutique Fee</span>
              <span>₹{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-brand-text pt-2 border-t border-brand-border">
              <span>Final Paid Amount</span>
              <span className="text-brand-blue font-bold">₹{order.finalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Address & Delivery Partner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-brand-border text-xs">
            <div>
              <p className="font-bold text-brand-muted uppercase tracking-wider text-[9px] sm:text-[10px] mb-1">
                Delivering to
              </p>
              <p className="font-bold text-brand-text">{order.address.name}</p>
              <p className="text-brand-muted">{order.address.addressLine}</p>
              <p className="text-brand-muted">{order.address.area}, {order.address.city}</p>
              <p className="text-brand-muted">Phone: {order.address.phone}</p>
            </div>

            <div>
              <p className="font-bold text-brand-muted uppercase tracking-wider text-[9px] sm:text-[10px] mb-1">
                Delivery Executive
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src={order.deliveryPartner.photo}
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-brand-border shrink-0"
                />
                <div>
                  <p className="font-bold text-brand-text">{order.deliveryPartner.name}</p>
                  <p className="text-brand-muted text-[10px] sm:text-[11px]">{order.deliveryPartner.vehicle} ({order.deliveryPartner.vehicleNumber})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

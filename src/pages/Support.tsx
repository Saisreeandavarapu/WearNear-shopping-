import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Plus,
  Send,
  ChevronDown,
  X
} from 'lucide-react';

export const Support: React.FC = () => {
  const { tickets, createTicket, addTicketReply } = useApp();

  const [activeTicketId, setActiveTicketId] = useState<string>(tickets[0]?.id || '');
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Exchange & Returns');
  const [newMsg, setNewMsg] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMsg.trim()) return;
    const tkt = createTicket(newSubject, newCategory, newMsg);
    setActiveTicketId(tkt.id);
    setIsNewTicketModalOpen(false);
    setNewSubject('');
    setNewMsg('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    addTicketReply(activeTicket.id, replyText.trim());
    setReplyText('');
  };

  const faqs = [
    {
      q: 'How does 30-minute local delivery work?',
      a: 'WearNear partners directly with local fashion boutiques and retail storefronts within a 3-5 km radius of your location. Once your order is placed, the boutique packs the item in under 7 minutes, and our dedicated local courier delivers it straight to your doorstep.'
    },
    {
      q: 'Can I try clothes before keeping them?',
      a: 'Yes! WearNear offers an exclusive 10-Minute Doorstep Try & Fit service. The delivery partner will wait safely outside while you try on your items. You can keep what fits and hand back what does not.'
    },
    {
      q: 'How are exchanges handled?',
      a: 'If you need a different size, simply go to Returns > Exchange. The nearby store will dispatch the replacement size within 35 minutes.'
    },
    {
      q: 'Are all products 100% authentic?',
      a: 'Every boutique on WearNear is thoroughly vetted and holds official vendor authorization. All garments carry brand authenticity tags and invoices.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16 text-brand-text">
      {/* Header */}
      <div className="bg-brand-cream-dark/50 border-b border-brand-border py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Customer Care &amp; Hypercare</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-editorial font-bold text-brand-text tracking-tight">
              WearNear Help &amp; Support
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5 sm:mt-1">
              Fast resolution for orders, exchanges, and boutique queries
            </p>
          </div>

          <button
            onClick={() => setIsNewTicketModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue text-white rounded-full text-xs font-bold shadow-md hover:bg-brand-blue-dark flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Support Ticket</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Mobile Horizontal Ticket Selector (<lg) */}
        <div className="lg:hidden mb-4">
          <p className="text-xs font-bold text-brand-text mb-2">Select Active Ticket</p>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 -mx-3.5 px-3.5">
            {tickets.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTicketId(t.id)}
                className={`p-3 rounded-2xl border-2 text-left shrink-0 w-64 transition-all ${
                  activeTicket?.id === t.id
                    ? 'border-brand-blue bg-white shadow-subtle'
                    : 'border-brand-border bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-brand-muted">{t.ticketNumber}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-brand-text truncate">{t.subject}</h4>
                <div className="flex items-center justify-between text-[10px] text-brand-muted mt-1.5">
                  <span className="truncate">{t.category}</span>
                  <span className="shrink-0">{t.createdAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Chat & List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Left: Tickets List (Desktop >= lg) */}
          <div className="hidden lg:block lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-brand-text px-1">My Support Tickets</h3>
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicketId(t.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  activeTicket?.id === t.id
                    ? 'border-brand-blue bg-white shadow-subtle'
                    : 'border-brand-border bg-white hover:border-brand-blue/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-brand-muted">{t.ticketNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-brand-text line-clamp-1">{t.subject}</h4>
                <div className="flex items-center justify-between text-[11px] text-brand-muted mt-2">
                  <span>{t.category}</span>
                  <span>{t.createdAt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Active Ticket Conversation */}
          <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-brand-border shadow-card flex flex-col h-[440px] sm:h-[520px] overflow-hidden">
            {activeTicket ? (
              <>
                {/* Ticket Top bar */}
                <div className="p-3.5 sm:p-5 border-b border-brand-border flex items-center justify-between bg-brand-cream/40 gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-brand-blue block truncate">
                      {activeTicket.ticketNumber} • {activeTicket.category}
                    </span>
                    <h3 className="font-bold text-xs sm:text-base text-brand-text truncate">{activeTicket.subject}</h3>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-brand-muted shrink-0">Priority: {activeTicket.priority}</span>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4">
                  {activeTicket.messages.map((m) => {
                    const isCustomer = m.sender === 'customer';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[88%] sm:max-w-md p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isCustomer
                              ? 'bg-brand-blue text-white rounded-tr-none'
                              : 'bg-brand-blue-light text-brand-text border border-brand-blue/20 rounded-tl-none'
                          }`}
                        >
                          <p>{m.message}</p>
                        </div>
                        <span className="text-[10px] text-brand-muted mt-1 px-1">
                          {isCustomer ? 'You' : 'WearNear Concierge'} • {m.time}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="p-2.5 sm:p-3 border-t border-brand-border flex gap-2 bg-white">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message to support..."
                    className="flex-1 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-brand-cream/40 border border-brand-border rounded-full text-xs focus:outline-none focus:border-brand-blue"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 hover:bg-brand-blue-dark shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-brand-muted text-xs">
                Select a ticket to view conversation
              </div>
            )}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-brand-border shadow-card">
          <div className="max-w-2xl mx-auto text-center mb-5 sm:mb-6">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-blue">Support Knowledge</span>
            <h3 className="text-lg sm:text-2xl font-editorial font-bold text-brand-text mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-brand-muted mt-1">Everything you need to know about hyperlocal fashion</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-brand-border rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-brand-text flex items-center justify-between gap-2"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-muted shrink-0 transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-brand-blue' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs text-brand-muted leading-relaxed border-t border-brand-border/60 pt-2 bg-brand-cream/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-float border border-brand-border max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-brand-border mb-3">
              <h3 className="font-editorial font-bold text-sm sm:text-base text-brand-text">Create Support Ticket</h3>
              <button onClick={() => setIsNewTicketModalOpen(false)} className="text-brand-muted hover:text-brand-text p-1 cursor-pointer">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brand-text block mb-1">Issue Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                >
                  <option value="Exchange & Returns">Exchange &amp; Returns</option>
                  <option value="Delivery Delay">Delivery Delay / Rider Issue</option>
                  <option value="Product Authenticity">Product Quality &amp; Authenticity</option>
                  <option value="Billing & Invoicing">Billing &amp; Invoicing</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Size exchange for summer linen dress"
                  className="w-full px-3 py-2 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-brand-text block mb-1">Message Description</label>
                <textarea
                  rows={4}
                  required
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  className="w-full p-3 bg-brand-cream/40 border border-brand-border rounded-xl focus:outline-none focus:border-brand-blue"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-4 py-2 border border-brand-border rounded-xl font-bold hover:bg-brand-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-dark transition-colors shadow-sm"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

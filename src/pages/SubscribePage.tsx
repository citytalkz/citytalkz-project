import React, { useState } from 'react';
import { Crown, Check } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const SubscribePage: React.FC = () => {
  const { addToast } = useMagazine();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    setModalOpen(true);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    addToast(`Congratulations! Welcome to City Talkz ${selectedTier}.`, 'success');
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-sans">
      
      {/* Title Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a227]/10 border border-[#c9a227]/40 text-[#c9a227] text-xs font-mono uppercase tracking-[0.2em]">
          <Crown className="w-3.5 h-3.5" />
          <span>Membership Tiers</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#111111]">
          Subscribe to City Talkz
        </h1>
        <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed">
          Gain unrestricted digital archives, physical hardcover quarterly editions, and private invitations to collector salons.
        </p>
      </div>

      {/* Subscription Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Tier 1: Digital Patron */}
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 flex flex-col justify-between space-y-6 hover:border-[#c9a227]/60 transition-all shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
              Digital Access
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Digital Patron</h3>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl font-black text-[#111111]">$19</span>
              <span className="text-xs text-[#666666]">/ month</span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed border-t border-[#e5e5e5] pt-4">
              Complete digital access to all City Talkz articles, archives, and daily executive market dispatches.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#333333]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Unlimited web & mobile app reading</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Daily Market Briefing newsletter</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Full access to historical 10-year archives</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Bookmark and offline reading list</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectTier('Digital Patron')}
            className="w-full py-3 bg-[#111111] hover:bg-[#c9a227] hover:text-black text-white font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Select Digital Patron
          </button>
        </div>

        {/* Tier 2: Print & Digital Collector (Featured) */}
        <div className="bg-white border-2 border-[#c9a227] p-8 flex flex-col justify-between space-y-6 relative shadow-lg scale-105">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c9a227] text-black font-sans font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-1">
            Most Popular Choice
          </div>

          <div className="space-y-4 pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a227]">
              Print & Digital
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Collector’s Edition</h3>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl font-black text-[#c9a227]">$49</span>
              <span className="text-xs text-[#666666]">/ month</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed border-t border-[#e5e5e5] pt-4">
              Hardcover quarterly print journals delivered to your residence or yacht, plus all digital privileges.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#222222]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>4 Hardcover Luxury Print Editions per year</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Complimentary global courier shipping</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>All Digital Patron online privileges</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>VIP Invitations to annual Geneva Watch Salon</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectTier('Collector’s Edition')}
            className="w-full py-3.5 bg-[#c9a227] hover:bg-[#111111] hover:text-white text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Join Collector’s Edition
          </button>
        </div>

        {/* Tier 3: Private Circle */}
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 flex flex-col justify-between space-y-6 hover:border-[#c9a227]/60 transition-all shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
              Private Circle
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Collector’s Salon VIP</h3>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl font-black text-[#111111]">$149</span>
              <span className="text-xs text-[#666666]">/ month</span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed border-t border-[#e5e5e5] pt-4">
              Ultra-exclusive membership for C-suite principals, offering private concierge access and off-market real estate previews.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-[#333333]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Includes 4 Hardcover Print Journals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Direct line to Editors for bespoke inquiries</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Access to Off-Market Real Estate Registry</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c9a227]" />
                <span>Private Dinner & Tasting Invitations in Geneva/NYC</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectTier('Collector’s Salon VIP')}
            className="w-full py-3 bg-[#111111] hover:bg-[#c9a227] hover:text-black text-white font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Apply for VIP Circle
          </button>
        </div>

      </div>

      {/* Checkout Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#c9a227] p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
              <div className="flex items-center space-x-2 text-[#c9a227]">
                <Crown className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-[#111111]">Join {selectedTier}</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-[#666666] hover:text-[#111111]">✕</button>
            </div>

            <p className="text-xs text-[#555555]">
              Enter your preferred email address to begin your membership account setup.
            </p>

            <form onSubmit={handleConfirmSubscription} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#fafafa] border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#111111] text-white hover:bg-[#c9a227] hover:text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Confirm Membership Order
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

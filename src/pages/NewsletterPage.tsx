import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const NewsletterPage: React.FC = () => {
  const { addToast } = useMagazine();
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    dailyBriefing: true,
    weekendPortfolio: true,
    privateInvites: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      addToast('Preferences saved for City Talkz Private Briefing', 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-sans">
      
      <div className="text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c9a227] font-semibold">
          Curated Digital Briefings
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#111111]">
          The Private Executive Briefing
        </h1>
        <p className="text-sm sm:text-base text-[#555555] max-w-xl mx-auto leading-relaxed">
          Tailor your editorial intelligence stream to match your personal passions and investment focus.
        </p>
      </div>

      <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 space-y-8 shadow-sm">
        
        {submitted ? (
          <div className="p-8 bg-white border border-[#c9a227] text-center space-y-3 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-[#c9a227] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#111111]">Your Subscriptions Are Active</h3>
            <p className="text-xs text-[#555555]">
              A verification dispatch has been transmitted to <span className="text-[#111111] font-mono">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs uppercase text-[#555555] font-semibold">Your Preferred Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@domain.com"
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] text-[#111111] text-sm pl-10 pr-4 py-3 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-xs uppercase text-[#c9a227] font-mono tracking-wider font-semibold">
                Select Your Custom Intelligence Editions
              </label>

              <div className="space-y-3">
                <label className="flex items-start space-x-3 p-4 bg-white border border-[#e5e5e5] cursor-pointer hover:border-[#c9a227]/60 transition-colors shadow-xs">
                  <input
                    type="checkbox"
                    checked={preferences.dailyBriefing}
                    onChange={(e) => setPreferences({ ...preferences, dailyBriefing: e.target.checked })}
                    className="mt-1 accent-[#c9a227]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-[#111111] text-sm">The Daily Market Dispatch</h4>
                    <p className="text-xs text-[#666666]">Every morning: 3-minute essential updates on horology, supercars, and prime real estate.</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 bg-white border border-[#e5e5e5] cursor-pointer hover:border-[#c9a227]/60 transition-colors shadow-xs">
                  <input
                    type="checkbox"
                    checked={preferences.weekendPortfolio}
                    onChange={(e) => setPreferences({ ...preferences, weekendPortfolio: e.target.checked })}
                    className="mt-1 accent-[#c9a227]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-[#111111] text-sm">The Weekend Portfolio Review</h4>
                    <p className="text-xs text-[#666666]">Every Saturday: Long-form interviews, private jet flight reviews, and wine cellar investment analysis.</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 bg-white border border-[#e5e5e5] cursor-pointer hover:border-[#c9a227]/60 transition-colors shadow-xs">
                  <input
                    type="checkbox"
                    checked={preferences.privateInvites}
                    onChange={(e) => setPreferences({ ...preferences, privateInvites: e.target.checked })}
                    className="mt-1 accent-[#c9a227]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-[#111111] text-sm">Private Collector Salon Invites</h4>
                    <p className="text-xs text-[#666666]">Exclusive invites to off-market auctions, private watch manufacturer visits, and luxury previews.</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#111111] hover:bg-[#c9a227] hover:text-black text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Confirm Subscription Preferences
            </button>
          </form>
        )}

      </div>

    </div>
  );
};

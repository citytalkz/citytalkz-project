import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const NewsletterBanner: React.FC = () => {
  const { addToast } = useMagazine();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      addToast('Welcome to the City Talkz Private Executive Briefing.', 'success');
    }
  };

  return (
    <section className="my-16 relative bg-gradient-to-r from-[#fafafa] via-[#f5f5f5] to-[#fafafa] border-y border-[#c9a227]/40 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-sm">
      {/* Background Subtle Accent Lines */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a227]/10 border border-[#c9a227]/40 text-[#c9a227] text-xs font-mono uppercase tracking-[0.2em] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Members Only Intelligence</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight">
          The Private Executive Briefing
        </h2>

        <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed">
          Join over 45,000 global C-suite executives, collectors, and ultra-high-net-worth individuals receiving our weekly curated digest of off-market luxury, market intelligence, and private salon invitations.
        </p>

        {submitted ? (
          <div className="p-6 bg-white border border-[#c9a227] max-w-md mx-auto space-y-2 animate-in zoom-in-95 duration-300 shadow-md">
            <div className="flex items-center justify-center space-x-2 text-[#c9a227]">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-serif font-bold text-lg text-[#111111]">Subscription Confirmed</span>
            </div>
            <p className="text-xs text-[#555555]">
              A confirmation email has been dispatched to <span className="text-[#111111] font-mono font-bold">{email}</span>. Please check your inbox to customize your briefing frequency.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto pt-4">
            <div className="relative w-full sm:flex-1">
              <Mail className="w-4 h-4 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal or corporate email..."
                className="w-full bg-white border border-[#d4d4d4] focus:border-[#c9a227] text-[#111111] text-sm pl-11 pr-4 py-3.5 focus:outline-none transition-all placeholder:text-[#888888] shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Subscribe Now
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-6 text-[11px] text-[#737373] pt-2">
          <span>Strict Privacy Policy</span>
          <span>•</span>
          <span>Zero Spam</span>
          <span>•</span>
          <span>One-Click Unsubscribe</span>
        </div>
      </div>
    </section>
  );
};

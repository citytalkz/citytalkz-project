import React, { useState } from 'react';
import { Send, CheckCircle2, Crown, Sparkles, Building2 } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const AdvertisePage: React.FC = () => {
  const { addToast } = useMagazine();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    budget: '$50,000 - $100,000',
    category: 'Automotive & Superyachts',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your corporate partnership inquiry has been submitted to our Publisher Office.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c9a227] font-semibold">
          Luxury Brand Partnerships
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#111111]">
          Partner With City Talkz
        </h1>
        <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed">
          Position your brand in front of an ultra-exclusive global audience of tech founders, family office principals, collectors, and high-net-worth connoisseurs.
        </p>
      </div>

      {/* Demographics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-2 shadow-sm">
          <p className="font-serif text-3xl font-extrabold text-[#c9a227]">$3.4M</p>
          <p className="text-xs font-mono uppercase text-[#666666]">Average Net Worth</p>
        </div>
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-2 shadow-sm">
          <p className="font-serif text-3xl font-extrabold text-[#c9a227]">72%</p>
          <p className="text-xs font-mono uppercase text-[#666666]">C-Suite / Founder Executives</p>
        </div>
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-2 shadow-sm">
          <p className="font-serif text-3xl font-extrabold text-[#c9a227]">1.8M+</p>
          <p className="text-xs font-mono uppercase text-[#666666]">Monthly Impressions</p>
        </div>
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-2 shadow-sm">
          <p className="font-serif text-3xl font-extrabold text-[#c9a227]">84%</p>
          <p className="text-xs font-mono uppercase text-[#666666]">Global Collector Base</p>
        </div>
      </div>

      {/* Partnership Options */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#111111] border-b border-[#e5e5e5] pb-3">
          Bespoke Partnership Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#c9a227]" />
            <h3 className="font-serif text-xl font-bold text-[#111111]">Native Editorial Features</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Custom long-form brand stories crafted by senior City Talkz editors, complete with bespoke photography and interactive layout integrations.
            </p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <Crown className="w-6 h-6 text-[#c9a227]" />
            <h3 className="font-serif text-xl font-bold text-[#111111]">Digital Cover Takeovers</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              100% share of voice on the homepage Hero Slideshow for major product launches, watch unveilings, or private jet reveals.
            </p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <Building2 className="w-6 h-6 text-[#c9a227]" />
            <h3 className="font-serif text-xl font-bold text-[#111111]">Private Salon Sponsorships</h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Co-hosting rights for private VIP dining events in Monaco, Geneva, New York, and Tokyo with targeted high-net-worth guest lists.
            </p>
          </div>
        </div>
      </div>

      {/* Partner Inquiry Contact Form */}
      <div className="max-w-3xl mx-auto bg-[#fafafa] border border-[#e5e5e5] p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[#111111]">Advertising & Corporate Inquiry</h2>
          <p className="text-xs text-[#666666]">Connect directly with our Media Director and Publishing Team</p>
        </div>

        {submitted ? (
          <div className="p-8 bg-white border border-[#c9a227] text-center space-y-3 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-[#c9a227] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#111111]">Inquiry Received</h3>
            <p className="text-xs text-[#555555]">
              Thank you, <span className="text-[#111111] font-semibold">{formData.name}</span>. A senior Publishing Partner will review your inquiry for <span className="text-[#111111] font-semibold">{formData.company}</span> and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Media Director"
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Brand / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Brand House"
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@brand.com"
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Estimated Campaign Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                >
                  <option>$25,000 - $50,000</option>
                  <option>$50,000 - $100,000</option>
                  <option>$100,000 - $250,000</option>
                  <option>$250,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase text-[#555555] font-semibold">Campaign Brief & Objectives</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your target product release, timeline, and desired partnership scope..."
                className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Media Kit Inquiry</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

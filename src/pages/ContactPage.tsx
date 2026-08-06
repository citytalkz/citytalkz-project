import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useMagazine();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Editorial Board',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your message has been delivered to City Talkz Editorial', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-sans">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c9a227] font-semibold">
          Direct Line
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#111111]">
          Contact Editorial
        </h1>
        <p className="text-sm text-[#555555] leading-relaxed">
          Reach our editorial offices in Geneva, London, New York, or Tokyo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Bureaus */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-[#c9a227] text-xs font-mono uppercase">
              <MapPin className="w-4 h-4" />
              <span>Geneva Bureau (HQ)</span>
            </div>
            <p className="text-[#111111] font-serif font-bold text-lg">Rue du Rhône 42, 1204 Geneva</p>
            <p className="text-xs text-[#666666]">Switzerland • +41 22 819 9000</p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-[#c9a227] text-xs font-mono uppercase">
              <MapPin className="w-4 h-4" />
              <span>London Bureau</span>
            </div>
            <p className="text-[#111111] font-serif font-bold text-lg">Savile Row 14, Mayfair, London W1S 3JN</p>
            <p className="text-xs text-[#666666]">United Kingdom • +44 20 7946 0110</p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-6 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-[#c9a227] text-xs font-mono uppercase">
              <MapPin className="w-4 h-4" />
              <span>New York Bureau</span>
            </div>
            <p className="text-[#111111] font-serif font-bold text-lg">Crown Building, 730 Fifth Ave, New York NY 10019</p>
            <p className="text-xs text-[#666666]">United States • +1 212 555 0199</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#fafafa] border border-[#e5e5e5] p-8 shadow-sm">
          {submitted ? (
            <div className="p-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#c9a227] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#111111]">Message Transmitted</h3>
              <p className="text-xs text-[#555555]">
                Thank you, <span className="text-[#111111] font-semibold">{formData.name}</span>. Our desk at <span className="text-[#111111] font-semibold">{formData.department}</span> will review your communication.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#111111] mb-4 border-b border-[#e5e5e5] pb-2">
                Executive Transmission
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase text-[#555555] font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Executive Reader"
                    className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase text-[#555555] font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="reader@domain.com"
                    className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase text-[#555555] font-semibold">Department Desk</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none uppercase"
                  >
                    <option>Editorial Board</option>
                    <option>Horology Desk</option>
                    <option>Automotive Desk</option>
                    <option>Real Estate & Architecture</option>
                    <option>Press & Media Relations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase text-[#555555] font-semibold">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Unveiling Inquiry"
                    className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase text-[#555555] font-semibold">Message Body *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your communication clearly..."
                  className="w-full bg-white border border-[#cccccc] focus:border-[#c9a227] p-3 text-[#111111] text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

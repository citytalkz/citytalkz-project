import React, { useState } from 'react';
import { ArrowUp, Mail, Instagram, Twitter, Linkedin, Facebook, Youtube, Crown } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { navigate, addToast } = useMagazine();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for joining the City Talkz Private Digest', 'success');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#fafafa] text-[#555555] border-t border-[#e5e5e5] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Statement & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#e5e5e5]">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <span className="font-serif text-3xl font-black tracking-[0.15em] text-[#111111] uppercase">
                CITY TALKZ
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a227] ml-2"></span>
            </div>
            <p className="text-sm text-[#666666] max-w-xl leading-relaxed">
              CITY TALKZ is the premier digital publication for affluent global tastemakers, delivering authoritative coverage across high horology, supercars, private aviation, Michelin gastronomy, and prime international real estate.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="p-2.5 bg-white border border-[#d4d4d4] text-[#555] hover:text-[#c9a227] hover:border-[#c9a227] transition-all rounded-full shadow-sm" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#d4d4d4] text-[#555] hover:text-[#c9a227] hover:border-[#c9a227] transition-all rounded-full shadow-sm" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#d4d4d4] text-[#555] hover:text-[#c9a227] hover:border-[#c9a227] transition-all rounded-full shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#d4d4d4] text-[#555] hover:text-[#c9a227] hover:border-[#c9a227] transition-all rounded-full shadow-sm" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#d4d4d4] text-[#555] hover:text-[#c9a227] hover:border-[#c9a227] transition-all rounded-full shadow-sm" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#e5e5e5] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center space-x-2 text-[#c9a227] text-xs font-mono uppercase tracking-widest font-semibold mb-2">
                <Crown className="w-4 h-4" />
                <span>The Private Executive Briefing</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#111111] mb-2">
                Curated Luxury Intelligence Delivered Weekly
              </h4>
              <p className="text-xs text-[#666666] mb-4">
                Receive private invitations, off-market real estate previews, and exclusive editorial analysis.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f8f8] border border-[#d4d4d4] focus:border-[#c9a227] text-[#111] text-xs pl-9 pr-4 py-3 focus:outline-none transition-colors placeholder:text-[#888]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Join Briefing
              </button>
            </form>
          </div>

        </div>

        {/* Categorized Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12 border-b border-[#e5e5e5] text-xs">
          
          <div>
            <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 border-b border-[#e5e5e5] pb-2">
              Editorial Coverage
            </h5>
            <ul className="space-y-2.5 text-[#555555]">
              {CATEGORIES.slice(0, 4).map(cat => (
                <li key={cat.slug}>
                  <button 
                    onClick={() => navigate(`/${cat.slug}`)} 
                    className="hover:text-[#c9a227] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 border-b border-[#e5e5e5] pb-2">
              Lifestyle & Culture
            </h5>
            <ul className="space-y-2.5 text-[#555555]">
              {CATEGORIES.slice(4).map(cat => (
                <li key={cat.slug}>
                  <button 
                    onClick={() => navigate(`/${cat.slug}`)} 
                    className="hover:text-[#c9a227] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 border-b border-[#e5e5e5] pb-2">
              The Journal
            </h5>
            <ul className="space-y-2.5 text-[#555555]">
              <li>
                <button onClick={() => navigate('/journal')} className="hover:text-[#c9a227] transition-colors">
                  All Articles Archive
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/journal/automotive')} className="hover:text-[#c9a227] transition-colors">
                  Hypercars & Superyachts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/journal/watches-jewelry')} className="hover:text-[#c9a227] transition-colors">
                  Grand Complications
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/journal/real-estate-home-design')} className="hover:text-[#c9a227] transition-colors">
                  Architectural Icons
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 border-b border-[#e5e5e5] pb-2">
              Company & Corporate
            </h5>
            <ul className="space-y-2.5 text-[#555555]">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#c9a227] transition-colors">
                  About City Talkz
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/advertise')} className="hover:text-[#c9a227] transition-colors">
                  Partner & Advertise
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/newsletter')} className="hover:text-[#c9a227] transition-colors">
                  Newsletter Editions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#c9a227] transition-colors">
                  Contact Editorial
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider mb-4 border-b border-[#e5e5e5] pb-2">
              Membership
            </h5>
            <ul className="space-y-2.5 text-[#555555]">
              <li>
                <button onClick={() => navigate('/subscribe')} className="hover:text-[#c9a227] transition-colors flex items-center gap-1">
                  <Crown className="w-3 h-3 text-[#c9a227]" />
                  <span>VIP Membership</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/subscribe')} className="hover:text-[#c9a227] transition-colors">
                  Print Edition Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#c9a227] transition-colors">
                  Press & Media Kit
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Office Information Row */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-8 border-t border-[#e5e5e5] text-[10px] uppercase tracking-widest text-[#666666]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full lg:w-auto">
            <div>
              <p className="text-[#111111] font-semibold mb-1">Editorial Office</p>
              <p className="text-[9px] leading-relaxed text-[#666666]">Avenue Montaigne, 75008<br />Paris, France</p>
            </div>
            <div>
              <p className="text-[#111111] font-semibold mb-1">Geneva Bureau</p>
              <p className="text-[9px] leading-relaxed text-[#666666]">Rue du Rhône 42, 1204<br />Geneva, Switzerland</p>
            </div>
            <div>
              <p className="text-[#111111] font-semibold mb-1">Partnerships</p>
              <p className="text-[9px] leading-relaxed text-[#666666]">advertise@citytalkz.com<br />press@citytalkz.com</p>
            </div>
            <div>
              <p className="text-[#111111] font-semibold mb-1">Legal & Staff</p>
              <p className="text-[9px] leading-relaxed text-[#666666] flex flex-col space-y-1">
                <span>Privacy / Terms</span>
                <button 
                  onClick={() => navigate('/admin')} 
                  className="text-left text-[#c9a227] hover:underline font-semibold tracking-wider"
                >
                  Admin Login
                </button>
              </p>
            </div>
          </div>

          <div className="text-right flex flex-col items-center lg:items-end w-full lg:w-auto pt-4 lg:pt-0">
            <span className="text-[10px] text-[#c9a227] font-serif font-bold tracking-[0.4em] mb-1 uppercase">
              CITY TALKZ
            </span>
            <p className="text-[8px] text-[#737373] uppercase tracking-widest">
              © {new Date().getFullYear()} Luxury Media Collective. All Rights Reserved.
            </p>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#c9a227] hover:text-[#111] transition-colors uppercase font-mono text-[9px] tracking-widest mt-2"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

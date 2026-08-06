import React from 'react';
import { Award, ShieldCheck, Globe2 } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { NewsletterBanner } from '../components/NewsletterBanner';

export const AboutPage: React.FC = () => {
  const { navigate } = useMagazine();

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Banner */}
      <section className="relative bg-[#fafafa] border-b border-[#e5e5e5] py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c9a227] font-semibold">
            The City Talkz Imperative
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111]">
            The World’s Preeminent Voice in Modern Luxury
          </h1>
          <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Founded in Geneva and London, CITY TALKZ provides authoritative editorial journalism, curating rare automotive engineering, grand horology, architectural masterpieces, and bespoke global travel.
          </p>
        </div>
      </section>

      {/* Brand Values & Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 space-y-3 shadow-sm">
            <Globe2 className="w-8 h-8 text-[#c9a227] mx-auto" />
            <h3 className="font-serif text-3xl font-bold text-[#111111]">1.8M+</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-[#666666]">
              Global C-Suite Readers Monthly
            </p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 space-y-3 shadow-sm">
            <Award className="w-8 h-8 text-[#c9a227] mx-auto" />
            <h3 className="font-serif text-3xl font-bold text-[#111111]">14</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-[#666666]">
              International Bureaus & Correspondents
            </p>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e5e5] p-8 space-y-3 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#c9a227] mx-auto" />
            <h3 className="font-serif text-3xl font-bold text-[#111111]">100%</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-[#666666]">
              Uncompromising Editorial Integrity
            </p>
          </div>

        </div>
      </section>

      {/* Editorial Principles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 border-l-2 border-[#c9a227] pl-6">
          <h2 className="font-serif text-3xl font-bold text-[#111111]">Our Curatorial Standard</h2>
          <p className="text-sm text-[#555555] leading-relaxed">
            In an era of disposable digital media, CITY TALKZ remains devoted to slow journalism, technical rigour, and direct insider access. Whether evaluating a $30M coachbuilt roadster on Monaco passes or inspecting a 100-year-old cognac tierçon in Charente, our journalists test, experience, and verify every subject firsthand.
          </p>
        </div>

        {/* Masthead / Bureau Cards */}
        <div className="pt-8">
          <h3 className="font-serif text-2xl font-bold text-[#111111] mb-6 border-b border-[#e5e5e5] pb-3">
            Editorial Bureaus
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-[#fafafa] border border-[#e5e5e5] p-5 flex items-center space-x-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#111111] text-[#c9a227] font-serif font-bold text-lg flex items-center justify-center border border-[#c9a227]">
                CT
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#111111] text-base">Executive Editorial Bureau</h4>
                <p className="text-xs text-[#c9a227] font-mono uppercase">Editor-in-Chief Desk</p>
                <p className="text-[11px] text-[#666666] pt-1">Global Press & Markets Desk</p>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-5 flex items-center space-x-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#111111] text-[#c9a227] font-serif font-bold text-lg flex items-center justify-center border border-[#c9a227]">
                FD
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#111111] text-base">Fashion & Couture Bureau</h4>
                <p className="text-xs text-[#c9a227] font-mono uppercase">Style & Couture Desk</p>
                <p className="text-[11px] text-[#666666] pt-1">Paris & Savile Row Press Desk</p>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-5 flex items-center space-x-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#111111] text-[#c9a227] font-serif font-bold text-lg flex items-center justify-center border border-[#c9a227]">
                HD
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#111111] text-base">Horology & Fine Jewelry Bureau</h4>
                <p className="text-xs text-[#c9a227] font-mono uppercase">High Horology Desk</p>
                <p className="text-[11px] text-[#666666] pt-1">Geneva Atelier Press Desk</p>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-[#e5e5e5] p-5 flex items-center space-x-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#111111] text-[#c9a227] font-serif font-bold text-lg flex items-center justify-center border border-[#c9a227]">
                TB
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#111111] text-base">Travel & Expeditions Bureau</h4>
                <p className="text-xs text-[#c9a227] font-mono uppercase">Aviation & Yachting Desk</p>
                <p className="text-[11px] text-[#666666] pt-1">Global Expeditions Press Desk</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <NewsletterBanner />
    </div>
  );
};

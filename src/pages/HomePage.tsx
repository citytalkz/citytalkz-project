import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award, Flame, Mail, Send } from 'lucide-react';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBanner } from '../components/NewsletterBanner';
import { useMagazine } from '../context/MagazineContext';
import { getCategoryBySlug } from '../data/categories';

export const HomePage: React.FC = () => {
  const { articles, navigate, addToast } = useMagazine();
  const [emailInput, setEmailInput] = useState('');

  // 1. Journal Feed on Top Right (3-4 curated blog dispatches)
  const topRightArticles = articles.slice(0, 3);

  // 2. Latest 6 articles for the main grid
  const latestArticles = [...articles].slice(0, 6);

  // 3. Editor's Pick / Featured Article
  const featuredArticle = articles.find(a => a.isFeatured && !a.isHero) || articles[1] || articles[0];

  // 4. Category Preview Rows: Automotive, Aviation & Travel, Watches & Jewelry
  const automotiveArticles = articles.filter(a => a.category === 'automotive').slice(0, 3);
  const travelArticles = articles.filter(a => a.category === 'aviation-travel').slice(0, 3);
  const watchesArticles = articles.filter(a => a.category === 'watches-jewelry').slice(0, 3);

  const handleInnerCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      addToast('Welcome to the Inner Circle. Private dispatches will arrive shortly.', 'success');
      setEmailInput('');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* 1. HERO SPLIT CONTAINER (Hero Slideshow on Left, The Journal Feed on Top Right) */}
      <section className="border-b border-[#e5e5e5] bg-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[650px]">
          
          {/* HERO SLIDESHOW (LEFT - 68%) */}
          <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#e5e5e5] relative">
            <HeroSlideshow />
          </div>

          {/* TOP RIGHT BLOGS FEED (RIGHT - 32%) */}
          <aside className="lg:col-span-4 flex flex-col justify-between bg-[#fafafa]">
            {/* Top Journal Articles List */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                <h2 className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c9a227] font-bold flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-[#c9a227]"></span>
                  <span>The Journal</span>
                </h2>
                <button
                  onClick={() => navigate('/journal')}
                  className="text-[10px] uppercase font-mono text-[#555] hover:text-[#c9a227] tracking-wider transition-colors"
                >
                  Explore All →
                </button>
              </div>

              <div className="space-y-6">
                {topRightArticles.map((article) => {
                  const catMeta = getCategoryBySlug(article.category);
                  return (
                    <article 
                      key={article.id} 
                      onClick={() => navigate(`/article/${article.slug}`)}
                      className="flex space-x-4 items-start group cursor-pointer"
                    >
                      <div 
                        className="w-20 h-20 sm:w-22 sm:h-22 bg-gray-100 flex-shrink-0 bg-cover bg-center border border-[#e5e5e5] group-hover:border-[#c9a227] transition-colors"
                        style={{ backgroundImage: `url('${article.coverImage}')` }}
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#c9a227] font-sans font-semibold block">
                          {catMeta?.shortName || article.category}
                        </span>
                        <h3 className="text-sm font-serif font-bold text-[#111111] leading-snug group-hover:text-[#c9a227] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[10px] text-[#737373] font-sans">
                          {article.readTime} • {article.publishDate}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Bottom Inner Circle Signup Box */}
            <div className="p-6 sm:p-8 bg-[#f5f5f5] border-t border-[#e5e5e5]">
              <div className="text-center space-y-3">
                <h4 className="text-lg font-serif italic text-[#111111]">Refined Insights</h4>
                <p className="text-[10px] uppercase tracking-widest text-[#555555] font-sans font-semibold">
                  Weekly Curations to Your Inbox
                </p>
                <form onSubmit={handleInnerCircleSubmit} className="space-y-3 pt-1">
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Email Address" 
                      className="w-full bg-white border-b border-black/20 py-2 px-3 text-xs focus:outline-none focus:border-[#c9a227] font-sans text-[#111111] placeholder-[#888888]"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Join the Inner Circle
                  </button>
                </form>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* 2. TICKER / EDITORIAL DISPATCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fafafa] border-y border-[#e5e5e5] py-3.5 px-6 flex flex-col md:flex-row md:items-center justify-between text-xs gap-3 shadow-sm">
          <div className="flex items-center space-x-3 text-[#c9a227] font-mono uppercase tracking-wider font-semibold">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>Trending Dispatch</span>
          </div>

          <div className="flex-1 md:mx-6 overflow-hidden">
            <p className="text-[#333333] truncate font-serif italic text-sm">
              "Patek Philippe's secret Geneva atelier reveals the 2026 Grandmaster Chime Ref. 6300G featuring 20 complications."
            </p>
          </div>

          <button
            onClick={() => navigate('/journal')}
            className="text-[#c9a227] hover:text-[#111] uppercase tracking-wider font-sans text-[11px] font-bold flex items-center gap-1 shrink-0"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. LATEST ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#c9a227] font-mono text-xs uppercase tracking-[0.2em] mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#111111]">
              Latest Articles
            </h2>
          </div>

          <button
            onClick={() => navigate('/journal')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c9a227] hover:text-[#111] transition-colors"
          >
            <span>Explore Full Journal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

      {/* 4. ASYMMETRIC FEATURED EDITORIAL HIGHLIGHT */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#c9a227] font-mono font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Editor-in-Chief’s Choice</span>
          </div>
          <ArticleCard article={featuredArticle} variant="featured-large" />
        </section>
      )}

      {/* 5. CATEGORY PREVIEW ROW 1: AUTOMOTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9a227] font-semibold">
              Performance & Craft
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Automotive & Superyachts
            </h3>
          </div>

          <button
            onClick={() => navigate('/automotive')}
            className="text-xs font-semibold uppercase tracking-widest text-[#c9a227] hover:text-[#111] transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {automotiveArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

      {/* 6. CATEGORY PREVIEW ROW 2: AVIATION & TRAVEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9a227] font-semibold">
              Global Expeditions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Aviation & Travel
            </h3>
          </div>

          <button
            onClick={() => navigate('/aviation-travel')}
            className="text-xs font-semibold uppercase tracking-widest text-[#c9a227] hover:text-[#111] transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

      {/* 7. CATEGORY PREVIEW ROW 3: WATCHES & JEWELRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9a227] font-semibold">
              High Horology
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Watches & Jewelry
            </h3>
          </div>

          <button
            onClick={() => navigate('/watches-jewelry')}
            className="text-xs font-semibold uppercase tracking-widest text-[#c9a227] hover:text-[#111] transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watchesArticles.map(article => (
            <ArticleCard key={article.id} article={article} variant="grid" />
          ))}
        </div>
      </section>

      {/* 8. VIP NEWSLETTER SIGNUP BANNER */}
      <NewsletterBanner />

    </div>
  );
};

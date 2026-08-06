import React from 'react';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { useMagazine } from '../context/MagazineContext';
import { getCategoryBySlug } from '../data/categories';

interface ArticleCardProps {
  article: Article;
  variant?: 'grid' | 'horizontal' | 'featured-large' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'grid' }) => {
  const { navigate, toggleBookmark, isBookmarked } = useMagazine();
  const bookmarked = isBookmarked(article.id);

  const categoryMeta = getCategoryBySlug(article.category);
  const categoryName = categoryMeta ? categoryMeta.name : article.category;

  const handleCardClick = () => {
    navigate(`/article/${article.slug}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  if (variant === 'featured-large') {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer bg-white border border-[#e5e5e5] hover:border-[#c9a227]/60 shadow-sm transition-all duration-300 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#c9a227] flex items-center">
                <span className="w-4 h-[1px] bg-[#c9a227] mr-2"></span>
                {categoryName}
              </span>
              <button
                onClick={handleBookmarkClick}
                className={`p-2 rounded-full transition-colors ${
                  bookmarked ? 'text-[#c9a227] bg-[#c9a227]/10' : 'text-[#737373] hover:text-[#111]'
                }`}
                title="Bookmark article"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] group-hover:text-[#c9a227] transition-colors leading-tight">
              {article.title}
            </h2>

            <p className="text-sm text-[#555555] leading-relaxed line-clamp-3 font-sans">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-xs text-[#737373]">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#c9a227]">
                CITY TALKZ Editorial
              </span>
              <span className="text-[#ccc]">•</span>
              <span className="text-[10px] text-[#666]">{article.publishDate}</span>
            </div>

            <div className="flex items-center space-x-1 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={handleCardClick}
        className="group cursor-pointer bg-white border border-[#e5e5e5] hover:border-[#c9a227]/50 shadow-sm transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center"
      >
        <div className="relative w-full sm:w-48 sm:h-32 flex-shrink-0 aspect-[16/10] sm:aspect-auto overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>

        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-widest text-[#c9a227]">
              {categoryName}
            </span>
            <span className="text-[#888] font-mono">{article.publishDate}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#c9a227] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#737373]">
            <span className="text-[#666] font-sans text-[10px] uppercase tracking-wider">CITY TALKZ Editorial</span>
            <div className="flex items-center gap-2">
              <span className="font-mono">{article.readTime}</span>
              <button
                onClick={handleBookmarkClick}
                className="hover:text-[#c9a227] transition-colors"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#c9a227] text-[#c9a227]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Vertical Grid Card
  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer bg-white border border-[#e5e5e5] hover:border-[#c9a227]/60 shadow-sm transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#111111] border border-[#e5e5e5]">
            {categoryName}
          </div>
          <button
            onClick={handleBookmarkClick}
            className={`absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md transition-colors ${
              bookmarked ? 'text-[#c9a227]' : 'text-white/80 hover:text-white'
            }`}
            title="Save article"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#c9a227] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-[#555555] leading-relaxed line-clamp-3 font-sans">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 border-t border-transparent group-hover:border-[#f0f0f0] transition-colors flex items-center justify-between text-xs text-[#737373]">
        <div className="text-[10px] font-sans text-[#737373] font-medium tracking-wider uppercase">
          {article.publishDate}
        </div>

        <div className="flex items-center space-x-1 font-mono text-[11px]">
          <span>{article.readTime}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

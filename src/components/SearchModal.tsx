import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Clock, Tag } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { CATEGORIES } from '../data/categories';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, articles, navigate } = useMagazine();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else window.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesQuery = 
      query === '' ||
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.author.name.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const handleSelectArticle = (slug: string) => {
    navigate(`/article/${slug}`);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="w-full max-w-3xl bg-white border border-[#e5e5e5] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#e5e5e5] flex items-center justify-between gap-3 bg-[#fafafa]">
          <Search className="w-5 h-5 text-[#c9a227] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, category, keyword or tag..."
            className="w-full bg-transparent text-[#111111] text-base sm:text-lg focus:outline-none placeholder:text-[#888888] font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[#666] hover:text-[#111] text-xs uppercase px-2 py-1 bg-[#f0f0f0]"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-[#666] hover:text-[#111] bg-[#f0f0f0] hover:bg-[#e5e5e5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="p-3 bg-[#f5f5f5] border-b border-[#e5e5e5] flex items-center gap-2 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 font-semibold uppercase tracking-wider text-[11px] transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#111111] text-white'
                : 'bg-[#e5e5e5] text-[#555] hover:text-[#111]'
            }`}
          >
            All ({articles.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#e5e5e5] text-[#555] hover:text-[#111]'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#f0f0f0]">
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-[#737373] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#d4d4d4]" />
              <p className="font-serif text-lg text-[#111111]">No luxury articles match your query</p>
              <p className="text-xs text-[#666]">Try searching for terms like "Patek", "Aston", "Antarctica", "Monaco" or "Wine".</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <div
                key={article.id}
                onClick={() => handleSelectArticle(article.slug)}
                className="pt-3 first:pt-0 group cursor-pointer flex items-center justify-between p-3 hover:bg-[#f9f9f9] transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1 pr-4">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-16 h-12 object-cover bg-gray-100 flex-shrink-0 border border-[#e5e5e5]"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] uppercase font-mono text-[#c9a227] font-semibold">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#111111] group-hover:text-[#c9a227] transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#555555] line-clamp-1">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#888] group-hover:text-[#c9a227] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#fafafa] border-t border-[#e5e5e5] flex items-center justify-between text-[11px] text-[#666666]">
          <span>Showing {filteredArticles.length} results</span>
          <span className="font-mono">Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};

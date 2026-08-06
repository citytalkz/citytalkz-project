import React, { useState } from 'react';
import { useMagazine } from '../context/MagazineContext';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, BookOpen } from 'lucide-react';

interface JournalPageProps {
  initialCategorySlug?: string;
}

export const JournalPage: React.FC<JournalPageProps> = ({ initialCategorySlug = 'all' }) => {
  const { articles } = useMagazine();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'views' | 'readTime'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Filter Articles
  const filteredArticles = articles.filter(article => {
    const matchesCat = activeCategory === 'all' || article.category === activeCategory;
    const matchesQuery = 
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesQuery;
  });

  // Sort Articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'views') {
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    }
    if (sortBy === 'readTime') {
      const getMin = (s: string) => parseInt(s) || 5;
      return getMin(a.readTime) - getMin(b.readTime);
    }
    // Default latest
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Pagination
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage) || 1;
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (catSlug: string) => {
    setActiveCategory(catSlug);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header Title */}
      <div className="border-b border-[#e5e5e5] pb-6 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#c9a227] font-semibold tracking-[0.2em]">
          <BookOpen className="w-4 h-4" />
          <span>The City Talkz Editorial Archive</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#111111]">
          The Journal
        </h1>
        <p className="text-sm text-[#555555] max-w-2xl leading-relaxed">
          Comprehensive repository of luxury lifestyle reporting, horological deep-dives, automotive track reviews, and global market dispatches.
        </p>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-[#fafafa] border border-[#e5e5e5] p-4 space-y-4 shadow-sm">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#e5e5e5] text-xs font-sans">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#111111] text-white font-bold'
                : 'bg-[#e5e5e5] text-[#555] hover:text-[#111]'
            }`}
          >
            All Categories ({articles.length})
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-[#111111] text-white font-bold'
                  : 'bg-[#e5e5e5] text-[#555] hover:text-[#111]'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Search & Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Live Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by keyword, tag, or topic..."
              className="w-full bg-white border border-[#d4d4d4] focus:border-[#c9a227] text-[#111111] pl-9 pr-3 py-2.5 focus:outline-none"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-[#555555] uppercase font-mono text-[11px] flex items-center gap-1 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#d4d4d4] text-[#111111] p-2 text-xs focus:outline-none uppercase font-sans font-semibold"
            >
              <option value="latest">Latest Published</option>
              <option value="views">Most Popular</option>
              <option value="readTime">Shortest Read Time</option>
            </select>
          </div>

        </div>

      </div>

      {/* Article Grid */}
      <div>
        {paginatedArticles.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#fafafa] border border-[#e5e5e5]">
            <p className="font-serif text-xl text-[#111111]">No articles match your criteria</p>
            <p className="text-xs text-[#666666]">Try adjusting your search terms or selecting a different category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-3 pt-8 border-t border-[#e5e5e5]">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2.5 bg-white border border-[#e5e5e5] text-[#111] disabled:opacity-30 hover:border-[#c9a227] transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-9 h-9 text-xs font-mono font-semibold transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-[#111111] text-white font-bold'
                    : 'bg-white border border-[#e5e5e5] text-[#555] hover:text-[#111]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2.5 bg-white border border-[#e5e5e5] text-[#111] disabled:opacity-30 hover:border-[#c9a227] transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};

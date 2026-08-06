import React, { useState } from 'react';
import { useMagazine } from '../context/MagazineContext';
import { getCategoryBySlug } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBanner } from '../components/NewsletterBanner';
import { Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CategoryHubPageProps {
  categorySlug: string;
}

export const CategoryHubPage: React.FC<CategoryHubPageProps> = ({ categorySlug }) => {
  const { articles, navigate } = useMagazine();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryMeta = getCategoryBySlug(categorySlug);
  const itemsPerPage = 6;

  if (!categoryMeta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#111111]">Category Not Found</h1>
        <p className="text-sm text-[#666666]">The requested editorial category does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold uppercase text-xs"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Filter articles in this category
  const categoryArticles = articles.filter(a => {
    const matchesCategory = a.category === categorySlug;
    const matchesQuery = 
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featuredLead = categoryArticles.find(a => a.isFeatured) || categoryArticles[0];
  const remainingArticles = categoryArticles.filter(a => a.id !== featuredLead?.id);

  // Pagination math
  const totalPages = Math.ceil(remainingArticles.length / itemsPerPage) || 1;
  const paginatedArticles = remainingArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* Category Header Banner */}
      <section className="relative w-full h-[40vh] min-h-[300px] max-h-[450px] bg-black overflow-hidden flex items-center justify-center">
        <img
          src={categoryMeta.coverImage}
          alt={categoryMeta.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c9a227] font-semibold">
            Category Dispatch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {categoryMeta.name}
          </h1>
          <p className="text-sm sm:text-base text-[#e5e5e5] max-w-2xl mx-auto leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Search & Filter Bar */}
        <div className="bg-[#fafafa] border border-[#e5e5e5] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-2 text-xs text-[#555555]">
            <Sparkles className="w-4 h-4 text-[#c9a227]" />
            <span>Showing <span className="text-[#111111] font-bold">{categoryArticles.length}</span> curated stories in {categoryMeta.name}</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={`Search in ${categoryMeta.shortName}...`}
              className="w-full bg-white border border-[#d4d4d4] focus:border-[#c9a227] text-xs text-[#111111] pl-9 pr-3 py-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Featured Lead Story (If available and on page 1) */}
        {featuredLead && currentPage === 1 && !searchQuery && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-[#c9a227] font-semibold">
              Category Cover Feature
            </h2>
            <ArticleCard article={featuredLead} variant="featured-large" />
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6 border-b border-[#e5e5e5] pb-3">
            {searchQuery ? 'Search Results' : 'Latest Stories'}
          </h2>

          {paginatedArticles.length === 0 ? (
            <div className="py-16 text-center text-[#666666] space-y-2">
              <p className="font-serif text-lg text-[#111111]">No articles found matching your query</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#c9a227] font-semibold uppercase hover:underline"
              >
                Clear Search Filter
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

        {/* Pagination Controls */}
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

      <NewsletterBanner />
    </div>
  );
};

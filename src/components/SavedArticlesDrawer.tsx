import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';

export const SavedArticlesDrawer: React.FC = () => {
  const { 
    isSavedDrawerOpen, 
    toggleSavedDrawer, 
    savedArticleIds, 
    articles, 
    toggleBookmark, 
    navigate 
  } = useMagazine();

  if (!isSavedDrawerOpen) return null;

  const savedArticles = articles.filter(a => savedArticleIds.includes(a.id));

  const handleNavigate = (slug: string) => {
    navigate(`/article/${slug}`);
    toggleSavedDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      
      {/* Slide-over panel */}
      <div className="w-full max-w-md bg-white border-l border-[#e5e5e5] shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fafafa]">
          <div className="flex items-center space-x-2 text-[#111111]">
            <Bookmark className="w-5 h-5 text-[#c9a227] fill-[#c9a227]" />
            <h3 className="font-serif text-lg font-bold">Saved Reading List</h3>
            <span className="text-xs text-[#c9a227] font-mono font-semibold bg-[#f0f0f0] px-2 py-0.5 rounded">
              {savedArticles.length}
            </span>
          </div>
          <button
            onClick={toggleSavedDrawer}
            className="p-1 text-[#666] hover:text-[#111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="py-20 text-center space-y-3 text-[#737373]">
              <Bookmark className="w-10 h-10 mx-auto text-[#d4d4d4]" />
              <p className="font-serif text-base text-[#111111]">Your reading list is empty</p>
              <p className="text-xs max-w-xs mx-auto text-[#666]">
                Bookmark articles while browsing City Talkz to read them offline or save for future reference.
              </p>
            </div>
          ) : (
            savedArticles.map(article => (
              <div
                key={article.id}
                className="group bg-[#fafafa] border border-[#e5e5e5] hover:border-[#c9a227]/50 p-3 flex gap-3 transition-colors relative shadow-sm"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-20 h-20 object-cover bg-gray-100 flex-shrink-0 cursor-pointer"
                  onClick={() => handleNavigate(article.slug)}
                />

                <div className="flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#c9a227] font-semibold">
                      {article.category}
                    </span>
                    <h4 
                      onClick={() => handleNavigate(article.slug)}
                      className="font-serif text-xs font-bold text-[#111111] group-hover:text-[#c9a227] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#737373]">
                    <span>{article.readTime}</span>
                    <button
                      onClick={() => toggleBookmark(article.id)}
                      className="text-[#888] hover:text-red-500 p-1 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#e5e5e5] bg-[#fafafa]">
            <button
              onClick={() => {
                handleNavigate(savedArticles[0].slug);
              }}
              className="w-full py-3 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <span>Read First Saved Article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Bookmark, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy, 
  Check, 
  MessageSquare, 
  Send,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { getCategoryBySlug } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterBanner } from '../components/NewsletterBanner';

interface ArticleDetailPageProps {
  articleSlug: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleSlug }) => {
  const { 
    articles, 
    comments, 
    addComment, 
    toggleBookmark, 
    isBookmarked, 
    navigate, 
    addToast 
  } = useMagazine();

  const [copied, setCopied] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const article = articles.find(a => a.slug === articleSlug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#111111]">Article Not Found</h1>
        <p className="text-sm text-[#666666]">The editorial story you requested could not be located.</p>
        <button
          onClick={() => navigate('/journal')}
          className="px-6 py-2.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase"
        >
          Return to Journal
        </button>
      </div>
    );
  }

  const categoryMeta = getCategoryBySlug(article.category);
  const categoryName = categoryMeta ? categoryMeta.name : article.category;
  const bookmarked = isBookmarked(article.id);

  // Related articles (3 cards from same category excluding current)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // If not enough related from same category, fill with general recent articles
  if (relatedArticles.length < 3) {
    const extra = articles
      .filter(a => a.id !== article.id && !relatedArticles.includes(a))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...extra);
  }

  const articleComments = comments[article.id] || [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Article link copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(article.id, commentAuthor, commentText);
      setCommentText('');
    }
  };

  // Process body paragraphs
  const paragraphs = article.bodyContent
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <article className="pb-16 font-sans">
      
      {/* Top Back Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(`/${article.category}`)}
          className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#555] hover:text-[#c9a227] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {categoryName}</span>
        </button>
      </div>

      {/* Article Header & Title Section */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-8 space-y-6 text-center">
        
        <div className="inline-block bg-[#c9a227]/10 border border-[#c9a227]/40 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#c9a227]">
          {categoryName}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-[1.18] tracking-tight">
          {article.title}
        </h1>

        <p className="font-serif text-lg sm:text-xl italic text-[#444444] max-w-3xl mx-auto leading-relaxed">
          {article.excerpt}
        </p>

        {/* Byline & Author Info Bar */}
        <div className="pt-4 border-y border-[#e5e5e5] py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#f0f0f0] border border-[#c9a227]/50 flex items-center justify-center text-[#c9a227] font-serif font-bold text-xs uppercase tracking-widest">
              CT
            </div>
            <div>
              <p className="font-semibold text-[#111111] text-sm uppercase tracking-wider font-sans">CITY TALKZ Editorial Bureau</p>
              <p className="text-[10px] text-[#737373] uppercase tracking-widest">Global Luxury Press Desk</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[#666666]">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-[#111111] font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#c9a227]" />
              {article.readTime}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`p-2.5 border transition-colors ${
                bookmarked
                  ? 'border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]'
                  : 'border-[#e5e5e5] text-[#666] hover:text-[#111] hover:border-[#111]'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2.5 border border-[#e5e5e5] text-[#666] hover:text-[#111] hover:border-[#111] transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Full Cover Image */}
      <div className="max-w-5xl mx-auto px-4 my-6">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 border border-[#e5e5e5] shadow-sm">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-[#555] border border-[#e5e5e5]">
            Photography Courtesy of City Talkz Archives
          </div>
        </div>
      </div>

      {/* Main Editorial Text Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-12 space-y-6 text-[#262626] text-base leading-[1.8] font-sans">
        
        {paragraphs.map((para, idx) => {
          // Subheadings check
          if (para.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-serif text-2xl font-bold text-[#111111] pt-6 pb-2 border-b border-[#e5e5e5]">
                {para.replace('### ', '')}
              </h3>
            );
          }

          // First paragraph gets drop-cap styling
          if (idx === 0) {
            return (
              <p key={idx} className="drop-cap text-lg leading-relaxed text-[#111111]">
                {para}
              </p>
            );
          }

          // Pull quote styling if paragraph starts with quote
          if (para.startsWith('"') && para.endsWith('"')) {
            return (
              <blockquote key={idx} className="my-8 p-6 bg-[#fafafa] border-l-2 border-[#c9a227] italic font-serif text-xl text-[#111111] leading-relaxed shadow-sm">
                {para}
              </blockquote>
            );
          }

          return <p key={idx}>{para}</p>;
        })}

        {/* Tags */}
        <div className="pt-8 border-t border-[#e5e5e5] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#666] font-mono uppercase mr-2">Topics:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#f5f5f5] border border-[#e5e5e5] text-[#555] hover:text-[#111] cursor-pointer uppercase text-[10px] tracking-wider font-mono font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Share Bar */}
        <div className="py-6 bg-[#fafafa] border border-[#e5e5e5] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-2 text-[#111111] font-serif font-bold text-sm">
            <Share2 className="w-4 h-4 text-[#c9a227]" />
            <span>Share this Editorial Story</span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white border border-[#e5e5e5] hover:border-[#c9a227] text-[#555] hover:text-[#c9a227] transition-colors shadow-sm"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white border border-[#e5e5e5] hover:border-[#c9a227] text-[#555] hover:text-[#c9a227] transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white border border-[#e5e5e5] hover:border-[#c9a227] text-[#555] hover:text-[#c9a227] transition-colors shadow-sm"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2.5 bg-white border border-[#e5e5e5] hover:border-[#c9a227] text-[#555] hover:text-[#c9a227] transition-colors flex items-center gap-1.5 text-xs uppercase shadow-sm"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>

      </div>

      {/* Reader Discourse / Comments Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 my-12 pt-8 border-t border-[#e5e5e5] space-y-8">
        
        <div className="flex items-center space-x-2 text-[#111111]">
          <MessageSquare className="w-5 h-5 text-[#c9a227]" />
          <h3 className="font-serif text-2xl font-bold">Editorial Discourse & Connoisseur Thoughts</h3>
          <span className="text-xs font-mono bg-[#f0f0f0] text-[#c9a227] px-2 py-0.5 font-bold">
            {articleComments.length}
          </span>
        </div>

        {/* Comment Submission Form */}
        <form onSubmit={handleCommentSubmit} className="bg-[#fafafa] border border-[#e5e5e5] p-5 space-y-4 shadow-sm">
          <h4 className="text-xs uppercase tracking-wider text-[#c9a227] font-semibold">
            Contribute to the Editorial Conversation
          </h4>

          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Your Name & Title (e.g. Lord Charles Montgomery)"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="bg-white border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs focus:outline-none"
            />
            <textarea
              required
              rows={3}
              placeholder="Share your perspective or insights on this story..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="bg-white border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Perspective</span>
          </button>
        </form>

        {/* Comments Stream */}
        <div className="space-y-4 divide-y divide-[#e5e5e5]">
          {articleComments.length === 0 ? (
            <p className="text-xs text-[#666] italic text-center py-4">
              Be the first distinguished reader to contribute thoughts to this story.
            </p>
          ) : (
            articleComments.map(c => (
              <div key={c.id} className="pt-4 first:pt-0 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#111111]">{c.authorName}</span>
                  <span className="text-[#737373] text-[10px] font-mono">{c.date}</span>
                </div>
                <p className="text-xs text-[#444444] leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>

      </section>

      {/* Related Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-[#e5e5e5] my-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c9a227] font-semibold">
              Further Reading
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              Related Editorial Stories
            </h3>
          </div>

          <button
            onClick={() => navigate(`/${article.category}`)}
            className="text-xs text-[#c9a227] hover:text-[#111] font-semibold uppercase tracking-wider"
          >
            Explore {categoryName}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map(rel => (
            <ArticleCard key={rel.id} article={rel} variant="grid" />
          ))}
        </div>
      </section>

      <NewsletterBanner />

    </article>
  );
};

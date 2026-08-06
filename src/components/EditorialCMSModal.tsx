import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Trash2, RefreshCw, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { CategorySlug, Article } from '../types';
import { CATEGORIES } from '../data/categories';

const PRESET_LUXURY_IMAGES = [
  { label: 'Supercar', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Private Jet', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Luxury Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Superyacht', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Cliffside Villa', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Rare Cognac', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Haute Couture', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Luxury Hotel', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop' }
];

export const EditorialCMSModal: React.FC = () => {
  const { 
    isCMSOpen, 
    closeCMS, 
    editingArticle, 
    articles, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    resetArticlesToDefault 
  } = useMagazine();

  const [tab, setTab] = useState<'create' | 'manage'>('create');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategorySlug>('automotive');
  const [coverImage, setCoverImage] = useState(PRESET_LUXURY_IMAGES[0].url);
  const [authorName, setAuthorName] = useState('Lord Harrison Vance');
  const [authorRole, setAuthorRole] = useState('Senior Editorial Director');
  const [excerpt, setExcerpt] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [readTime, setReadTime] = useState('6 min read');
  const [isFeatured, setIsFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('Luxury, Bespoke, Exclusive');

  useEffect(() => {
    if (editingArticle) {
      setTab('create');
      setTitle(editingArticle.title);
      setCategory(editingArticle.category);
      setCoverImage(editingArticle.coverImage);
      setAuthorName(editingArticle.author.name);
      setAuthorRole(editingArticle.author.role);
      setExcerpt(editingArticle.excerpt);
      setBodyContent(editingArticle.bodyContent);
      setReadTime(editingArticle.readTime);
      setIsFeatured(!!editingArticle.isFeatured);
      setTagsInput(editingArticle.tags.join(', '));
    } else {
      resetForm();
    }
  }, [editingArticle]);

  const resetForm = () => {
    setTitle('');
    setCategory('automotive');
    setCoverImage(PRESET_LUXURY_IMAGES[0].url);
    setAuthorName('Lord Harrison Vance');
    setAuthorRole('Senior Editorial Director');
    setExcerpt('');
    setBodyContent('');
    setReadTime('6 min read');
    setIsFeatured(false);
    setTagsInput('Luxury, Bespoke, Exclusive');
  };

  if (!isCMSOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !bodyContent) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const articlePayload = {
      title,
      slug,
      category,
      coverImage,
      author: {
        name: authorName,
        role: authorRole,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
      },
      excerpt,
      bodyContent,
      readTime,
      isFeatured,
      tags
    };

    if (editingArticle) {
      updateArticle({
        ...editingArticle,
        ...articlePayload
      });
    } else {
      addArticle(articlePayload);
    }

    closeCMS();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* CMS Dialog Container */}
      <div className="w-full max-w-4xl bg-white border border-[#e5e5e5] shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#fafafa] border-b border-[#e5e5e5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#111111]">City Talkz Editorial CMS</h3>
              <p className="text-xs text-[#666]">Publish and curate luxury magazine articles in real time</p>
            </div>
          </div>

          <button onClick={closeCMS} className="p-2 text-[#666] hover:text-[#111]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 bg-[#f5f5f5] border-b border-[#e5e5e5] text-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTab('create')}
              className={`py-3 font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                tab === 'create' ? 'border-[#c9a227] text-[#c9a227]' : 'border-transparent text-[#666] hover:text-[#111]'
              }`}
            >
              {editingArticle ? 'Edit Article' : 'New Article Entry'}
            </button>
            <button
              onClick={() => setTab('manage')}
              className={`py-3 font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                tab === 'manage' ? 'border-[#c9a227] text-[#c9a227]' : 'border-transparent text-[#666] hover:text-[#111]'
              }`}
            >
              Manage Articles ({articles.length})
            </button>
          </div>

          <button
            onClick={resetArticlesToDefault}
            className="flex items-center gap-1.5 py-2 px-3 text-[#666] hover:text-[#c9a227] text-[11px] font-mono transition-colors"
            title="Restore original 30 sample articles"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Sample Data</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {tab === 'create' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Title & Category */}
                <div className="md:col-span-8 space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The 2026 Bugatti Tourbillon: 1,800bhp V16 Engineering Masterpiece"
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-sm focus:outline-none uppercase"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Cover Image Pickers */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#555] font-semibold flex items-center justify-between">
                  <span>Cover Image URL *</span>
                  <span className="text-[10px] text-[#737373]">Click a preset below or enter custom URL</span>
                </label>
                
                <input
                  type="url"
                  required
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-sm focus:outline-none font-mono text-xs"
                />

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
                  {PRESET_LUXURY_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`relative aspect-video border overflow-hidden transition-all ${
                        coverImage === preset.url ? 'border-[#c9a227] ring-1 ring-[#c9a227]' : 'border-[#e5e5e5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center py-0.5 font-sans truncate">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Author & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">Author Role</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                  Article Excerpt / Subhead *
                </label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short, compelling summary that appears on card grids..."
                  className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-xs focus:outline-none"
                />
              </div>

              {/* Body Content */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                  Full Article Body Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={bodyContent}
                  onChange={(e) => setBodyContent(e.target.value)}
                  placeholder="Write full article body paragraphs. You can separate paragraphs with double linebreaks. Markdown headers like ### Section Title are supported."
                  className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-xs focus:outline-none font-sans leading-relaxed"
                />
              </div>

              {/* Tags & Featured Checkbox */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="w-full sm:w-auto flex-1 space-y-1">
                  <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Supercars, Monaco, Bespoke"
                    className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-2 text-[#111] text-xs focus:outline-none"
                  />
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#c9a227]"
                  />
                  <span className="text-xs text-[#111] uppercase font-semibold">Mark as Featured Story</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end space-x-4 border-t border-[#e5e5e5]">
                <button
                  type="button"
                  onClick={closeCMS}
                  className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-[#111] text-xs uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  {editingArticle ? 'Update Article' : 'Publish Article'}
                </button>
              </div>

            </form>
          ) : (
            /* Manage Articles Tab */
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-[#666]">
                <span>Total articles in database: {articles.length}</span>
                <button
                  onClick={() => {
                    resetForm();
                    setTab('create');
                  }}
                  className="text-[#c9a227] hover:underline flex items-center gap-1 font-semibold uppercase"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="divide-y divide-[#e5e5e5]">
                {articles.map(article => (
                  <div key={article.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-12 h-12 object-cover bg-gray-100 flex-shrink-0 border border-[#e5e5e5]"
                      />
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-mono text-[#c9a227] font-semibold">{article.category}</span>
                        <h5 className="font-serif text-sm font-bold text-[#111] truncate">{article.title}</h5>
                        <p className="text-[11px] text-[#737373]">{article.publishDate} • Editorial Bureau</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          useMagazine;
                          // trigger editing
                          setTab('create');
                          setTitle(article.title);
                          setCategory(article.category);
                          setCoverImage(article.coverImage);
                          setAuthorName(article.author.name);
                          setAuthorRole(article.author.role);
                          setExcerpt(article.excerpt);
                          setBodyContent(article.bodyContent);
                          setReadTime(article.readTime);
                          setIsFeatured(!!article.isFeatured);
                          setTagsInput(article.tags.join(', '));
                        }}
                        className="p-2 text-[#666] hover:text-[#c9a227] bg-[#f5f5f5] transition-colors"
                        title="Edit article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="p-2 text-[#666] hover:text-red-500 bg-[#f5f5f5] transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  KeyRound
} from 'lucide-react';
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

export const AdminPage: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    adminLogin, 
    adminLogout, 
    updateAdminPassword,
    articles, 
    addArticle, 
    updateArticle, 
    deleteArticle, 
    resetArticlesToDefault,
    comments,
    navigate,
    addToast
  } = useMagazine();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // CMS Dashboard state
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'security'>('create');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Article Form State
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

  // Password Change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securityMsg, setSecurityMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!usernameInput.trim() || !passwordInput) {
      setLoginError('Please enter both username and password');
      return;
    }

    const success = adminLogin(usernameInput, passwordInput);
    if (success) {
      addToast('Welcome back to City Talkz Editorial CMS', 'success');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('Invalid username or password credentials');
    }
  };

  const resetArticleForm = () => {
    setEditingArticleId(null);
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

  const handleEditClick = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setCategory(art.category);
    setCoverImage(art.coverImage);
    setAuthorName(art.author.name);
    setAuthorRole(art.author.role);
    setExcerpt(art.excerpt);
    setBodyContent(art.bodyContent);
    setReadTime(art.readTime);
    setIsFeatured(!!art.isFeatured);
    setTagsInput(art.tags.join(', '));
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleSubmit = (e: React.FormEvent) => {
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

    if (editingArticleId) {
      const existing = articles.find(a => a.id === editingArticleId);
      if (existing) {
        updateArticle({
          ...existing,
          ...articlePayload
        });
      }
    } else {
      addArticle(articlePayload);
    }

    resetArticleForm();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMsg('');
    const ok = updateAdminPassword(oldPassword, newPassword);
    if (ok) {
      setSecurityMsg('Password successfully updated!');
      setOldPassword('');
      setNewPassword('');
      addToast('Admin security credentials updated', 'success');
    } else {
      setSecurityMsg('Failed to update password. Verify your current password.');
    }
  };

  // Filtered articles for manage view
  const filteredArticles = articles.filter(a => {
    const matchesCat = filterCategory === 'all' || a.category === filterCategory;
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalComments = Object.values(comments).reduce((acc: number, cList) => acc + (cList as Comment[]).length, 0);

  // If NOT logged in, show Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] bg-[#0d0d0d] text-white flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-[#141414] border border-[#2a2a2a] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          {/* Top Gold Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#967713] via-[#c9a227] to-[#e6c86e]"></div>

          {/* Header Branding */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/30 rounded-full mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
              CITY TALKZ <span className="text-[#c9a227]">.</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#a3a3a3] font-mono">
              Editorial CMS & Admin Desk
            </p>
          </div>

          {/* Error Message Alert */}
          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2 rounded">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#a3a3a3] font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#c9a227]" />
                <span>Admin Username</span>
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#1f1f1f] border border-[#333333] focus:border-[#c9a227] p-3 text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] uppercase tracking-wider text-[#a3a3a3] font-semibold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span>Admin Password</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-[#888] hover:text-[#c9a227] uppercase tracking-wider"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#1f1f1f] border border-[#333333] focus:border-[#c9a227] p-3 text-white text-sm focus:outline-none transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c9a227] hover:bg-[#e6c86e] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 pt-3.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Enter CMS</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Authenticated Admin CMS Dashboard View
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#171717] font-sans pb-16">
      
      {/* Top Admin Status Bar */}
      <div className="bg-[#0f0f0f] text-white border-b border-[#262626] py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg font-bold tracking-widest uppercase text-[#c9a227]">
              CITY TALKZ <span className="text-white">.</span> CMS
            </span>
            <span className="hidden sm:inline text-[#404040]">|</span>
            <span className="text-xs text-[#a3a3a3] font-mono flex items-center gap-1.5 bg-[#1f1f1f] px-2.5 py-1 rounded border border-[#333]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>Logged in as Editorial Administrator</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <button
              onClick={() => navigate('/')}
              className="text-[#a3a3a3] hover:text-[#c9a227] transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>
            <span className="text-[#404040]">•</span>
            <button
              onClick={adminLogout}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#e5e5e5] p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Total Articles</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] flex items-center justify-between">
              <span>{articles.length}</span>
              <FileText className="w-5 h-5 text-[#c9a227]" />
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Featured Stories</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] flex items-center justify-between">
              <span>{articles.filter(a => a.isFeatured).length}</span>
              <Sparkles className="w-5 h-5 text-[#c9a227]" />
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Active Categories</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] flex items-center justify-between">
              <span>{CATEGORIES.length}</span>
              <Eye className="w-5 h-5 text-[#c9a227]" />
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Reader Comments</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] flex items-center justify-between">
              <span>{totalComments}</span>
              <CheckCircle2 className="w-5 h-5 text-[#c9a227]" />
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Content Area */}
        <div className="bg-white border border-[#e5e5e5] shadow-sm overflow-hidden">
          
          {/* Tab Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fafafa] border-b border-[#e5e5e5] px-6 text-xs font-sans">
            <div className="flex items-center space-x-6 overflow-x-auto">
              <button
                onClick={() => {
                  if (activeTab !== 'create') resetArticleForm();
                  setActiveTab('create');
                }}
                className={`py-4 font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'create' ? 'border-[#c9a227] text-[#c9a227]' : 'border-transparent text-[#666] hover:text-[#111]'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{editingArticleId ? 'Edit Article' : 'Publish New Article'}</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`py-4 font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'manage' ? 'border-[#c9a227] text-[#c9a227]' : 'border-transparent text-[#666] hover:text-[#111]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Manage Articles ({articles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'security' ? 'border-[#c9a227] text-[#c9a227]' : 'border-transparent text-[#666] hover:text-[#111]'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Security & Credentials</span>
              </button>
            </div>

            <button
              onClick={resetArticlesToDefault}
              className="py-3 sm:py-0 text-[#737373] hover:text-[#c9a227] text-[11px] font-mono flex items-center gap-1.5 transition-colors self-end sm:self-center"
              title="Reset data back to original 30 sample articles"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            
            {/* Tab 1: Create / Edit Article */}
            {activeTab === 'create' && (
              <form onSubmit={handleArticleSubmit} className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#111111]">
                      {editingArticleId ? 'Edit Existing Story' : 'Draft & Publish New Luxury Article'}
                    </h2>
                    <p className="text-xs text-[#666]">
                      {editingArticleId ? 'Modify content and update changes' : 'Publish directly to live City Talkz journal feed'}
                    </p>
                  </div>
                  {editingArticleId && (
                    <button
                      type="button"
                      onClick={resetArticleForm}
                      className="text-xs text-red-600 hover:underline uppercase font-mono"
                    >
                      Cancel Edit Mode
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Title */}
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

                  {/* Category Dropdown */}
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategorySlug)}
                      className="w-full bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] p-3 text-[#111] text-sm focus:outline-none uppercase font-sans font-medium"
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
                    <span className="text-[10px] text-[#737373]">Select a high-res preset or enter image URL</span>
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
                          coverImage === preset.url ? 'border-[#c9a227] ring-2 ring-[#c9a227]' : 'border-[#e5e5e5] opacity-70 hover:opacity-100'
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
                    placeholder="Short, compelling summary that appears on category grid cards..."
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
                    rows={10}
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    placeholder="Write full article body paragraphs. Separate paragraphs with double linebreaks. Section subheads can start with '### '."
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
                    <span className="text-xs text-[#111] uppercase font-semibold">Mark as Featured Hero Story</span>
                  </label>
                </div>

                {/* Submit Bar */}
                <div className="pt-6 flex items-center justify-end space-x-4 border-t border-[#e5e5e5]">
                  <button
                    type="button"
                    onClick={resetArticleForm}
                    className="px-6 py-2.5 bg-[#f0f0f0] hover:bg-[#e5e5e5] text-[#111] text-xs uppercase tracking-wider font-semibold"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{editingArticleId ? 'Save & Update Article' : 'Publish Article Live'}</span>
                  </button>
                </div>

              </form>
            )}

            {/* Tab 2: Manage Articles */}
            {activeTab === 'manage' && (
              <div className="space-y-6">
                
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#e5e5e5]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title, author, or keyword..."
                    className="w-full sm:w-80 bg-[#fafafa] border border-[#d4d4d4] focus:border-[#c9a227] px-3 py-2 text-xs text-[#111] focus:outline-none"
                  />

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="bg-[#fafafa] border border-[#d4d4d4] px-3 py-2 text-xs text-[#111] focus:outline-none uppercase font-sans font-medium"
                    >
                      <option value="all">All Categories ({articles.length})</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name} ({articles.filter(a => a.category === cat.slug).length})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Articles Table */}
                <div className="divide-y divide-[#e5e5e5] border border-[#e5e5e5]">
                  {filteredArticles.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#666]">
                      No articles found matching your query or filter.
                    </div>
                  ) : (
                    filteredArticles.map(article => (
                      <div key={article.id} className="p-4 bg-white hover:bg-[#fcfcfc] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
                        
                        <div className="flex items-center space-x-4 overflow-hidden">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-16 h-12 object-cover bg-gray-100 flex-shrink-0 border border-[#e5e5e5]"
                          />
                          <div className="truncate space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] uppercase font-mono text-[#c9a227] font-semibold">{article.category}</span>
                              {article.isFeatured && (
                                <span className="bg-[#c9a227]/10 text-[#c9a227] text-[9px] uppercase font-bold px-1.5 py-0.5 border border-[#c9a227]/30">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h4 
                              onClick={() => navigate(`/article/${article.slug}`)}
                              className="font-serif text-sm font-bold text-[#111] truncate cursor-pointer hover:text-[#c9a227]"
                            >
                              {article.title}
                            </h4>
                            <p className="text-[11px] text-[#737373]">
                              By {article.author.name} • {article.publishDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 flex-shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => navigate(`/article/${article.slug}`)}
                            className="p-2 text-[#666] hover:text-[#111] bg-[#f5f5f5] transition-colors"
                            title="View article page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditClick(article)}
                            className="p-2 text-[#666] hover:text-[#c9a227] bg-[#f5f5f5] transition-colors"
                            title="Edit story"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            className="p-2 text-[#666] hover:text-red-600 bg-[#f5f5f5] transition-colors"
                            title="Delete story"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* Tab 3: Security & Credentials */}
            {activeTab === 'security' && (
              <div className="max-w-xl mx-auto space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#111111]">Update Admin Credentials</h3>
                  <p className="text-xs text-[#666]">Change your administrator password for the City Talkz CMS.</p>
                </div>

                {securityMsg && (
                  <div className={`p-3 text-xs border rounded ${
                    securityMsg.includes('successfully') ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    {securityMsg}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 bg-[#fafafa] border border-[#e5e5e5] p-6 shadow-sm">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                      Current Admin Password
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-white border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-[#555] font-semibold">
                      New Admin Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full bg-white border border-[#d4d4d4] focus:border-[#c9a227] p-2.5 text-[#111] text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#111111] hover:bg-[#c9a227] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

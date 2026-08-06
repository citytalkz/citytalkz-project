import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, Crown, ChevronDown } from 'lucide-react';
import { useMagazine } from '../context/MagazineContext';
import { CATEGORIES } from '../data/categories';

export const Header: React.FC = () => {
  const { 
    currentPath, 
    navigate, 
    openSearch, 
    savedArticleIds, 
    toggleSavedDrawer
  } = useMagazine();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const isActive = (path: string) => currentPath === path;

  // Split categories for top desktop nav so it fits cleanly
  const primaryCategories = CATEGORIES.slice(0, 5);
  const secondaryCategories = CATEGORIES.slice(5);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-all duration-300">
      {/* Top Edition Bar */}
      <div className="hidden lg:block border-b border-[#f0f0f0] py-1.5 px-6 text-xs text-[#666]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] tracking-wider uppercase text-[#c9a227] font-semibold">Edition: Global</span>
            <span className="text-[#ccc]">•</span>
            <span>{todayStr}</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <button onClick={() => navigate('/about')} className="hover:text-[#c9a227] transition-colors text-[#555]">
              About
            </button>
            <button onClick={() => navigate('/advertise')} className="hover:text-[#c9a227] transition-colors text-[#555]">
              Advertise
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#c9a227] transition-colors text-[#555]">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-bold text-[#111111] uppercase flex items-center">
                CITY TALKZ <span className="text-[#c9a227] ml-1">.</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#737373] font-sans font-medium -mt-1">
                The Voice of Modern Luxury
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-[#555555]">
            {primaryCategories.map(cat => {
              const href = `/${cat.slug}`;
              return (
                <button
                  key={cat.slug}
                  onClick={() => navigate(href)}
                  className={`py-2 transition-all ${
                    isActive(href)
                      ? 'text-[#111111] font-bold border-b-2 border-[#c9a227] pb-1'
                      : 'hover:text-[#111111] border-b-2 border-transparent pb-1'
                  }`}
                >
                  {cat.shortName}
                </button>
              );
            })}

            {/* Dropdown for remaining categories */}
            <div className="relative" onMouseLeave={() => setMoreDropdownOpen(false)}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onMouseEnter={() => setMoreDropdownOpen(true)}
                className="py-2 border-b-2 border-transparent text-[#555555] hover:text-[#c9a227] flex items-center gap-1 transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-[#c9a227]" />
              </button>

              {moreDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-56 bg-white border border-[#e5e5e5] shadow-2xl py-2 rounded-none z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                >
                  {secondaryCategories.map(cat => {
                    const href = `/${cat.slug}`;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          navigate(href);
                          setMoreDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase transition-colors hover:bg-[#f5f5f5] ${
                          isActive(href) ? 'text-[#c9a227] font-semibold' : 'text-[#404040] hover:text-[#111]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                  <div className="border-t border-[#e5e5e5] my-1"></div>
                  <button
                    onClick={() => {
                      navigate('/journal');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase text-[#c9a227] font-semibold hover:bg-[#f5f5f5] transition-colors`}
                  >
                    All Journal Articles
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/journal')}
              className={`py-2 border-b-2 transition-all font-semibold ${
                isActive('/journal')
                  ? 'border-[#c9a227] text-[#c9a227]'
                  : 'border-transparent text-[#c9a227] hover:text-[#111]'
              }`}
            >
              Journal
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-[#555] hover:text-[#c9a227] transition-colors rounded-full hover:bg-[#f5f5f5]"
              aria-label="Search articles"
              title="Search articles (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Reading List */}
            <button
              onClick={toggleSavedDrawer}
              className="relative p-2 text-[#555] hover:text-[#c9a227] transition-colors rounded-full hover:bg-[#f5f5f5]"
              aria-label="Saved articles"
              title="Saved reading list"
            >
              <Bookmark className="w-5 h-5" />
              {savedArticleIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c9a227] text-black font-bold text-[10px] flex items-center justify-center rounded-full">
                  {savedArticleIds.length}
                </span>
              )}
            </button>

            {/* Subscribe Button */}
            <button
              onClick={() => navigate('/subscribe')}
              className="hidden sm:flex items-center gap-1.5 bg-[#111] text-white hover:bg-[#c9a227] hover:text-black transition-colors px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-medium"
            >
              <Crown className="w-3 h-3 text-[#c9a227]" />
              <span>Subscribe</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#555] hover:text-[#111]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e5e5e5] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-mono uppercase text-[#c9a227] tracking-wider mb-2">
            Categories
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm tracking-wider uppercase">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => {
                  navigate(`/${cat.slug}`);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-[#f0f0f0] transition-colors ${
                  isActive(`/${cat.slug}`) ? 'text-[#c9a227] font-semibold' : 'text-[#404040]'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => {
                navigate('/journal');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#f0f0f0] text-[#c9a227] font-bold"
            >
              Full Journal Hub
            </button>
          </div>

          <div className="pt-4 border-t border-[#e5e5e5] space-y-3">
            <button
              onClick={() => {
                navigate('/subscribe');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#c9a227] text-black font-sans text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>Subscribe to Magazine</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

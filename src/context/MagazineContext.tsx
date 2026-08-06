import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, CategorySlug, Comment } from '../types';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface MagazineContextType {
  articles: Article[];
  savedArticleIds: string[];
  comments: Record<string, Comment[]>;
  currentPath: string;
  navigate: (path: string) => void;
  
  // Admin Authentication
  isAdminLoggedIn: boolean;
  adminLogin: (u: string, p: string) => boolean;
  adminLogout: () => void;
  updateAdminPassword: (oldP: string, newP: string) => boolean;
  
  // Search state
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  // Saved Articles Drawer
  isSavedDrawerOpen: boolean;
  toggleSavedDrawer: () => void;
  
  // CMS Modal (For Admin)
  isCMSOpen: boolean;
  editingArticle: Article | null;
  openCMS: (articleToEdit?: Article | null) => void;
  closeCMS: () => void;
  
  // Article Actions
  addArticle: (newArticle: Omit<Article, 'id' | 'viewsCount' | 'publishDate'>) => void;
  updateArticle: (updatedArticle: Article) => void;
  deleteArticle: (id: string) => void;
  resetArticlesToDefault: () => void;
  
  // Bookmark Actions
  toggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  
  // Comment Actions
  addComment: (articleId: string, authorName: string, content: string) => void;
  
  // Toast notifications
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const MagazineContext = createContext<MagazineContextType | undefined>(undefined);

const LOCAL_STORAGE_ARTICLES_KEY = 'citytalkz_articles_v2';
const LOCAL_STORAGE_SAVED_KEY = 'citytalkz_saved_articles_v1';
const LOCAL_STORAGE_COMMENTS_KEY = 'citytalkz_comments_v1';
const LOCAL_STORAGE_ADMIN_AUTH_KEY = 'citytalkz_admin_auth_v1';
const LOCAL_STORAGE_ADMIN_CREDS_KEY = 'citytalkz_admin_creds_v3';

const DEFAULT_ADMIN_CREDS = { username: 'citytalkz', password: 'City@talkz11' };

export const MagazineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Auth & Credentials State
  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string}>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ADMIN_CREDS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username !== 'admin' && parsed.username !== 'citytlakz' && parsed.password !== 'password123') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_ADMIN_CREDS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const adminLogin = (u: string, p: string): boolean => {
    if (
      u.trim().toLowerCase() === adminCreds.username.toLowerCase() &&
      p === adminCreds.password
    ) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updateAdminPassword = (oldP: string, newP: string): boolean => {
    if (oldP === adminCreds.password && newP.trim().length >= 4) {
      const updated = { ...adminCreds, password: newP };
      setAdminCreds(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_ADMIN_CREDS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ARTICLES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load articles from localStorage', e);
    }
    return SAMPLE_ARTICLES;
  });

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY);
      return stored ? JSON.parse(stored) : {
        'art-auto-1': [
          {
            id: 'c1',
            articleId: 'art-auto-1',
            authorName: 'Baron Henri de Rothschild',
            date: 'August 3, 2026',
            content: 'The aerodynamics on the Valhalla Spider are truly unmatched. I had the pleasure of reviewing the clay prototype in Gaydon—Aston Martin has outdone itself.'
          }
        ]
      };
    } catch {
      return {};
    }
  });

  // Client-side router path tracking
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  // Sync saved articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }, [savedArticleIds]);

  // Sync comments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(comments));
    } catch (e) {
      console.error('Failed to save comments', e);
    }
  }, [comments]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const toggleSavedDrawer = () => setIsSavedDrawerOpen(prev => !prev);

  const openCMS = (articleToEdit: Article | null = null) => {
    setEditingArticle(articleToEdit);
    setIsCMSOpen(true);
  };
  const closeCMS = () => {
    setEditingArticle(null);
    setIsCMSOpen(false);
  };

  const addArticle = (newArticleData: Omit<Article, 'id' | 'viewsCount' | 'publishDate'>) => {
    const id = `art-custom-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const created: Article = {
      ...newArticleData,
      id,
      publishDate: today,
      viewsCount: 100
    };

    setArticles(prev => [created, ...prev]);
    addToast(`Published: "${created.title.slice(0, 35)}..."`, 'success');
  };

  const updateArticle = (updatedArticle: Article) => {
    setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    addToast(`Updated article: "${updatedArticle.title.slice(0, 35)}..."`, 'success');
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    addToast('Article removed', 'info');
  };

  const resetArticlesToDefault = () => {
    setArticles(SAMPLE_ARTICLES);
    localStorage.removeItem(LOCAL_STORAGE_ARTICLES_KEY);
    addToast('CMS data reset to 30 sample articles', 'info');
  };

  const toggleBookmark = (articleId: string) => {
    setSavedArticleIds(prev => {
      const exists = prev.includes(articleId);
      if (exists) {
        addToast('Removed from saved bookmarks', 'info');
        return prev.filter(id => id !== articleId);
      } else {
        addToast('Article saved to your reading list', 'success');
        return [...prev, articleId];
      }
    });
  };

  const isBookmarked = (articleId: string) => savedArticleIds.includes(articleId);

  const addComment = (articleId: string, authorName: string, content: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      authorName: authorName.trim() || 'Anonymous Connoisseur',
      date: today,
      content
    };

    setComments(prev => ({
      ...prev,
      [articleId]: [newComment, ...(prev[articleId] || [])]
    }));

    addToast('Your response has been published to the editorial discourse', 'success');
  };

  return (
    <MagazineContext.Provider
      value={{
        articles,
        savedArticleIds,
        comments,
        currentPath,
        navigate,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        updateAdminPassword,
        isSearchOpen,
        openSearch,
        closeSearch,
        isSavedDrawerOpen,
        toggleSavedDrawer,
        isCMSOpen,
        editingArticle,
        openCMS,
        closeCMS,
        addArticle,
        updateArticle,
        deleteArticle,
        resetArticlesToDefault,
        toggleBookmark,
        isBookmarked,
        addComment,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </MagazineContext.Provider>
  );
};

export const useMagazine = () => {
  const context = useContext(MagazineContext);
  if (!context) {
    throw new Error('useMagazine must be used within a MagazineProvider');
  }
  return context;
};

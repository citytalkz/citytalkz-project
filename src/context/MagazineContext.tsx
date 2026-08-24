import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, CategorySlug, Comment, Author } from '../types';
import { supabase } from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface MagazineContextType {
  articles: Article[];
  isLoadingArticles: boolean;
  savedArticleIds: string[];
  comments: Record<string, Comment[]>;
  currentPath: string;
  navigate: (path: string) => void;

  // Admin Authentication
  isAdminLoggedIn: boolean;
  adminLogin: (u: string, p: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  updateAdminPassword: (oldP: string, newP: string) => Promise<boolean>;

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
  addArticle: (newArticle: Omit<Article, 'id' | 'viewsCount' | 'publishDate'>) => Promise<void>;
  updateArticle: (updatedArticle: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  resetArticlesToDefault: () => Promise<void>;

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

const LOCAL_STORAGE_SAVED_KEY = 'citytalkz_saved_articles_v1';
const LOCAL_STORAGE_COMMENTS_KEY = 'citytalkz_comments_v1';

// Maps the username typed on the website's Admin login form
// to the real email registered in Supabase Auth.
const ADMIN_USERNAME_TO_EMAIL: Record<string, string> = {
  citytalkz: 'citytalkz11@gmail.com',
};

// ---- Supabase <-> Article mapping helpers ----

function mapRowToArticle(row: any): Article {
  const author: Author = {
    name: row.author_name,
    role: row.author_role,
    avatar: row.author_avatar,
  };

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category as CategorySlug,
    coverImage: row.cover_image,
    author,
    publishDate: row.publish_date,
    excerpt: row.excerpt,
    bodyContent: row.body_content,
    readTime: row.read_time,
    isFeatured: row.is_featured ?? false,
    isHero: row.is_hero ?? false,
    tags: row.tags ?? [],
    viewsCount: row.views_count ?? 0,
  };
}

function mapArticleToRow(article: Partial<Article>) {
  return {
    title: article.title,
    slug: article.slug,
    category: article.category,
    cover_image: article.coverImage,
    author_name: article.author?.name,
    author_role: article.author?.role,
    author_avatar: article.author?.avatar,
    publish_date: article.publishDate,
    excerpt: article.excerpt,
    body_content: article.bodyContent,
    read_time: article.readTime,
    is_featured: article.isFeatured ?? false,
    is_hero: article.isHero ?? false,
    tags: article.tags ?? [],
    views_count: article.viewsCount ?? 0,
    is_published: true,
  };
}

export const MagazineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ---- Admin Auth now backed by real Supabase Auth ----
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    // On app load, check if a Supabase session already exists (e.g. after page refresh)
    supabase.auth.getSession().then(({ data }) => {
      setIsAdminLoggedIn(!!data.session);
      setIsAuthChecked(true);
    });

    // Keep in sync if the session changes (e.g. token expiry, logout in another tab)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const adminLogin = async (u: string, p: string): Promise<boolean> => {
    const typedUsername = u.trim().toLowerCase();
    const email = ADMIN_USERNAME_TO_EMAIL[typedUsername] ?? typedUsername;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: p,
    });

    if (error || !data.session) {
      console.error('Admin login failed', error);
      return false;
    }

    setIsAdminLoggedIn(true);
    return true;
  };

  const adminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminLoggedIn(false);
  };

  // Password changes now go through Supabase Auth directly.
  // Note: Supabase's updateUser does not require the old password to be re-verified
  // client-side; it trusts the current authenticated session.
  const updateAdminPassword = async (oldP: string, newP: string): Promise<boolean> => {
    if (newP.trim().length < 4) {
      return false;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const email = sessionData.session?.user?.email;

    if (!email) {
      return false;
    }

    // Re-verify old password by attempting a sign-in with it first
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: oldP,
    });

    if (verifyError) {
      return false;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newP });

    if (updateError) {
      console.error('Failed to update admin password', updateError);
      return false;
    }

    return true;
  };

  // ---- Articles now come from Supabase ----
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(true);

  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch articles from Supabase', error);
      addToast('Failed to load articles', 'error');
      setIsLoadingArticles(false);
      return;
    }

    setArticles((data ?? []).map(mapRowToArticle));
    setIsLoadingArticles(false);
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // ---- Article Actions write through to Supabase, now under real auth ----

  const addArticle = async (newArticleData: Omit<Article, 'id' | 'viewsCount' | 'publishDate'>) => {
    const id = `art-custom-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const row = {
      id,
      ...mapArticleToRow({ ...newArticleData, publishDate: today, viewsCount: 100 }),
      published_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('articles')
      .insert(row)
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to add article', error);
      addToast('Failed to publish article', 'error');
      return;
    }

    const created = mapRowToArticle(data);
    setArticles(prev => [created, ...prev]);
    addToast(`Published: "${created.title.slice(0, 35)}..."`, 'success');
  };

  const updateArticle = async (updatedArticle: Article) => {
    const row = mapArticleToRow(updatedArticle);

    const { data, error } = await supabase
      .from('articles')
      .update(row)
      .eq('id', updatedArticle.id)
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to update article', error);
      addToast('Failed to update article', 'error');
      return;
    }

    const updated = mapRowToArticle(data);
    setArticles(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    addToast(`Updated article: "${updated.title.slice(0, 35)}..."`, 'success');
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      console.error('Failed to delete article', error);
      addToast('Failed to delete article', 'error');
      return;
    }

    setArticles(prev => prev.filter(a => a.id !== id));
    addToast('Article removed', 'info');
  };

  const resetArticlesToDefault = async () => {
    await fetchArticles();
    addToast('Articles refreshed from database', 'info');
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
        isLoadingArticles,
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
import { Article } from '../types';
import { supabase } from './supabase';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';

export interface SupabaseArticleRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_image: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  publish_date: string;
  published_at: string;
  is_published: boolean;
  read_time: string;
  excerpt: string;
  body_content: string;
  is_featured: boolean;
  is_hero: boolean;
  tags: string[];
  views_count: number;
}

/**
 * Maps an in-memory Article (camelCase, nested author) to a Supabase DB row (snake_case, flattened author).
 */
export function mapArticleToDbRow(article: Article): SupabaseArticleRow {
  let parsedDate: string;
  try {
    const d = new Date(article.publishDate);
    parsedDate = isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } catch {
    parsedDate = new Date().toISOString();
  }

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    cover_image: article.coverImage,
    author_name: article.author?.name || 'CITY TALKZ Editorial Bureau',
    author_role: article.author?.role || 'Editorial Desk',
    author_avatar: article.author?.avatar || '',
    publish_date: article.publishDate || '',
    published_at: parsedDate,
    is_published: true,
    read_time: article.readTime || '5 min read',
    excerpt: article.excerpt || '',
    body_content: article.bodyContent || '',
    is_featured: article.isFeatured ?? false,
    is_hero: article.isHero ?? false,
    tags: article.tags ?? [],
    views_count: article.viewsCount ?? 0,
  };
}

/**
 * Maps a Supabase DB row back to the TypeScript Article interface.
 */
export function mapDbRowToArticle(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    coverImage: row.cover_image,
    author: {
      name: row.author_name,
      role: row.author_role,
      avatar: row.author_avatar,
    },
    publishDate: row.publish_date || (row.published_at ? new Date(row.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''),
    readTime: row.read_time || '5 min read',
    excerpt: row.excerpt || '',
    bodyContent: row.body_content || '',
    isFeatured: Boolean(row.is_featured),
    isHero: Boolean(row.is_hero),
    tags: Array.isArray(row.tags) ? row.tags : [],
    viewsCount: Number(row.views_count) || 0,
  };
}

/**
 * Idempotently imports all sample articles into public.articles using 'id' as the conflict target.
 */
export async function importSampleArticlesToSupabase(): Promise<{ success: boolean; count?: number; error?: any }> {
  try {
    const rows = SAMPLE_ARTICLES.map(mapArticleToDbRow);

    const { error: upsertError } = await supabase
      .from('articles')
      .upsert(rows, { onConflict: 'id' });

    if (upsertError) {
      console.error('[Supabase Import Error]:', upsertError);
      return { success: false, error: upsertError };
    }

    // Verify row count
    const { count, error: countError } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('[Supabase Verification Error]:', countError);
      return { success: true, error: countError };
    }

    return { success: true, count: count ?? rows.length };
  } catch (err) {
    console.error('[Supabase Import Exception]:', err);
    return { success: false, error: err };
  }
}

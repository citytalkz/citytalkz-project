export type CategorySlug = 
  | 'automotive'
  | 'aviation-travel'
  | 'watches-jewelry'
  | 'fashion-style'
  | 'hospitality-hotels'
  | 'fine-dining-spirits'
  | 'business-entrepreneurs'
  | 'real-estate-home-design';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
  shortName: string;
  coverImage: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategorySlug;
  coverImage: string;
  author: Author;
  publishDate: string;
  excerpt: string;
  bodyContent: string; // Markdown or rich text paragraphs
  readTime: string;
  isFeatured?: boolean;
  isHero?: boolean;
  tags: string[];
  viewsCount?: number;
}

export interface HeroSlide {
  id: string;
  category: CategorySlug;
  categoryName: string;
  title: string;
  subtitle: string;
  coverImage: string;
  articleSlug: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  date: string;
  content: string;
}

export interface NewsletterPreference {
  dailyBriefing: boolean;
  weekendPortfolio: boolean;
  privateInvites: boolean;
}

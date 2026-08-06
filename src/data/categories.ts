import { CategoryInfo, CategorySlug } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'automotive',
    name: 'Automotive',
    shortName: 'Automotive',
    description: 'Hypercars, coachbuilt grand tourers, rare classics, and superyachts redefining land and sea performance.',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'aviation-travel',
    name: 'Aviation & Travel',
    shortName: 'Aviation & Travel',
    description: 'Long-range private jets, ultra-exclusive expeditions, bespoke safaris, and secluded island sanctuaries.',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'watches-jewelry',
    name: 'Watches & Jewelry',
    shortName: 'Watches & Jewelry',
    description: 'High horology, grand complications, museum-grade gems, and bespoke artisan jeweler showcases.',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'fashion-style',
    name: 'Fashion & Style',
    shortName: 'Fashion & Style',
    description: 'Haute couture, Savile Row bespoke tailoring, rare leather goods, and runway previews from Paris to Milan.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'hospitality-hotels',
    name: 'Hospitality & Hotels',
    shortName: 'Hospitality',
    description: 'Palace hotels, private villas, wellness retreats, and Michelin-star hotel estates across the world.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'fine-dining-spirits',
    name: 'Fine Dining & Spirits',
    shortName: 'Fine Dining & Spirits',
    description: 'Rare single malts, century-old cognac cellars, Michelin three-star culinary masterclasses, and private sommeliers.',
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'business-entrepreneurs',
    name: 'Business',
    shortName: 'Business',
    description: 'Venture capital titans, family office strategies, luxury conglomerates, and visionary founders building legacies.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
  },
  {
    slug: 'real-estate-home-design',
    name: 'Real Estate',
    shortName: 'Real Estate',
    description: 'Super-prime architectural penthouses, Mediterranean coastal estates, alpine chalets, and interior masterworks.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop'
  }
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

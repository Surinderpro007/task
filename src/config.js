// All fixed values live here. Change them in this one file only.

export const PAGE_SIZE = 9; // 3 x 3 grid
export const DEBOUNCE_DELAY = 400; // search debounce in ms
export const SIDEBAR_CATEGORY_LIMIT = 12; // how many categories the sidebar list shows

export const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80';

export const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#shop', active: true },
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
];

// sortBy and order are the DummyJSON query params
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest', sortBy: 'id', order: 'desc' },
  { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  { value: 'rating', label: 'Top Rated', sortBy: 'rating', order: 'desc' },
  { value: 'name-asc', label: 'Name: A to Z', sortBy: 'title', order: 'asc' },
];
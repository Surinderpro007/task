import axios from 'axios';
import { PAGE_SIZE, SORT_OPTIONS } from '../config';

// Products and categories come from DummyJSON (free, no API key)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com',
  timeout: 10000,
});

// Request only the fields the product card needs (keeps the response small)
const PRODUCT_FIELDS = 'title,price,rating,thumbnail,category';

export async function getCategories() {
  const { data } = await api.get('/products/categories');
  return data; // [{ slug, name, url }]
}

/**
 * DummyJSON cannot filter by first letter, and cannot combine search with category.
 * In those cases we fetch all matching products and filter + paginate on the client.
 * Otherwise we use normal server-side pagination (limit / skip).
 */
export async function getProducts({
  category = '',
  search = '',
  sort = 'newest',
  letter = 'All',
  page = 1,
}) {
  const { sortBy, order } = SORT_OPTIONS.find((o) => o.value === sort) || SORT_OPTIONS[0];
  const skip = (page - 1) * PAGE_SIZE;
  const clientSide = letter !== 'All' || Boolean(search && category);

  let url = '/products';
  if (search) url = '/products/search';
  else if (category) url = `/products/category/${category}`;

  const params = { select: PRODUCT_FIELDS, sortBy, order };
  if (search) params.q = search;

  if (clientSide) {
    params.limit = 0; // 0 means "return all products"
  } else {
    params.limit = PAGE_SIZE;
    params.skip = skip;
  }

  const { data } = await api.get(url, { params });
  if (!clientSide) return { products: data.products, total: data.total };

  let list = data.products;
  if (search && category) list = list.filter((p) => p.category === category);
  if (letter !== 'All') list = list.filter((p) => p.title.toUpperCase().startsWith(letter));

  return { products: list.slice(skip, skip + PAGE_SIZE), total: list.length };
}

// FAQs: our own JSON file (public/faqs.json). Change VITE_FAQ_URL in .env to use a real API.
export async function getFaqs() {
  const { data } = await axios.get(import.meta.env.VITE_FAQ_URL || '/faqs.json');
  return data; // [{ id, question, answer }]
}

// Newsletter: demo-only fake POST to DummyJSON. Replace the URL with your real backend.
export async function subscribeNewsletter(email) {
  const { data } = await api.post('/posts/add', { title: email, userId: 1 });
  return data;
}
import {
  Car,
  ChevronDown,
  Dumbbell,
  Footprints,
  Gem,
  Home,
  Laptop,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  Utensils,
} from 'lucide-react';
import { SIDEBAR_CATEGORY_LIMIT } from '../config';

// Picks an icon based on the category slug. Falls back to a generic tag icon.
function getIcon(slug) {
  if (/beauty|fragrance|skin/.test(slug)) return Sparkles;
  if (/shoes/.test(slug)) return Footprints;
  if (/bags/.test(slug)) return ShoppingBag;
  if (/watches|jewellery|sunglasses/.test(slug)) return Gem;
  if (/shirt|dress|tops/.test(slug)) return Shirt;
  if (/furniture|home|kitchen/.test(slug)) return Home;
  if (/laptop|tablet|mobile-accessories/.test(slug)) return Laptop;
  if (/smartphone/.test(slug)) return Smartphone;
  if (/sports/.test(slug)) return Dumbbell;
  if (/vehicle|motorcycle/.test(slug)) return Car;
  if (/groceries/.test(slug)) return Utensils;
  return Tag;
}

export default function CategorySidebar({ categories, loading, selected, onSelect }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-card">
      <h3 className="text-base font-semibold">Categories</h3>

      {/* Dropdown with every category */}
      <div className="relative mt-3">
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="field appearance-none pr-9"
          aria-label="Select category"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>

      {/* Quick list with the first few categories */}
      <ul className="mt-3 space-y-0.5">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="skeleton my-1.5 h-8 rounded-lg" />
          ))}

        {!loading &&
          categories.slice(0, SIDEBAR_CATEGORY_LIMIT).map((c) => {
            const Icon = getIcon(c.slug);
            const active = selected === c.slug;
            return (
              <li key={c.slug}>
                <button
                  onClick={() => onSelect(active ? '' : c.slug)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition ${
                    active ? 'bg-mint font-medium text-primary' : 'text-ink hover:bg-surface'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                  <span className="truncate">{c.name}</span>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
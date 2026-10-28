import { useEffect, useRef, useState } from 'react';
import { PackageSearch } from 'lucide-react';
import { getCategories } from '../api/api';
import { DEBOUNCE_DELAY, PAGE_SIZE } from '../config';
import useDebounce from '../hooks/useDebounce';
import useProducts from '../hooks/useProducts';
import CategorySidebar from './CategorySidebar';
import ProductToolbar from './ProductToolbar';
import AlphabetFilter from './AlphabetFilter';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

// All filter state lives here. Child components receive values and callbacks through props.
export default function ProductsSection() {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [letter, setLetter] = useState('All');
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const sectionRef = useRef(null);
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);
  const { products, total, loading, error } = useProducts({
    category,
    search: debouncedSearch.trim(),
    sort,
    letter,
    page,
  });

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

  // Whenever a filter changes, go back to page 1
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <section id="shop" ref={sectionRef} className="container-page scroll-mt-20 py-10 sm:py-12">
      <h2 className="text-2xl font-semibold sm:text-3xl">Our Products</h2>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        {/* Left column: about 20% */}
        <aside className="w-full lg:w-1/5 lg:min-w-[220px] lg:self-start">
          <CategorySidebar
            categories={categories}
            loading={categoriesLoading}
            selected={category}
            onSelect={withReset(setCategory)}
          />
        </aside>

        {/* Right column: about 80% */}
        <div className="min-w-0 flex-1 lg:w-4/5">
          <ProductToolbar
            search={search}
            onSearch={withReset(setSearch)}
            sort={sort}
            onSort={withReset(setSort)}
          />

          <div className="mt-4">
            <AlphabetFilter active={letter} onChange={withReset(setLetter)} />
          </div>

          <div className="mt-5">
            {error && (
              <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}

            {!error && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {loading
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <div key={i} className="rounded-xl border border-line bg-white p-2.5">
                        <div className="skeleton aspect-[4/3] rounded-lg" />
                        <div className="skeleton mt-3 h-4 w-3/4 rounded" />
                        <div className="skeleton mt-2 h-4 w-1/3 rounded" />
                      </div>
                    ))
                  : products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center text-muted">
                <PackageSearch className="h-10 w-10" strokeWidth={1.5} />
                <p className="mt-3 text-sm">No products found. Try changing your filters.</p>
              </div>
            )}
          </div>

          {!error && (
            <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
          )}
        </div>
      </div>
    </section>
  );
}
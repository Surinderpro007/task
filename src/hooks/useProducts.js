import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

// Re-fetches products whenever a filter changes.
// The `ignore` flag drops the result of an outdated request.
export default function useProducts({ category, search, sort, letter, page }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');

    getProducts({ category, search, sort, letter, page })
      .then((res) => {
        if (ignore) return;
        setProducts(res.products);
        setTotal(res.total);
      })
      .catch(() => {
        if (!ignore) setError('Could not load products. Please try again.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category, search, sort, letter, page]);

  return { products, total, loading, error };
}
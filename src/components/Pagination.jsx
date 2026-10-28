import { ChevronLeft, ChevronRight } from 'lucide-react';

// Builds a list like [1, 2, 3, '...', 10]
function getPages(page, total) {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);

  const keep = [...new Set([1, total, page - 1, page, page + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];
  keep.forEach((p, i) => {
    if (i > 0 && p - keep[i - 1] > 1) result.push('...');
    result.push(p);
  });
  return result;
}

const base =
  'flex h-9 w-9 items-center justify-center rounded-full text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${base} border border-line bg-white hover:bg-mint disabled:opacity-40 disabled:hover:bg-white`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-muted">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${base} ${
              p === page ? 'bg-primary font-medium text-white' : 'bg-mint/70 hover:bg-mint'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${base} border border-line bg-white hover:bg-mint disabled:opacity-40 disabled:hover:bg-white`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
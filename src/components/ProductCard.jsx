import { useState } from 'react';
import { Heart, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group rounded-xl border border-line bg-white p-2.5 shadow-card transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative overflow-hidden rounded-lg bg-surface">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-contain transition duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => setLiked((l) => !l)}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow-sm transition hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : 'text-ink'}`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      <div className="px-1 pb-1 pt-3">
        <h3 className="truncate text-sm font-medium" title={product.title}>
          {product.title}
        </h3>
        <p className="mt-1 text-sm font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
import { useState } from 'react';
import { Heart, Leaf, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { NAV_LINKS } from '../config';

const iconBtn =
  'relative rounded-full p-2 text-ink transition hover:bg-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between sm:h-16">
        <a href="#" className="flex items-center gap-2 text-primary">
          <Leaf className="h-6 w-6" strokeWidth={2.2} />
          <span className="text-xl font-semibold tracking-tight">Aurora</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-5 text-sm transition hover:text-primary ${
                link.active ? 'font-semibold text-primary' : 'text-ink'
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button className={iconBtn} aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <button className={`${iconBtn} hidden sm:block`} aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </button>
          <button className={iconBtn} aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
              2
            </span>
          </button>
          <button className={`${iconBtn} hidden sm:block`} aria-label="Account">
            <User className="h-5 w-5" />
          </button>
          <button
            className={`${iconBtn} md:hidden`}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-white md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-sm ${link.active ? 'font-semibold text-primary' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}